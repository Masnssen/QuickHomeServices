// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Assurez-vous que cette URL est correcte pour votre serveur

export const fetchCategoryDetails = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${categoryId}`);
    return response.data.category;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la catégorie:', error);
    throw error;
  }
};

export const fetchSubCategories = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${categoryId}/sous-categories`);
    return response.data.sous_categories;
  } catch (error) {
    console.error('Erreur lors de la récupération des sous-catégories:', error);
    throw error;
  }
};

// Fonction pour soumettre la réservation
export const submitReservation = async (categorie, sous_categorie, prix_unitaire, unite, prix_total, client_email, auto_entrepreneur, etat, date_debut, heures_disponibles) => {
    try {
      const response = await axios.post('http://localhost:5000/reservations', {
        categorie,
        sous_categorie,
        prix_unitaire,
        unite,
        prix_total,
        client_email,
        auto_entrepreneur,
        etat,
        date_debut,
        heures_disponibles,
      });
      console.log('Réservation réussie:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      throw error;
    }
  };
  
