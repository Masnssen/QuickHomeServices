from flask import jsonify

from flask import jsonify, request
from datetime import datetime

def create_prestation(mysql):
    cur = mysql.connection.cursor()
    try:
        # Extraire les données du corps de la requête
        data = request.json
        categorie = data.get('categorie')
        sous_categorie = data.get('sous_categorie')
        prix_unitaire = data.get('prix_unitaire')
        unite = data.get('unite')
        prix_total = data.get('prix_total')
        client_email = data.get('client_email')
        etat = data.get('etat')
        heures_disponibles = data.get('heures_disponibles')  # Liste d'objets avec date et heures disponibles
    
        # Insertion dans la table `prestation`
        insert_prestation_query = """
        INSERT INTO prestation (categorie, sous_categorie, prix_unitaire, unite, prix_total, client_email, etat)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cur.execute(insert_prestation_query, (categorie, sous_categorie, prix_unitaire, unite, prix_total, client_email, etat))
        prestation_id = cur.lastrowid

        # Insertion dans la table `prestation_dates` pour chaque date et heure disponible
        insert_prestation_dates_query = """
        INSERT INTO prestation_dates (prestation_id, date_debut)
        VALUES (%s, %s)
        """
        for date_heure in heures_disponibles:
            date_heure_formatee = datetime.strptime(date_heure, '%Y-%m-%dT%H:%M:%S')  # Format de la date
            cur.execute(insert_prestation_dates_query, (prestation_id, date_heure_formatee))

        # Commit des transactions
        mysql.connection.commit()

        return jsonify(message="Réservation créée avec succès.", prestation_id=prestation_id), 201

    except Exception as e:
        mysql.connection.rollback()
        return jsonify(message="Erreur lors de la création de la réservation.", error=str(e)), 500
    finally:
        cur.close()

def update_prestation(mysql, prestation_id, prix_unitaire=None, unite=None, prix_total=None):
    cur = mysql.connection.cursor()
    try:
        update_fields = []
        values = []

        if prix_unitaire:
            update_fields.append("prix_unitaire = %s")
            values.append(prix_unitaire)
        if unite:
            update_fields.append("unite = %s")
            values.append(unite)
        if prix_total:
            update_fields.append("prix_total = %s")
            values.append(prix_total)

        if update_fields:
            update_query = f"UPDATE prestation SET {', '.join(update_fields)} WHERE id = %s"
            values.append(prestation_id)
            cur.execute(update_query, tuple(values))
            mysql.connection.commit()
            return jsonify(message="Prestation mise à jour avec succès!"), 200
        else:
            return jsonify(message="Aucun champ à mettre à jour."), 400
    except Exception as e:
        return jsonify(message="Erreur lors de la mise à jour de la prestation.", error=str(e)), 500
    finally:
        cur.close()


def assign_auto_entrepreneur(mysql, prestation_id, auto_entrepreneur):
    cur = mysql.connection.cursor()
    try:
        update_query = """
        UPDATE prestation 
        SET auto_entrepreneur = %s, etat = 'en_cours_execution' 
        WHERE id = %s
        """
        cur.execute(update_query, (auto_entrepreneur, prestation_id))
        mysql.connection.commit()
        return jsonify(message="Auto-entrepreneur assigné à la prestation avec succès!"), 200
    except Exception as e:
        return jsonify(message="Erreur lors de l'assignation de l'auto-entrepreneur à la prestation.", error=str(e)), 500
    finally:
        cur.close()

def update_prestation_state(mysql, prestation_id, new_state):
    cur = mysql.connection.cursor()
    try:
        if new_state not in ['dans_panier', 'attente_attribution', 'en_cours_execution', 'faite']:
            return jsonify(message="Erreur : état de prestation invalide."), 400

        update_query = """
        UPDATE prestation 
        SET etat = %s 
        WHERE id = %s
        """
        cur.execute(update_query, (new_state, prestation_id))
        mysql.connection.commit()
        return jsonify(message="État de la prestation mis à jour avec succès!"), 200
    except Exception as e:
        return jsonify(message="Erreur lors de la mise à jour de l'état de la prestation.", error=str(e)), 500
    finally:
        cur.close()

def assign_commande(mysql, prestation_id, id_commande):
    cur = mysql.connection.cursor()
    try:
        update_query = """
        UPDATE prestation 
        SET id_commande = %s, etat = 'attente_attribution' 
        WHERE id = %s
        """
        cur.execute(update_query, (id_commande, prestation_id))
        mysql.connection.commit()
        return jsonify(message="Commande assignée à la prestation avec succès!"), 200
    except Exception as e:
        return jsonify(message="Erreur lors de l'assignation de la commande à la prestation.", error=str(e)), 500
    finally:
        cur.close()