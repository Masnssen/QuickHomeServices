import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Pour obtenir l'ID de la catégorie depuis l'URL
import NavBar from '../components/NavBar';
import { fetchCategoryDetails, fetchSubCategories, submitReservation } from './api'; // Assurez-vous que les chemins sont corrects
import './ServicesPage.css'; // Assurez-vous d'ajouter le CSS approprié pour le style de la page

function ServicesPage() {
  const { categoryId } = useParams(); // Récupère l'ID de la catégorie depuis l'URL
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    duration: '',
    availableHours: [],
  });

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        const categoryData = await fetchCategoryDetails(categoryId);
        setCategory(categoryData);

        const subCategoriesData = await fetchSubCategories(categoryId);
        setSubCategories(subCategoriesData);
      } catch (error) {
        console.error('Erreur lors du chargement des données de la catégorie:', error);
      }
    };

    loadCategoryData();
  }, [categoryId]);

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    console.log(subCategories)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getPrixById = (id) => {
      const service = subCategories.find(service => service.id === id);
      return service ? parseFloat(service.prix_unitaire) : null;
    };
    // Créez un tableau d'objets avec les heures disponibles
    const dateHeuresDisponibles = formData.availableHours.map(hour => `${formData.date}T${hour}:00:00`);
    console.log(dateHeuresDisponibles)
    // try {
    //   await submitReservation(
    //     categoryId, // ID de la catégorie depuis l'URL
    //     selectedService,
    //     getPrixById(selectedService), // Remplacez par le prix unitaire réel
    //     formData.duration,
    //     formData.duration * 50, // Calcul du prix total
    //     'client@example.com', // Remplacez par l'email du client
    //     'dans_panier',
    //     formData.date,
    //     dateHeuresDisponibles
    //   );
    // } catch (error) {
    //   console.error('Erreur lors de la soumission de la réservation:', error);
    // }
  };

  return (
    <div className="services-page">
      <NavBar />
      <main className="services-container">
        {category ? (
          <>
            <h2>{category.titre}</h2>
            <p>{category.description}</p>
            <div className="services-list">
              {subCategories.length > 0 ? (
                subCategories.map((subCategory) => (
                  <div key={subCategory.id} className="service-card">
                    <h3>{subCategory.titre}</h3>
                    <p>{subCategory.description}</p>
                    <p>Prix: {subCategory.prix_unitaire}€</p>
                  </div>
                ))
              ) : (
                <p>Aucune sous-catégorie disponible.</p>
              )}
            </div>
            <section className="booking-form">
              <h3>Réservez un Service</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  Choisir un Service:
                  <select value={selectedService || ""} onChange={handleServiceChange}>
                    <option value="">Sélectionnez un service</option>
                    {subCategories.map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.id}>
                        {subCategory.titre}
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
                          value={i < 10 ? `0${i}:00` : `${i}:00`}
                          checked={formData.availableHours.includes(i < 10 ? `0${i}:00` : `${i}:00`)}
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
          </>
        ) : (
          <p>Chargement des détails de la catégorie...</p>
        )}
      </main>
    </div>
  );
}

export default ServicesPage;
