import React, { useState } from 'react';
import './SignUpPage.css';
import NavBar from '../components/NavBar';
import { registerUser } from './api';

function SignUpPage() {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userType, setUserType] = useState('client'); // Valeur par défaut à 'client'
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    email: '',
    numTel: '',
    password: '',
    confirmPassword: '',
    numSiret: '',
    adresse: ''
  });

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await registerUser(formData);
      setSuccessMessage(response.message || "Inscription réussie !");
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="signup-page-container">
        <h1>Créer un Compte</h1>
        <div className="user-type-selection">
          <button
            className={`user-type-button ${userType === 'auto-entrepreneur' ? 'selected' : ''}`}
            onClick={() => handleUserTypeChange('auto-entrepreneur')}
          >
            Auto-entrepreneur
          </button>
          <button
            className={`user-type-button ${userType === 'client' ? 'selected' : ''}`}
            onClick={() => handleUserTypeChange('client')}
          >
            Bénéficiaire des Prestations
          </button>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            Nom
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Prénom
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date de Naissance
            <input
              type="date"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Téléphone
            <input
              type="tel"
              name="numTel"
              value={formData.numTel}
              onChange={handleChange}
              required
            />
          </label>
          {userType === 'auto-entrepreneur' && (
            <label>
              Numéro de SIRET
              <input
                type="text"
                name="numSiret"
                value={formData.numSiret}
                onChange={handleChange}
                required
              />
            </label>
          )}
          <label>
            Adresse
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mot de Passe
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirmer le Mot de Passe
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Créer un Compte</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
}

export default SignUpPage;
