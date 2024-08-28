from flask import jsonify

def create_commande(mysql, prix_total, client_email):
    cur = mysql.connection.cursor()
    try:
        insert_query = """
        INSERT INTO commande (prix_total, client_email) 
        VALUES (%s, %s)
        """
        cur.execute(insert_query, (prix_total, client_email))
        mysql.connection.commit()
        return jsonify(message="Commande créée avec succès!"), 201
    except Exception as e:
        return jsonify(message="Erreur lors de la création de la commande.", error=str(e)), 500
    finally:
        cur.close()

def update_commande(mysql, commande_id, prix_total=None):
    cur = mysql.connection.cursor()
    try:
        if prix_total:
            update_query = """
            UPDATE commande 
            SET prix_total = %s 
            WHERE id = %s
            """
            cur.execute(update_query, (prix_total, commande_id))
            mysql.connection.commit()
            return jsonify(message="Commande mise à jour avec succès!"), 200
        else:
            return jsonify(message="Aucun champ à mettre à jour."), 400
    except Exception as e:
        return jsonify(message="Erreur lors de la mise à jour de la commande.", error=str(e)), 500
    finally:
        cur.close()

def delete_commande(mysql, commande_id):
    cur = mysql.connection.cursor()
    try:
        delete_query = "DELETE FROM commande WHERE id = %s"
        cur.execute(delete_query, (commande_id,))
        mysql.connection.commit()
        return jsonify(message="Commande supprimée avec succès!"), 200
    except Exception as e:
        return jsonify(message="Erreur lors de la suppression de la commande.", error=str(e)), 500
    finally:
        cur.close()