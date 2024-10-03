import React from 'react';
import Navbar from '../components/Layout/Navbar';
import RegisterComponent from '../components/Auth/Register';

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Registro</h1>
        <RegisterComponent />
      </div>
    </div>
  );
};

export default Register;