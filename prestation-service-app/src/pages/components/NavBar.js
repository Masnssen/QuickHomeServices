import React, { useState, useEffect } from 'react';
import './NavBar.css';
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

// Fonction pour récupérer la liste des catégories
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data; // Renvoie les données des catégories
  } catch (error) {
    throw new Error('Erreur lors de la récupération des catégories.');
  }
};


function NavBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error(error.message);
      }
    };

    getCategories();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">QuickHomeServices</a>
        <ul className="navbar-menu">
          <li><a href="/">Accueil</a></li>
          <li>
            <a href="/services">Services</a>
            <ul className="dropdown-menu">
              {categories.map((category) => (
                <li key={category.id}>
                  <a href={`/categories/${category.id}`}>{category.titre}</a>
                </li>
              ))}
            </ul>
          </li>
          <li><a href="/login">Connexion</a></li>
          <li><a href="/signup">Créer un Compte</a></li>
          <li><a href="/cart">Panier</a></li> 
          <li><a href="/admin_users">Admin_Users</a></li>
          <li><a href="/admin/categories">Admin Catégorie</a></li>
          
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
