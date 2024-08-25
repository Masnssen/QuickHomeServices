import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import './CartPage.css'; // Assurez-vous d'ajouter le CSS approprié pour le style de la page

function CartPage() {
  // État pour stocker les services dans le panier
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Ménage Régulier',
      description: 'Nettoyage complet de votre domicile.',
      price: 50, // Prix en euros
      date: '2024-08-30',
      duration: 2,
      availableHours: ['09', '10', '11'], // Exemple d'heures sélectionnées
      selected: true,
    },
    // Ajoutez plus d'éléments de panier si nécessaire
  ]);

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const handleToggleSelection = (id) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => item.selected)
      .reduce((total, item) => total + item.price, 0);
  };

  const handlePayment = () => {
    alert('Fonctionnalité de paiement non implémentée');
  };

  return (
    <div className="cart-page">
      <NavBar />
      <main className="cart-container">
        <h2>Mon Panier</h2>
        {cartItems.length > 0 ? (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className={`cart-item ${item.selected ? 'selected' : ''}`}>
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => handleToggleSelection(item.id)}
                />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Prix: {item.price}€</p>
                <p>Date: {item.date}</p>
                <p>Durée: {item.duration} heures</p>
                <p>Heures Disponibles: {item.availableHours.join(', ')}</p>
                <button onClick={() => handleRemoveItem(item.id)}>Supprimer</button>
              </div>
            ))}
          </div>
        ) : (
          <p>Votre panier est vide.</p>
        )}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>Total: {calculateTotal()}€</h3>
            <button onClick={handlePayment}>Payer</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartPage;
