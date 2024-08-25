import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import SignUpPage from './pages/account/SignUpPage';
import LoginPage from './pages/account/LoginPage';
import ServicesPage from './pages/services/ServicesPage';
import CartPage from './pages/cart/CartPage';
// Autres imports de pages...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/services" element={<ServicesPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        {/* Autres routes... */}
      </Routes>
    </Router>
  );
}

export default App;
