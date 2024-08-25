import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import './ServicesPage.css'; // Assurez-vous d'ajouter le CSS approprié pour le style de la page

function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    duration: '',
    availableHours: [],
  });

  const services = [
    { id: 1, name: 'Ménage Régulier', description: 'Nettoyage complet de votre domicile.', price: '50€' },
    { id: 2, name: 'Ménage Occasionnel', description: 'Nettoyage ponctuel pour événements.', price: '70€' },
    // Ajoutez plus de services si nécessaire
  ];

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleHourChange = (e) => {
    const hour = e.target.value;
    setFormData((prevState) => {
      const updatedHours = prevState.availableHours.includes(hour)
        ? prevState.availableHours.filter(h => h !== hour)
        : [...prevState.availableHours, hour];
      return { ...prevState, availableHours: updatedHours };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour ajouter le service au panier ou envoyer les données
    console.log('Service ajouté:', selectedService, formData);
  };

  return (
    <div className="services-page">
      <NavBar />
      <main className="services-container">
        <h2>Nos Services de Ménage</h2>
        <div className="services-list">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>Prix: {service.price}</p>
            </div>
          ))}
        </div>
        <section className="booking-form">
          <h3>Réservez un Service</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Choisir un Service:
              <select value={selectedService} onChange={handleServiceChange}>
                <option value="">Sélectionnez un service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Date Souhaitée:
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </label>
            <label>
              Durée (en heures):
              <input type="number" name="duration" value={formData.duration} onChange={handleChange} min="1" required />
            </label>
            <label>
              Heures de Disponibilité:
              <div className="hours-checkboxes">
                {Array.from({ length: 24 }, (_, i) => (
                  <label key={i} className="hour-checkbox">
                    <input
                      type="checkbox"
                      value={i}
                      checked={formData.availableHours.includes(i.toString())}
                      onChange={handleHourChange}
                    />
                    {i < 10 ? `0${i}:00` : `${i}:00`}
                  </label>
                ))}
              </div>
            </label>
            <button type="submit">Ajouter au Panier</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default ServicesPage;
