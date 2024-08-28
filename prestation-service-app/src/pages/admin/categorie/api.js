import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

// Fonction pour récupérer la liste des catégories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des catégories.');
  }
};

// Fonction pour créer une nouvelle catégorie
export const createCategory = async (category) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, category);
    return response;
  } catch (error) {
    throw new Error('Erreur lors de la création de la catégorie.');
  }
};

// Fonction pour mettre à jour une catégorie
export const updateCategory = async (categoryId, updatedCategory) => {
  try {
    const response = await axios.post(`${API_URL}/categories/${categoryId}`, updatedCategory);
    return response;
  } catch (error) {
    throw new Error('Erreur lors de la modification de la catégorie.');
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`/categories/${categoryId}`);
    console.log(response.data.message); // Affiche le message de succès
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error.response?.data?.message || error.message);
  }
};


export const fetchSubCategories = async (categoryId) => {
    try {
        const response = await axios.get(`${API_URL}/categories/${categoryId}/sous-categories`);
      return response;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des sous-catégories.');
    }
  };
  
  // Fonction pour créer une nouvelle sous-catégorie
  export const createSubCategory = async (subCategory) => {
    try {
      console.log(subCategory)
      const response = await axios.post(`${API_URL}/sous-categories`, subCategory);
      console.log(response)
      return response;
    } catch (error) {
      throw new Error('Erreur lors de la création de la sous-catégorie.');
    }
  };
  
  // Fonction pour supprimer une sous-catégorie
  export const deleteSubCategory = async (subCategoryId) => {
    try {
      const response = await axios.delete(`${API_URL}/sous-categories/${subCategoryId}`);
      return response;
    } catch (error) {
      throw new Error('Erreur lors de la suppression de la sous-catégorie.');
    }
  };

  export const updateSubCategory = async (subCategoryId, updatedSubCategory) => {
    try {
      const response = await axios.post(`${API_URL}/sous-categories/${subCategoryId}`, updatedSubCategory);
      return response;
    } catch (error) {
      throw new Error('Erreur lors de la modification de la sous-catégorie.');
    }
  };
