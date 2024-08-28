from flask import request, jsonify
from flask_bcrypt import Bcrypt
from flask_mysqldb import MySQL
from flask_jwt_extended import create_access_token

# Initialisation des extensions
bcrypt = Bcrypt()

def init_mysql(app):
    mysql = MySQL(app)
    return mysql

def register(mysql):
    data = request.get_json()
    
    # Validation des champs requis
    required_fields = ['nom', 'prenom', 'date_naissance', 'email', 'numTel', 'password', 'adresse']
    for field in required_fields:
        if field not in data:
            return jsonify(message=f"Erreur : Le champ {field} est requis."), 400

    nom = data['nom']
    prenom = data['prenom']
    date_naissance = data['date_naissance']
    email = data['email']
    numTel = data['numTel']
    password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    type = data.get('type', 'client')  # Utiliser 'client' par défaut
    numSiret = data.get('numSiret', None)
    adresse = data['adresse']

    if(type != 'client' and numSiret == None):
        return jsonify(message=f"Erreur : Le champ numSiret est requis."), 400

    # Déterminer la valeur par défaut pour 'activer'
    activer = True if type == 'client' else False

    cur = mysql.connection.cursor()
    try:
        cur.execute("""
            INSERT INTO utilisateur (nom, prenom, date_naissance, email, numTel, password, type, numSiret, adresse, activer)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (nom, prenom, date_naissance, email, numTel, password, type, numSiret, adresse, activer))
        mysql.connection.commit()
        return jsonify(message="Utilisateur créé avec succès!"), 201
    except mysql.connection.IntegrityError as e:
        error_message = str(e)
        if "Duplicate entry" in error_message:
            if "email" in error_message:
                return jsonify(message="L'email est déjà utilisé."), 400
            elif "numTel" in error_message:
                return jsonify(message="Le numéro de téléphone est déjà utilisé."), 400
            elif "numSiret" in error_message:
                return jsonify(message="Le numéro SIRET est déjà utilisé."), 400
        return jsonify(message="Erreur lors de l'inscription", error=error_message), 500
    finally:
        cur.close()



def login(mysql):
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Vérifier si les champs requis sont présents
    if not email or not password:
        return jsonify(message="Erreur : L'email et le mot de passe sont requis."), 400

    cur = mysql.connection.cursor()
    try:
        cur.execute("SELECT id, password, type FROM utilisateur WHERE email = %s", (email,))
        user = cur.fetchone()
        
        if user:
            user_id, hashed_password, user_type = user
           
            if bcrypt.check_password_hash(hashed_password, password):
                # Créer un token JWT pour l'utilisateur
                
                access_token = create_access_token(identity={'id': user_id, 'type': user_type})
                print("Hello")
                return jsonify(access_token=access_token), 200
            else:
                return jsonify(message="Mot de passe incorrect."), 401
        else:
            return jsonify(message="Email non trouvé."), 404
    except Exception as e:
        print(e)
        return jsonify(message="Erreur lors de la connexion.", error=str(e)), 500
    finally:
        cur.close()