import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSubCategories, createSubCategory, deleteSubCategory, updateSubCategory } from './api'; // Assurez-vous que le chemin est correct
import './SubCategoriesPage.css'; // Assurez-vous que le CSS est correctement lié

function SubCategoriesPage() {
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategoryTitle, setNewSubCategoryTitle] = useState('');
  const [newSubCategoryDescription, setNewSubCategoryDescription] = useState('');
  const [newSubCategoryPrice, setNewSubCategoryPrice] = useState('');
  const [message, setMessage] = useState('');
  const [editSubCategoryId, setEditSubCategoryId] = useState(null);
  const [editSubCategoryTitle, setEditSubCategoryTitle] = useState('');
  const [editSubCategoryDescription, setEditSubCategoryDescription] = useState('');
  const [editSubCategoryPrice, setEditSubCategoryPrice] = useState('');

  const { categoryId } = useParams();

  // Charger les sous-catégories depuis le serveur
  useEffect(() => {
    const loadSubCategories = async () => {
      try {
        const response = await fetchSubCategories(categoryId);
        setSubCategories(response.data.sous_categories); // Assurez-vous que la réponse contient les données dans `response.data`
      } catch (error) {
        setMessage('Erreur lors du chargement des sous-catégories.');
      }
    };

    loadSubCategories();
  }, [categoryId]);

  // Fonction pour créer une nouvelle sous-catégorie
  const handleCreateSubCategory = async () => {
    try {
      await createSubCategory({
        id_categorie: categoryId,
        titre: newSubCategoryTitle,
        description: newSubCategoryDescription,
        prix_unitaire: parseFloat(newSubCategoryPrice),
      });
      setMessage('Sous-catégorie créée avec succès.');
      setNewSubCategoryTitle('');
      setNewSubCategoryDescription('');
      setNewSubCategoryPrice('');
      // Recharger les sous-catégories
      const response = await fetchSubCategories(categoryId);
      setSubCategories(response.data.sous_categories);
    } catch (error) {
      setMessage('Erreur lors de la création de la sous-catégorie.');
    }
  };

  // Fonction pour supprimer une sous-catégorie
  const handleDeleteSubCategory = async (subCategoryId) => {
    try {
      await deleteSubCategory(subCategoryId);
      setMessage('Sous-catégorie supprimée avec succès.');
      // Recharger les sous-catégories
      const response = await fetchSubCategories(categoryId);
      setSubCategories(response.data.sous_categories);
    } catch (error) {
      setMessage('Erreur lors de la suppression de la sous-catégorie.');
    }
  };

  // Fonction pour activer le formulaire de modification
  const startEditing = (subCategory) => {
    setEditSubCategoryId(subCategory.id);
    setEditSubCategoryTitle(subCategory.titre);
    setEditSubCategoryDescription(subCategory.description);
    setEditSubCategoryPrice(subCategory.prix_unitaire);
  };

  // Fonction pour modifier une sous-catégorie
  const handleUpdateSubCategory = async () => {
    try {
      const updatedSubCategory = {
        titre: editSubCategoryTitle,
        description: editSubCategoryDescription,
        prix_unitaire: parseFloat(editSubCategoryPrice),
      };
      await updateSubCategory(editSubCategoryId, updatedSubCategory);
      setMessage('Sous-catégorie modifiée avec succès.');
      setEditSubCategoryId(null);
      // Recharger les sous-catégories
      const response = await fetchSubCategories(categoryId);
      setSubCategories(response.data.sous_categories);
    } catch (error) {
      setMessage('Erreur lors de la modification de la sous-catégorie.');
    }
  };

  return (
    <div className="sub-categories-page">
      <h1>Sous-Catégories</h1>
      {message && <p>{message}</p>}

      {/* Formulaire de création */}
      <div className="create-sub-category-form">
        <h2>Créer une Nouvelle Sous-Catégorie</h2>
        <input
          type="text"
          placeholder="Titre de la sous-catégorie"
          value={newSubCategoryTitle}
          onChange={(e) => setNewSubCategoryTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={newSubCategoryDescription}
          onChange={(e) => setNewSubCategoryDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prix Unitaire"
          value={newSubCategoryPrice}
          onChange={(e) => setNewSubCategoryPrice(e.target.value)}
        />
        <button onClick={handleCreateSubCategory}>Créer</button>
      </div>

      {/* Formulaire de modification */}
      {editSubCategoryId && (
        <div className="edit-sub-category-form">
          <h2>Modifier la Sous-Catégorie</h2>
          <input
            type="text"
            value={editSubCategoryTitle}
            onChange={(e) => setEditSubCategoryTitle(e.target.value)}
          />
          <textarea
            value={editSubCategoryDescription}
            onChange={(e) => setEditSubCategoryDescription(e.target.value)}
          />
          <input
            type="number"
            value={editSubCategoryPrice}
            onChange={(e) => setEditSubCategoryPrice(e.target.value)}
          />
          <button onClick={handleUpdateSubCategory}>Modifier</button>
          <button onClick={() => setEditSubCategoryId(null)}>Annuler</button>
        </div>
      )}

      {/* Liste des sous-catégories */}
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Prix Unitaire</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map(subCategory => (
            <tr key={subCategory.id}>
              <td>{subCategory.titre}</td>
              <td>{subCategory.description}</td>
              <td>{subCategory.prix_unitaire}</td>
              <td>
                <button onClick={() => startEditing(subCategory)}>
                  Modifier
                </button>
                <button onClick={() => handleDeleteSubCategory(subCategory.id)}>
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

export default SubCategoriesPage;
