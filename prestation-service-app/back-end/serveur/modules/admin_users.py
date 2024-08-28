from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from datetime import datetime

def get_all_users(mysql):
    cur = mysql.connection.cursor()
    try:
        cur.execute("SELECT id, nom, prenom, email, type, activer FROM utilisateur")
        users = cur.fetchall()
        user_list = [
            {   
                'id': user[0],
                'nom': user[1],
                'prenom': user[2],
                'email': user[3],
                'type': user[4],
                'status': 'Activé' if user[5] else 'Non Activé'
            }
            for user in users
        ]
        
        return jsonify(users=user_list), 200
    except Exception as e:
        return jsonify(message="Erreur lors de la récupération des utilisateurs.", error=str(e)), 500
    finally:
        cur.close()

def get_user_details(mysql, user_id):
    cur = mysql.connection.cursor()
    try:
        cur.execute("SELECT id, nom, prenom, email, date_naissance, numTel, type, numSiret, adresse, activer FROM utilisateur WHERE id = %s", (user_id,))
        user = cur.fetchone()
        if user:
            user_details = {
                'id': user[0],
                'nom': user[1],
                'prenom': user[2],
                'email': user[3],
                'date_naissance': user[4].strftime('%Y-%m-%d'),
                'numTel': user[5],
                'type': user[6],
                'numSiret': user[7],
                'adresse': user[8],
                'status': 'Activé' if user[9] else 'Non Activé'
            }
            return jsonify(user=user_details), 200
        else:
            return jsonify(message="Utilisateur non trouvé."), 404
    except Exception as e:
        return jsonify(message="Erreur lors de la récupération des détails de l'utilisateur.", error=str(e)), 500
    finally:
        cur.close()

def update_user(mysql, user_id):
    data = request.get_json()

    # Vérification des champs requis
    required_fields = ['nom', 'prenom', 'email', 'date_naissance', 'numTel', 'adresse']
    for field in required_fields:
        if field not in data:
            return jsonify(message=f"Erreur : Le champ {field} est requis."), 400

    # Récupération des données
    nom = data['nom']
    prenom = data['prenom']
    email = data['email']
    date_naissance = data['date_naissance']
    numTel = data['numTel']
    adresse = data['adresse']
    numSiret = data.get('numSiret', None)  # Le champ numSiret est optionnel
    activer = data.get('activer', None)  # Le champ activer est optionnel, mais peut être mis à jour
    if(activer == "Activé"):
        activer = True
    else:
        activer = False

    # Valider le format de date si nécessaire
    try:
        datetime.strptime(date_naissance, '%Y-%m-%d')
    except ValueError:
        return jsonify(message="Erreur : Le format de la date de naissance est incorrect. Utilisez le format YYYY-MM-DD."), 400

    # Préparation de la requête SQL
    if(numSiret == None):
        update_query = """
        UPDATE utilisateur
        SET nom = %s, prenom = %s, email = %s, date_naissance = %s, numTel = %s, adresse = %s, activer = %s
        WHERE id = %s
        """
        values = (nom, prenom, email, date_naissance, numTel, adresse, activer, user_id)
    else:    
        update_query = """
            UPDATE utilisateur
            SET nom = %s, prenom = %s, email = %s, date_naissance = %s, numTel = %s, adresse = %s, numSiret = %s, activer = %s
            WHERE id = %s
        """
        values = (nom, prenom, email, date_naissance, numTel, adresse, numSiret, activer, user_id)

    cur = mysql.connection.cursor()
    try:
        cur.execute(update_query, values)
        mysql.connection.commit()
        return jsonify(message="Utilisateur mis à jour avec succès!"), 200
    except mysql.connection.IntegrityError as e:
        error_message = str(e)
        if "Duplicate entry" in error_message:
            if "email" in error_message:
                return jsonify(message="L'email est déjà utilisé."), 400
            elif "numTel" in error_message:
                return jsonify(message="Le numéro de téléphone est déjà utilisé."), 400
            elif "numSiret" in error_message:
                return jsonify(message="Le numéro SIRET est déjà utilisé."), 400
        return jsonify(message="Erreur lors de la mise à jour de l'utilisateur.", error=error_message), 500
    finally:
        cur.close()

def update_user_activation(mysql, user_id):
    data = request.get_json()

    # Vérification que le champ 'activer' est présent dans la requête
    if 'activer' not in data:
        return jsonify(message="Erreur : Le champ 'activer' est requis."), 400

    # Récupération du nouveau statut d'activation
    activer = data['activer']
    if activer == "Activé":
        activer = True
    elif activer == "Non Activé":
        activer = False
    else:
        return jsonify(message="Erreur : Valeur de 'activer' invalide. Utilisez 'Activé' ou 'Non Activé'."), 400

    # Préparation de la requête SQL
    update_query = """
    UPDATE utilisateur
    SET activer = %s
    WHERE id = %s
    """
    values = (activer, user_id)

    cur = mysql.connection.cursor()
    try:
        cur.execute(update_query, values)
        mysql.connection.commit()
        return jsonify(message="Statut d'activation mis à jour avec succès!"), 200
    except Exception as e:
        return jsonify(message="Erreur lors de la mise à jour du statut d'activation.", error=str(e)), 500
    finally:
        cur.close()