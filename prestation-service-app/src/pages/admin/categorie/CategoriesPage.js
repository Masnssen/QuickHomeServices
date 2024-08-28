import React, { useState, useEffect } from 'react';
import './CategoriesPage.css'; // Assurez-vous que le CSS est correctement lié
import {updateCategory, fetchCategories, createCategory, deleteCategory} from "./api"


function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [message, setMessage] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryTitle, setEditCategoryTitle] = useState('');
  const [editCategoryDescription, setEditCategoryDescription] = useState('');

  // Charger les catégories depuis le serveur
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data.categories);
      } catch (error) {
        setMessage('Erreur lors du chargement des catégories.');
      }
    };

    loadCategories();
  }, []);

  // Fonction pour créer une nouvelle catégorie
  const handelcreateCategory = async () => {
    try {
      const category = {
        titre: newCategoryTitle,
        description: newCategoryDescription
      }
      await createCategory(category)
      setMessage('Catégorie créée avec succès.');
      setNewCategoryTitle('');
      setNewCategoryDescription('');
      // Recharger les catégories
      const response = await fetchCategories();
      setCategories(response.data.categories);
    } catch (error) {
      setMessage('Erreur lors de la création de la catégorie.');
    }
  };

  // Fonction pour activer le formulaire de modification
  const startEditing = (category) => {
    console.log(category)
    setEditCategoryId(category.id);
    setEditCategoryTitle(category.titre);
    setEditCategoryDescription(category.description);
  };

  // Fonction pour modifier une catégorie
  const handleUpdateCategory = async () => {
    try {
      const updatedCategory = {
        titre: editCategoryTitle,
        description: editCategoryDescription
      };
      await updateCategory(editCategoryId, updatedCategory);
      setMessage('Catégorie modifiée avec succès.');
      setEditCategoryId(null);
      // Recharger les catégories
      const response = await fetchCategories();
      setCategories(response.data.categories);
    } catch (error) {
      setMessage('Erreur lors de la modification de la catégorie.');
    }
  };

  // Fonction pour supprimer une catégorie
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie et toutes ses sous-catégories ?")) {
      try {
        await deleteCategory(categoryId);
        setMessage('Catégorie et ses sous-catégories supprimées avec succès.');
        // Recharger les catégories
        const response = await fetchCategories();
        setCategories(response.data.categories);
      } catch (error) {
        setMessage('Erreur lors de la suppression de la catégorie.');
      }
    }
  };

  return (
    <div className="categories-page">
      <h1>Gestion des Catégories</h1>
      {message && <p>{message}</p>}

      {/* Formulaire de création */}
      <div className="create-category-form">
        <h2>Créer une Nouvelle Catégorie</h2>
        <input
          type="text"
          placeholder="Titre de la catégorie"
          value={newCategoryTitle}
          onChange={(e) => setNewCategoryTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={newCategoryDescription}
          onChange={(e) => setNewCategoryDescription(e.target.value)}
        />
        <button onClick={handelcreateCategory}>Créer</button>
      </div>

      {/* Formulaire de modification */}
      {editCategoryId && (
        <div className="edit-category-form">
          <h2>Modifier la Catégorie</h2>
          <input
            type="text"
            value={editCategoryTitle}
            onChange={(e) => setEditCategoryTitle(e.target.value)}
          />
          <textarea
            value={editCategoryDescription}
            onChange={(e) => setEditCategoryDescription(e.target.value)}
          />
          <button onClick={handleUpdateCategory}>Modifier</button>
          <button onClick={() => setEditCategoryId(null)}>Annuler</button>
        </div>
      )}

      {/* Liste des catégories */}
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.titre}</td>
              <td>{category.description}</td>
              <td>
                <button onClick={() => window.location.href = `/admin/categories/${category.id}/sous-categories`}>
                  Afficher Sous-Catégories
                </button>
                <button onClick={() => startEditing(category)}>
                  Modifier
                </button>
                <button onClick={() => handleDeleteCategory(category.id)} className="delete-button">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default CategoriesPage;
