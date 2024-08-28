import axios from 'axios';

// Configurer l'URL de base pour les requêtes API
const API_BASE_URL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

// Fonction pour envoyer les données d'inscription au serveur
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data; // Renvoie les données de réponse
  } catch (error) {
    // Gérer les erreurs et renvoyer un message d'erreur
    throw new Error(error.response ? error.response.data.message : 'Erreur lors de l\'envoi des données');
  }
};

export async function loginUser(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }
  
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }