import React, { useState } from 'react';

const UserCard = ({ user }) => {
  const [isMatched, setIsMatched] = useState(false);

  const handleMatch = () => {
    setIsMatched(true);
    // En una aplicación real, aquí se haría la llamada a la API para hacer match
  };

  // Usar imágenes predeterminadas aleatorias de Lorem Picsum
  const placeholderImages = [
    'https://picsum.photos/200/300?random=1',
    'https://picsum.photos/200/300?random=2',
    'https://picsum.photos/200/300?random=3',
    'https://picsum.photos/200/300?random=4',
    'https://picsum.photos/200/300?random=5',
  ];
  const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={randomImage}
        alt="Avatar"
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">Intereses: {user.interests.join(', ')}</p>
        <button
          onClick={handleMatch}
          disabled={isMatched}
          className={`mt-4 w-full py-2 rounded ${
            isMatched ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          } transition duration-200`}
        >
          {isMatched ? 'Matched' : 'Hacer Match'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;