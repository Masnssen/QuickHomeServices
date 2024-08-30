from flask import jsonify


def create_categorie_prestation(mysql, titre, description):
    cur = mysql.connection.cursor()

    try:
        insert_query = """
        INSERT INTO categorie_prestation (titre, description) 
        VALUES (%s, %s)
        """
        cur.execute(insert_query, (titre, description))
        mysql.connection.commit()
        return jsonify(message="Catégorie de prestation créée avec succès!"), 201
    except Exception as e:
        return jsonify(message="Erreur lors de la création de la catégorie de prestation.", error=str(e)), 500
    finally:
        cur.close()

def update_categorie_prestation(mysql, categorie_id, titre=None, description=None):
    cur = mysql.connection.cursor()
    try:
        update_fields = []
        values = []

        if titre:
            update_fields.append("titre = %s")
            values.append(titre)
        if description:
            update_fields.append("description = %s")
            values.append(description)

        if update_fields:
            update_query = f"UPDATE categorie_prestation SET {', '.join(update_fields)} WHERE id = %s"
            values.append(categorie_id)
            cur.execute(update_query, tuple(values))
            mysql.connection.commit()
            return jsonify(message="Catégorie de prestation mise à jour avec succès!"), 200
        else:
            return jsonify(message="Aucun champ à mettre à jour."), 400
    except Exception as e:
        return jsonify(message="Erreur lors de la mise à jour de la catégorie de prestation.", error=str(e)), 500
    finally:
        cur.close()

def delete_categorie_prestation(mysql, categorie_id):
    cur = mysql.connection.cursor()
    try:
        # Démarrer une transaction
        mysql.connection.start_transaction()

        # Supprimer toutes les sous-catégories liées à la catégorie
        delete_sous_categorie_query = "DELETE FROM sous_categorie_prestation WHERE id_categorie = %s"
        cur.execute(delete_sous_categorie_query, (categorie_id,))
        
        # Supprimer la catégorie elle-même
        delete_categorie_query = "DELETE FROM categorie_prestation WHERE id = %s"
        cur.execute(delete_categorie_query, (categorie_id,))

        # Valider la transaction
        mysql.connection.commit()
        return jsonify(message="Catégorie et ses sous-catégories supprimées avec succès!"), 200
    except Exception as e:
        # Annuler la transaction en cas d'erreur
        mysql.connection.rollback()
        return jsonify(message="Erreur lors de la suppression de la catégorie de prestation.", error=str(e)), 500
    finally:
        cur.close()



def get_all_categories_prestation(mysql):
    cur = mysql.connection.cursor()
    try:
        select_query = "SELECT id, titre, description FROM categorie_prestation"
        cur.execute(select_query)
        categories = cur.fetchall()
        categories_list = [
            {'id': categorie[0], 'titre': categorie[1], 'description': categorie[2]}
            for categorie in categories
        ]
        return jsonify(categories=categories_list), 200
    except Exception as e:
        return jsonify(message="Erreur lors de la récupération des catégories de prestation.", error=str(e)), 500
    finally:
        cur.close()

def get_category_by_id(mysql, category_id):
    cur = mysql.connection.cursor()
    try:
        # Préparer la requête SQL pour obtenir les détails de la catégorie par ID
        select_query = "SELECT id, titre, description FROM categorie_prestation WHERE id = %s"
        cur.execute(select_query, (category_id,))
        category = cur.fetchone()

        # Vérifier si une catégorie a été trouvée
        if category:
            category_details = {
                'id': category[0],
                'titre': category[1],
                'description': category[2]
            }
            return jsonify(category=category_details), 200
        else:
            return jsonify(message="Catégorie non trouvée."), 404

    except Exception as e:
        return jsonify(message="Erreur lors de la récupération des détails de la catégorie.", error=str(e)), 500
    finally:
        cur.close()
