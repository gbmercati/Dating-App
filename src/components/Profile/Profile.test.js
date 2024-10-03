import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './ProfileComponent';

// Datos simulados
const mockUser = {
    name: 'John',
    lastname: 'Doe',
    age: '28',
    gender: 'Hombre',
    city: 'Lima',
    address: 'example@mail.com',
    interests: ['Música', 'Deportes', 'Cine'],
};

describe('Profile Component', () => {
  test('renders user information correctly', () => {
    render(<Profile user={mockUser} />);

    // Verificamos que la información del usuario se muestre
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Apellidos: Doe')).toBeInTheDocument();
    expect(screen.getByText('Edad: 28')).toBeInTheDocument();
    expect(screen.getByText('Género: Hombre')).toBeInTheDocument();
    expect(screen.getByText('Ciudad: Lima')).toBeInTheDocument();
    expect(screen.getByText('Email: example@mail.com')).toBeInTheDocument();
    expect(screen.getByText('Intereses: Música, Deportes, Cine')).toBeInTheDocument();
  });

  test('renders edit form when edit button is clicked', () => {
    render(<Profile user={mockUser} />);

    // Click en el botón de editar
    fireEvent.click(screen.getByText('Editar Perfil'));

    // Verificamos que se muestre el formulario de edición
    expect(screen.getByLabelText('Nombres')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellidos')).toBeInTheDocument();
    expect(screen.getByLabelText('Edad')).toBeInTheDocument();
    expect(screen.getByLabelText('Género')).toBeInTheDocument();
    expect(screen.getByLabelText('Ciudad')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  test('allows user to select and deselect interests', () => {
    render(<Profile user={mockUser} />);

    // Click en el botón de editar
    fireEvent.click(screen.getByText('Editar Perfil'));

    // Intereses disponibles
    const musicCheckbox = screen.getByLabelText('Música');
    const cineCheckbox = screen.getByLabelText('Arte');
    
    // Verificamos que el checkbox de Música está marcado y Cine no
    expect(musicCheckbox).toBeChecked();
    expect(cineCheckbox).not.toBeChecked();

    // Desmarcar Música y marcar Cine
    fireEvent.click(musicCheckbox); // Desmarcar Música
    fireEvent.click(cineCheckbox);  // Marcar Cine

    // Verificamos los cambios
    expect(musicCheckbox).not.toBeChecked();
    expect(cineCheckbox).toBeChecked();
  });
});