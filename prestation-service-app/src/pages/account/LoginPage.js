import React from 'react';
import NavBar from '../components/NavBar';
import './LoginPage.css'; // Assurez-vous d'ajouter le CSS approprié pour le style de la page

function LoginPage() {
  return (
    <div className="login-page">
      <NavBar />
      <main className="login-container">
        <h2>Connexion</h2>
        <form className="login-form">
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Mot de passe:
            <input type="password" name="password" required />
          </label>
          <button type="submit">Se Connecter</button>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
