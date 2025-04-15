'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function RegistroSolicitudPage() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipo: 'queja',
    departamento_id: '',
    descripcion: '',
  });

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'telefono') {
      const soloNumeros = value.replace(/\D/g, '');
      if (soloNumeros.length <= 10) {
        setForm({ ...form, [name]: soloNumeros });
      }
    } else {
      setForm({ ...form, [name]: value });
    }

    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!form.email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.';
    } else if (!validarEmail(form.email)) {
      nuevosErrores.email = 'El correo electrónico no es válido.';
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es obligatorio.';
    } else if (!/^\d{10}$/.test(form.telefono)) {
      nuevosErrores.telefono = 'Debe contener exactamente 10 dígitos numéricos.';
    }

    if (!form.departamento_id) nuevosErrores.departamento_id = 'Debes seleccionar un departamento.';
    if (!form.descripcion.trim()) nuevosErrores.descripcion = 'La descripción es obligatoria.';

    return nuevosErrores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroresValidacion = validarCampos();

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.195:8000/api/solicitudes', {
        ...form,
      });

      if (response.status === 201) {
        setMensajeExito(`Tu solicitud ha sido registrada con éxito. Folio: ${response.data.folio}`);
        setForm({
          nombre: '',
          email: '',
          telefono: '',
          tipo: 'queja',
          departamento_id: '',
          descripcion: '',
        });
        setErrores({});
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const backendErrors = error.response.data.errors;
        setErrores(backendErrors);
      } else {
        alert('Ocurrió un error al enviar la solicitud.');
        console.error(error);
      }
    }
  };

  const inputStyle = (campo) =>
    `w-full border rounded px-3 py-2 ${errores[campo] ? 'border-red-500' : 'border-gray-300'}`;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Registrar Queja o Sugerencia</h1>

        {mensajeExito && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">{mensajeExito}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Nombre completo *</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className={inputStyle('nombre')}
              />
              {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
            </div>

            <div>
              <label className="block font-semibold">Correo electrónico *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputStyle('email')}
              />
              {errores.email && <p className="text-red-500 text-sm mt-1">{errores.email}</p>}
            </div>

            <div>
              <label className="block font-semibold">Teléfono *</label>
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className={inputStyle('telefono')}
                maxLength={10}
              />
              {errores.telefono && <p className="text-red-500 text-sm mt-1">{errores.telefono}</p>}
            </div>

            <div>
              <label className="block font-semibold">Departamento *</label>
              <select
                name="departamento_id"
                value={form.departamento_id}
                onChange={handleChange}
                className={inputStyle('departamento_id')}
              >
                <option value="">-- Selecciona --</option>
                <option value="1">Atención al cliente</option>
                <option value="2">Recursos Humanos</option>
                <option value="3">Finanzas</option>
              </select>
              {errores.departamento_id && (
                <p className="text-red-500 text-sm mt-1">{errores.departamento_id}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-semibold">Tipo *</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="queja">Queja</option>
              <option value="sugerencia">Sugerencia</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Descripción *</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={5}
              className={inputStyle('descripcion')}
            ></textarea>
            {errores.descripcion && (
              <p className="text-red-500 text-sm mt-1">{errores.descripcion}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
}
