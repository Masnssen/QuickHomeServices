import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import './LoginPage.css'; // Assurez-vous d'ajouter le CSS approprié pour le style de la page
import { loginUser } from './api';  // Assurez-vous que le chemin d'importation est correct

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Appeler la fonction loginUser et gérer la réponse
    const result = await loginUser(email, password);

    if (result.success) {
      setMessage('Connexion réussie !');

      // Stocker le token JWT dans le stockage local ou les cookies
      localStorage.setItem('access_token', result.token);
      console.log("Connection réussite")
      // Redirection ou autre action après une connexion réussie
      // Redirection vers une autre page par exemple :
      // window.location.href = '/dashboard'; // Remplacez '/dashboard' par le chemin de votre page protégée
    } else {
      console.log(result.message)
      setMessage(result.message);
    }
  };

  return (
    <div className="login-page">
      <NavBar />
      <main className="login-container">
        <h2>Connexion</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Mot de passe:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Se Connecter</button>
          {message && <p className="message">{message}</p>}
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
