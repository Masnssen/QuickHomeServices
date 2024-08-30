import React from 'react';
import NavBar from '../components/NavBar'; // Importation du composant NavBar
import './HomePage.css'; // Importation des styles CSS pour la page d'accueil

function HomePage() {
  return (
    <div className="homepage-container">
      <NavBar />
      <main className="homepage-main">
        <section className="homepage-introduction">
          <h2>Bienvenue sur QuickHomeServices</h2>
          <p>Découvrez nos services de qualité à domicile, simples et rapides.</p>
        </section>
        <section id="services" className="homepage-services">
          <h3>Services Disponibles</h3>
          <ul>
            <li>Ménage Régulier</li>
            <li>Coiffure à Domicile</li>
            <li>Garde d'Enfants</li>
            <li>Massage</li>
            {/* Ajouter plus de services ici */}
          </ul>
        </section>
        <section id="contact" className="homepage-contact">
          <h3>Contactez-nous</h3>
          <form className="contact-form">
            <label htmlFor="name">Nom:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit">Envoyer</button>
          </form>
        </section>
      </main>
      <footer className="homepage-footer">
        <section className="footer-about">
          <h4>À propos</h4>
          <ul>
            <li><a href="/">Plateforme responsable</a></li>
            <li><a href="/">Avis sur QuickHomeServices</a></li>
            <li><a href="/">Code promos</a></li>
            <li><a href="/">Le Mag' QuickHomeServices</a></li>
          </ul>
        </section>
        <section className="footer-pros">
          <h4>Pour les Pros</h4>
          <ul>
            <li><a href="/">Devenir Pro QuickHomeServices</a></li>
            <li><a href="/">Devenir aide ménagère</a></li>
            <li><a href="/">Devenir nounou</a></li>
            <li><a href="/">Devenir coiffeur</a></li>
            <li><a href="/">Devenir esthéticienne</a></li>
            <li><a href="/">Devenir masseur</a></li>
            <li><a href="/">Devenir coach sportif</a></li>
          </ul>
        </section>
        <section className="footer-contact">
          <h4>Contact</h4>
          <ul>
            <li><a href="/">Nous contacter</a></li>
            <li><a href="/">Nous rejoindre</a></li>
            <li><a href="/">On recrute !</a></li>
          </ul>
        </section>
        <section className="footer-help">
          <h4>Besoin d'aide ?</h4>
          <ul>
            <li><a href="/">FAQ / Centre d'aide</a></li>
            <li><a href="/">Démarrer un chat</a></li>
          </ul>
        </section>
        <p>&copy; 2024 QuickHomeServices. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default HomePage;
