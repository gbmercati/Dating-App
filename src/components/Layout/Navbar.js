import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Dating-App
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="text-white hover:text-gray-200">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-white hover:text-gray-200">
              Perfil
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;