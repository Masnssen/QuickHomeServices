import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UsersListPage.css'; // Assurez-vous que le CSS est correctement lié
import { fetchUsers } from './api'; // Assurez-vous que le chemin est correct

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Charger les utilisateurs depuis le serveur
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data.users); // Assurez-vous que la réponse contient les données dans `response.data`
      } catch (error) {
        setMessage('Erreur lors du chargement des utilisateurs.');
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="user-list-page">
      <h1>Liste des Utilisateurs</h1>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>{user.email}</td>
              <td>{user.type}</td>
              <td>{user.status}</td>
              <td>
                <Link to={`/admin/users/${user.id}`} className="view-link">
                  Voir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserListPage;
