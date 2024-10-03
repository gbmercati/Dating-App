import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Email requerido'),
      password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña requerida'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/login', values);
        localStorage.setItem('token', response.data.token);
        navigate('/profile');
      } catch (error) {
        setErrorMessage('Credenciales incorrectas. Intenta de nuevo.');
      }
    },
  });

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar Sesión</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
              formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;