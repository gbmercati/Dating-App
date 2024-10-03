import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Profile from '../components/Profile/ProfileComponent';

const ProfilePage = () => {
  // Datos simulados del perfil del usuario
  const mockUserProfile = {
    name: 'Julio',
    lastname: 'Guzman',
    age: '19',
    gender: 'Hombre',
    city: 'Lima',
    email: 'AmorEnLlamas@latinchat.',
    interests: ['Música', 'Deportes', 'Cine'],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Mi Perfil</h1>
        <Profile user={mockUserProfile} />
      </div>
    </div>
  );
};

export default ProfilePage;