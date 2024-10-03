import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    interests: [],
  });

  const [interestsList, setInterestsList] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Obtener la lista de intereses desde la API o usar una lista estática
    const fetchInterests = async () => {
      try {
        const response = await axios.get('/api/interests'); // Cambia la URL según sea necesario
        setInterestsList(response.data);
      } catch (err) {
        setError('Error al cargar los intereses.');
      }
    };

    fetchInterests();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        interests: checked
          ? [...prevState.interests, value]
          : prevState.interests.filter((interest) => interest !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        interests: formData.interests,
      });

      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          interests: [],
        });
      }
    } catch (err) {
      setError('Error al registrar el usuario. Intenta de nuevo.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Crear una Cuenta</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Registro exitoso. Puedes iniciar sesión ahora.</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Intereses</label>
          <div className="space-y-2">
            {interestsList.map((interest) => (
              <div key={interest.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`interest-${interest.id}`}
                  name="interests"
                  value={interest.name}
                  checked={formData.interests.includes(interest.name)}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor={`interest-${interest.id}`} className="text-gray-700">
                  {interest.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;