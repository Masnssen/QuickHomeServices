import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import SignUpPage from './pages/account/SignUpPage';
import LoginPage from './pages/account/LoginPage';
import ServicesPage from './pages/services/ServicesPage';
import CartPage from './pages/cart/CartPage';
import UserDetailPage from './pages/admin/UserDetailPage';
import UsersListPage from './pages/admin/UsersListPage';
import CategoriesPage from './pages/admin/categorie/CategoriesPage'
import SubCategoriesPage from './pages/admin/categorie/SubCategoriesPage'
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
        
        <Route path="/admin_users" element={<UsersListPage/>} />
        <Route path="/admin/users/:userId" element={<UserDetailPage/>} />
        
        <Route path="/admin/categories" element={<CategoriesPage/>} />
        <Route path="/admin/categories/:categoryId/sous-categories" element={<SubCategoriesPage />} />
        {/* Autres routes... */}
      </Routes>
    </Router>
  );
}

export default App;
