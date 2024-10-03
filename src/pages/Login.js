import React from 'react';
import LoginForm from '../components/Auth/Login';
import Navbar from '../components/Layout/Navbar';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar arriba de todo */}
      <Navbar />

      {/* Contenido de la página de Login */}
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Bienvenido a la App de Citas</h1>
          <p className="text-gray-600 mb-8">Inicia sesión para encontrar tu pareja ideal.</p>
          {/* Componente del formulario de inicio de sesión */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;