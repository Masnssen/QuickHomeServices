import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserDetailPage.css'; // Assurez-vous que le CSS est correctement lié
import {fetchUserDetails, updateUserDetails, updateUserActivation} from "./api"

function UserDetailPage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    // Charger les utilisateurs depuis le serveur
    const loadUser = async () => {
      try {
        const response = await fetchUserDetails(userId);

        //Formater la date de naissance 
        setUser(response.data.user); // Assurez-vous que la réponse contient les données dans `response.data`
        console.log(response.data.user.date_naissance)
      } catch (error) {
        setMessage("Erreur lors du chargement de l'utilisateur.");
      }
    };

    loadUser();
  }, [userId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    // Préparer les données de l'utilisateur à envoyer
    const updatedUser = {
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      date_naissance: user.date_naissance,
      numTel: user.numTel,
      adresse: user.adresse,
      numSiret: user.numSiret,
      activer: user.activer,
    };

    try {
      // Appeler la fonction d'API pour mettre à jour l'utilisateur
      const response = await updateUserDetails(user.id, updatedUser);

      if (response.status === 200) {
        setMessage('Utilisateur mis à jour avec succès !');
        setIsEditing(false); // Désactiver le mode édition après la mise à jour
      }
    } catch (error) {
      setMessage('Erreur lors de la mise à jour de l\'utilisateur.');
    }
  };

  const handleDelete = () => {
    // Ici, vous pouvez ajouter la logique pour supprimer l'utilisateur
   
    setMessage('Utilisateur supprimé avec succès !');
    navigate('/admin_users'); // Rediriger après suppression
  };

  const handleActivation = async () => {
    try {
      var send = "Activé"
      if(user.status === "Activé"){
        send = "Non Activé"
      }
      const response = await updateUserActivation(user.id, send);
      if (response.status === 200) {
        setMessage("Utilisateur "+send+ " avec succès !");
        setIsEditing(false); // Désactiver le mode édition après la mise à jour
        setUser({ ...user, status: send });
      } else {
        setMessage('Échec de l\'activation de l\'utilisateur.');
      }
    } catch (error) {
      setMessage('Erreur lors de de l\'activation de l\'utilisateur.');
    }
  };


  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="user-detail-page">
      <h1>Détails de l'utilisateur</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Nom:
          <input
            type="text"
            value={user.nom || ''}
            onChange={(e) => setUser({ ...user, nom: e.target.value })}
            disabled={!isEditing}
            required
          />
        </label>
        <label>
          Prénom:
          <input
            type="text"
            value={user.prenom || ''}
            onChange={(e) => setUser({ ...user, prenom: e.target.value })}
            disabled={!isEditing}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={user.email || ''}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            disabled={!isEditing}
            required
          />
        </label>
        <label>
          Date de naissance:
          <input
            type="date"
            value={user.date_naissance || ''}
            onChange={(e) => setUser({ ...user, date_naissance: e.target.value })}
            disabled={!isEditing}
            required
          />
        </label>
        <label>
          Téléphone:
          <input
            type="tel"
            value={user.numTel || ''}
            onChange={(e) => setUser({ ...user, numTel: e.target.value })}
            disabled={!isEditing}
            required
          />
        </label>
        <label>
          Adresse:
          <input
            type="text"
            value={user.adresse || ''}
            onChange={(e) => setUser({ ...user, adresse: e.target.value })}
            disabled={!isEditing}
            required
          />
        </label>
        {user.type === 'auto-entrepreneur' && (
          <label>
            Numéro de SIRET:
            <input
              type="text"
              value={user.numSiret || ''}
              onChange={(e) => setUser({ ...user, numSiret: e.target.value })}
              disabled={!isEditing}
              required
            />
          </label>
        )}
        {isEditing && (
         <button type="submit">
            Sauvegarder
         </button>
        )}
        <button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Annuler' : 'Modifier'}
        </button>
        
        <button type="button" onClick={handleActivation}>
          {user.status === 'Activé' ? 'Désactiver' : 'Activé'}
        </button>
      
        <button type="button" onClick={handleDelete}>
          Supprimer l'utilisateur
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserDetailPage;
