import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import UserCard from '../components/Users/UserCard';

// Datos simulados de usuarios
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    interests: ['Música', 'Deportes', 'Cine'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    interests: ['Arte', 'Viajes', 'Lectura'],
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    interests: ['Tecnología', 'Fotografía', 'Cocina'],
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    interests: ['Yoga', 'Gastronomía', 'Naturaleza'],
  },
];

const UsersPage = () => {
  const [users] = useState(mockUsers);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Encuentra tu pareja Ideal</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;