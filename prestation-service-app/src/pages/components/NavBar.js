import React from 'react';
import './NavBar.css'; // Assurez-vous d'ajouter le CSS approprié

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">QuickHomeServices</a>
        <ul className="navbar-menu">
          <li><a href="/">Accueil</a></li>
          <li><a href="/login">Connexion</a></li>
          <li><a href="/signup">Créer un Compte</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/cart">Panier</a></li> 
          <li><a href="/admin_users">Admin_Users</a></li>
          <li><a href="/admin/categories">Admin catégorie</a></li>

        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
