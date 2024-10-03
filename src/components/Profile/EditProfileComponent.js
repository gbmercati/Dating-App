import React, { useState } from 'react';
import axios from 'axios';

const EditProfileComponent = ({ user, onCancel, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    interests: user.interests || [],
  });

  const [interestsList, setInterestsList] = useState([]);

  const [error, setError] = useState('');

  useState(() => {
    const fetchInterests = async () => {
      try {
        const response = await axios.get('/api/interests');
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
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUpdate(response.data);
    } catch (err) {
      setError('Error al actualizar el perfil. Intenta de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
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
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default EditProfileComponent;