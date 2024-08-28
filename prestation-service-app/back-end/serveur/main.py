from flask import Flask
from modules.authentification import init_mysql, register, bcrypt, login
from modules.mysql_db import get_db_config
from flask_cors import CORS  # Importer CORS
from flask_jwt_extended import JWTManager, jwt_required
from modules.admin_users import *
from modules.categorie_prestation import *
from modules.commande import *
from modules.prestation import *
from modules.sous_categorie_prestation import *

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})  # Permettre toutes les origines

db_config = get_db_config()

# Configurer l'application Flask avec les paramètres de la base de données
app.config['MYSQL_HOST'] = db_config['host']
app.config['MYSQL_USER'] = db_config['user']
app.config['MYSQL_PASSWORD'] = db_config['password']
app.config['MYSQL_DB'] = db_config['database']

# Initialiser Bcrypt et MySQL avec l'application Flask

bcrypt.init_app(app)
mysql = init_mysql(app)

app.config['JWT_SECRET_KEY'] = "tRXN9vGGA2DDg1jnGeuxeuUDKoRhTSsX/8az9vHpuNQ="
jwt = JWTManager(app)
# Routes
@app.route('/register', methods=['POST'])
def register_route():
    return register(mysql)

@app.route('/login', methods=['POST'])
def login_route():
    return login(mysql)

@app.route('/admin/users', methods=['GET'])
def all_users():
    return get_all_users(mysql)

@app.route('/admin/users/<int:user_id>', methods=['GET'])
def user_details(user_id):
    return get_user_details(mysql, user_id)

@app.route('/admin/users/<int:user_id>', methods=['POST'])
def update_user_route(user_id):
    return update_user(mysql, user_id)

@app.route('/admin/users/<int:user_id>/activation', methods=['POST'])
def update_user_activation_route(user_id):
    return update_user_activation(mysql, user_id)

# Routes de gestion des catégories de prestations
@app.route('/categories', methods=['GET'])
def get_categories():
    return get_all_categories_prestation(mysql)

@app.route('/categories', methods=['POST'])
def create_category():
    data = request.get_json()
    if "titre" not in data:
        return jsonify(message="Erreur lors de l'assignation de la commande à la prestation.\nPas de titre"), 500
    
    if ("description" not in data):
        data["description"] = None

    return create_categorie_prestation(mysql, data['titre'], data['description'])

@app.route('/categories/<int:categorie_id>', methods=['POST'])
def update_category(categorie_id):
    data = request.get_json()
    if "titre" not in data:
        data["titre"] = None
    
    if "description" not in data:
        data["description"] = None
    
    print(data)
    return update_categorie_prestation(mysql, categorie_id, data.get('titre'), data.get('description'))

@app.route('/categories/<int:categorie_id>', methods=['DELETE'])
def delete_category(categorie_id):
    return delete_categorie_prestation(mysql, categorie_id)

# Routes de gestion des sous-catégories de prestations
@app.route('/categories/<int:categorie_id>/sous-categories', methods=['GET'])
def get_sous_categories(categorie_id):
    return get_all_sous_categories_by_categorie(mysql, categorie_id)

@app.route('/sous-categories', methods=['POST'])
def create_sous_category():
    
    data = request.get_json()
    if "id_categorie" not in data:
        return jsonify(message="Erreur : 'id_categorie' est requis et doit être un entier."), 400

    if "titre" not in data or not data['titre'].strip():
        return jsonify(message="Erreur : 'titre' est requis."), 400
       
    if "prix_unitaire" not in data:
        return jsonify(message="Erreur : 'prix_unitaire' est requis et doit être un nombre."), 400

    description = data.get('description', None)
    
    return create_sous_categorie_prestation(mysql, data['id_categorie'], data['titre'], description, data['prix_unitaire'])

@app.route('/sous-categories/<int:sous_categorie_id>', methods=['POST'])
def update_sous_category(sous_categorie_id):
    data = request.get_json()

    titre = data.get('titre', None)
    description = data.get('description', None)
    prix_unitaire = data.get('prix_unitaire', None)

    if prix_unitaire is not None and not isinstance(prix_unitaire, (int, float)):
        return jsonify(message="Erreur : 'prix_unitaire' doit être un nombre."), 400

    return update_sous_categorie_prestation(mysql, sous_categorie_id, titre, description, prix_unitaire)

@app.route('/sous-categories/<int:sous_categorie_id>', methods=['DELETE'])
def delete_sous_category(sous_categorie_id):
    return delete_sous_categorie_prestation(mysql, sous_categorie_id)

# Routes de gestion des prestations
@app.route('/prestations', methods=['POST'])
def create_prestation_route():
    data = request.get_json()

    if "categorie" not in data or not isinstance(data['categorie'], int):
        return jsonify(message="Erreur : 'categorie' est requis et doit être un entier."), 400

    if "sous_categorie" not in data or not isinstance(data['sous_categorie'], int):
        return jsonify(message="Erreur : 'sous_categorie' est requis et doit être un entier."), 400

    if "prix_unitaire" not in data or not isinstance(data['prix_unitaire'], (int, float)):
        return jsonify(message="Erreur : 'prix_unitaire' est requis et doit être un nombre."), 400

    if "unite" not in data or not isinstance(data['unite'], int):
        return jsonify(message="Erreur : 'unite' est requis et doit être un entier."), 400

    if "prix_total" not in data or not isinstance(data['prix_total'], (int, float)):
        return jsonify(message="Erreur : 'prix_total' est requis et doit être un nombre."), 400

    if "client_email" not in data or not data['client_email'].strip():
        return jsonify(message="Erreur : 'client_email' est requis."), 400

    return create_prestation(mysql, data['categorie'], data['sous_categorie'], data['prix_unitaire'], data['unite'], data['prix_total'], data['client_email'])

@app.route('/prestations/<int:prestation_id>', methods=['POST'])
def update_prestation_route(prestation_id):
    data = request.get_json()

    prix_unitaire = data.get('prix_unitaire', None)
    unite = data.get('unite', None)
    prix_total = data.get('prix_total', None)

    if prix_unitaire is not None and not isinstance(prix_unitaire, (int, float)):
        return jsonify(message="Erreur : 'prix_unitaire' doit être un nombre."), 400

    if unite is not None and not isinstance(unite, int):
        return jsonify(message="Erreur : 'unite' doit être un entier."), 400

    if prix_total is not None and not isinstance(prix_total, (int, float)):
        return jsonify(message="Erreur : 'prix_total' doit être un nombre."), 400

    return update_prestation(mysql, prestation_id, prix_unitaire, unite, prix_total)

@app.route('/prestations/<int:prestation_id>/assign-auto-entrepreneur', methods=['POST'])
def assign_auto_entrepreneur_route(prestation_id):
    data = request.get_json()

    if "auto_entrepreneur" not in data or not data['auto_entrepreneur'].strip():
        return jsonify(message="Erreur : 'auto_entrepreneur' est requis."), 400

    return assign_auto_entrepreneur(mysql, prestation_id, data['auto_entrepreneur'])

@app.route('/prestations/<int:prestation_id>/update-state', methods=['POST'])
def update_prestation_state_route(prestation_id):
    data = request.get_json()

    if "new_state" not in data or data['new_state'] not in ['dans_panier', 'attente_attribution', 'en_cours_execution', 'faite']:
        return jsonify(message="Erreur : 'new_state' est requis et doit être l'un des états valides."), 400

    return update_prestation_state(mysql, prestation_id, data['new_state'])

@app.route('/prestations/<int:prestation_id>/assign-commande', methods=['POST'])
def assign_commande_route(prestation_id):
    data = request.get_json()

    if "id_commande" not in data or not isinstance(data['id_commande'], int):
        return jsonify(message="Erreur : 'id_commande' est requis et doit être un entier."), 400

    return assign_commande(mysql, prestation_id, data['id_commande'])

# Routes de gestion des commandes
@app.route('/commandes', methods=['POST'])
def create_commande_route():
    data = request.get_json()

    if "prix_total" not in data or not isinstance(data['prix_total'], (int, float)):
        return jsonify(message="Erreur : 'prix_total' est requis et doit être un nombre."), 400

    if "client_email" not in data or not data['client_email'].strip():
        return jsonify(message="Erreur : 'client_email' est requis."), 400

    return create_commande(mysql, data['prix_total'], data['client_email'])

@app.route('/commandes/<int:commande_id>', methods=['POST'])
def update_commande_route(commande_id):
    data = request.get_json()

    prix_total = data.get('prix_total', None)

    if prix_total is not None and not isinstance(prix_total, (int, float)):
        return jsonify(message="Erreur : 'prix_total' doit être un nombre."), 400

    return update_commande(mysql, commande_id, prix_total)

@app.route('/commandes/<int:commande_id>', methods=['DELETE'])
def delete_commande_route(commande_id):
    return delete_commande(mysql, commande_id)


if __name__ == "__main__":
    app.run(debug=True)
