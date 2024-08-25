import React, { useState } from 'react';
import './SignUpPage.css';
import NavBar from '../components/NavBar';
function SignUpPage() {
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div>
    <NavBar />
    <div className="signup-page-container">
     
      <h1>Créer un Compte</h1>
      <div className="user-type-selection">
        <button
          className={`user-type-button ${userType === 'entrepreneur' ? 'selected' : ''}`}
          onClick={() => setUserType('entrepreneur')}
        >
          Auto-entrepreneur
        </button>
        <button
          className={`user-type-button ${userType === 'client' ? 'selected' : ''}`}
          onClick={() => setUserType('client')}
        >
          Bénéficiaire des Prestations
        </button>
      </div>
      {userType && (
        <form className="signup-form">
          {userType === 'entrepreneur' ? (
            <>
              <label>
                Nom de l'entreprise
                <input type="text" name="companyName" required />
              </label>
              <label>
                Numéro de SIRET
                <input type="text" name="siret" required />
              </label>
              <label>
                Activités
                <textarea name="activities" required></textarea>
              </label>
              <label>
                Adresse
                <input type="text" name="address" required />
              </label>
              <label>
                Téléphone
                <input type="tel" name="phone" required />
              </label>
              <button type="submit">Créer un Compte</button>
            </>
          ) : (
            <>
              <label>
                Nom
                <input type="text" name="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Téléphone
                <input type="tel" name="phone" required />
              </label>
              <label>
                Adresse
                <input type="text" name="address" required />
              </label>
              <button type="submit">Créer un Compte</button>
            </>
          )}
        </form>
      )}
    </div>
  </div>
  );
}

export default SignUpPage;
