from flask import jsonify

def create_sous_categorie_prestation(mysql, id_categorie, titre, description, prix_unitaire):
    cur = mysql.connection.cursor()
    print("Hello")
    try:
        print(titre)
        insert_query = """
        INSERT INTO sous_categorie_prestation (id_categorie, titre, description, prix_unitaire) 
        VALUES (%s, %s, %s, %s)
        """
        cur.execute(insert_query, (id_categorie, titre, description, prix_unitaire))
        mysql.connection.commit()
        return jsonify(message="Sous-catégorie de prestation créée avec succès!"), 201
    except Exception as e:
        return jsonify(message="Erreur lors de la création de la sous-catégorie de prestation.", error=str(e)), 500
    finally:
        cur.close()

def update_sous_categorie_prestation(mysql, sous_categorie_id, titre=None, description=None, prix_unitaire=None):
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
        if prix_unitaire is not None:
            update_fields.append("prix_unitaire = %s")
            values.append(prix_unitaire)

        if update_fields:
            update_query = f"UPDATE sous_categorie_prestation SET {', '.join(update_fields)} WHERE id = %s"
            values.append(sous_categorie_id)
            cur.execute(update_query, tuple(values))
            mysql.connection.commit()
            return jsonify(message="Sous-catégorie de prestation mise à jour avec succès!"), 200
        else:
            return jsonify(message="Aucun champ à mettre à jour."), 400
    except Exception as e:
        return jsonify(message="Erreur lors de la mise à jour de la sous-catégorie de prestation.", error=str(e)), 500
    finally:
        cur.close()

def delete_sous_categorie_prestation(mysql, sous_categorie_id):
    cur = mysql.connection.cursor()
    try:
        delete_query = "DELETE FROM sous_categorie_prestation WHERE id = %s"
        cur.execute(delete_query, (sous_categorie_id,))
        mysql.connection.commit()
        return jsonify(message="Sous-catégorie de prestation supprimée avec succès!"), 200
    except Exception as e:
        return jsonify(message="Erreur lors de la suppression de la sous-catégorie de prestation.", error=str(e)), 500
    finally:
        cur.close()

def get_all_sous_categories_by_categorie(mysql, id_categorie):
    cur = mysql.connection.cursor()
    try:
        select_query = "SELECT id, titre, description, prix_unitaire FROM sous_categorie_prestation WHERE id_categorie = %s"
        cur.execute(select_query, (id_categorie,))
        sous_categories = cur.fetchall()
        sous_categories_list = [
            {'id': sous_categorie[0], 'titre': sous_categorie[1], 'description': sous_categorie[2], 'prix_unitaire': sous_categorie[3]}
            for sous_categorie in sous_categories
        ]
        return jsonify(sous_categories=sous_categories_list), 200
    except Exception as e:
        return jsonify(message="Erreur lors de la récupération des sous-catégories de prestation.", error=str(e)), 500
    finally:
        cur.close()