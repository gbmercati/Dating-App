import React, { useState, useEffect } from 'react';
import axios from 'axios';

const availableInterests = ['Música', 'Deportes', 'Cine', 'Arte', 'Viajes', 'Tecnología', 'Lectura', 'Cocina'];

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);
  const [apiUserData, setApiUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        axios.defaults.proxy = false;
        const response = await axios.get('http://127.0.0.1:5038/User/4', {
          headers: {
            "Content-Type": `Bearer ${token}`
          }
        });
        setApiUserData(response.data);
      } catch (err) {
        setError('No se pudo cargar la información del perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Función para manejar los cambios en el checkbox de intereses
  const handleInterestChange = (interest) => {
    if (userData.interests.includes(interest)) {
      // Si el interés ya está seleccionado, lo eliminamos
      setUserData({
        ...userData,
        interests: userData.interests.filter((i) => i !== interest),
      });
    } else {
      // Si no está seleccionado, lo añadimos
      setUserData({
        ...userData,
        interests: [...userData.interests, interest],
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se enviaría la información actualizada a la API
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor='firstname'>Nombres</label>
            <input
              id="firstname"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor='lastname'>Apellidos</label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              value={userData.lastname}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor='age'>Edad</label>
            <input
              id="age"
              type="text"
              name="age"
              value={userData.age}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor='gender'>Género</label>
            <select
              id='gender'
              value={userData.gender}
              onChange={handleChange}
              className="block w-full p-2 border"
            >
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor='city'>Ciudad</label>
            <input
              id='city'
              type="text"
              name="city"
              value={userData.city}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor='address'>Email</label>
            <input
              id='address'
              type="text"
              name="address"
              value={userData.email}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Intereses</label>
            <div className="grid grid-cols-2 gap-2">
              {availableInterests.map((interest) => (
                <label key={interest} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={userData.interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                    className="form-checkbox"
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Guardar
          </button>
        </form>
      ) : (
        <div>
          <img
            src="https://picsum.photos/200/300?random=6"
            alt="Avatar"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
          <p className="text-gray-600">Apellidos: {userData.lastname}</p>
          <p className="text-gray-600">Edad: {userData.age}</p>
          <p className="text-gray-600">Género: {userData.gender}</p>
          <p className="text-gray-600">Ciudad: {userData.city}</p>
          <p className="text-gray-600">Email: {userData.address}</p>
          <p className="text-gray-600">Intereses: {userData.interests.join(', ')}</p>
          <button
            onClick={handleEditClick}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Editar Perfil
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;