import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

// Fonction pour récupérer la liste des utilisateurs
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/users`);
    return response;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des utilisateurs.');
  }
};

// Fonction pour récupérer les détails d'un utilisateur
export const fetchUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/admin/users/${userId}`);
    return response;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des détails de l\'utilisateur.');
  }
};

// Fonction pour mettre à jour les informations d'un utilisateur
export const updateUserDetails = async (userId, updatedUser) => {
    try {
      const response = await axios.post(`${API_URL}/admin/users/${userId}`, updatedUser);
      return response;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de l\'utilisateur.');
    }
  };

// Fonction pour mettre à jour le statut d'activation d'un utilisateur
export const updateUserActivation = async (userId, activationStatus) => {
    try {
      // Assurez-vous que 'activationStatus' est soit 'Activé' soit 'Non Activé'
      if (activationStatus !== 'Activé' && activationStatus !== 'Non Activé') {
        throw new Error('Statut d\'activation invalide. Utilisez "Activé" ou "Non Activé".');
      }
      
      const response = await axios.post(`${API_URL}/admin/users/${userId}/activation`, { activer: activationStatus });
      return response;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour du statut d\'activation.');
    }
  };