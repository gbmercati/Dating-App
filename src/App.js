import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import Profile from './pages/ProfilePage'; // Ejemplo de una página privada
import Home from './pages/Home'; // Otra página que puede ser la principal
import Register from './pages/Register';
import UsersPage from './pages/UsersPage';
import { useAuth } from './context/AuthContext'; // Contexto de autenticación, opcional
import './App.css';

const App = () => {
  // Supongamos que `useAuth` verifica si el usuario está autenticado
  const { isAuthenticated } = useAuth(); // Estado que verifica la autenticación del usuario

  return (
    <Router>
      <Routes>
        {/* Ruta por defecto que redirige a la página de Login */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Ruta de la página de Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Ruta de la página de Login */}
        <Route path="/register" element={<Register />} />

        {/* Ruta de la página de Login */}
        <Route path="/profile" element={<Profile />} />

        {/* Ruta de la página de Login */}
        <Route path="/home" element={<UsersPage />} />

        {/* Ejemplos de rutas privadas que solo deben ser accesibles si el usuario está autenticado 
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} 
        />

        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
};

export default App;
