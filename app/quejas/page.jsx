// @/pages/registro-solicitud.js
'use client';

import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import Nav from '@/components/Nav';

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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/solicitudes`, {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="flex justify-center pt-10">
        <Card className="w-full max-w-2xl p-4">
          <CardContent>
            <Typography variant="h4" align="center" className="font-bold mb-16">
              Registrar Queja o Sugerencia
            </Typography>

            {mensajeExito && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-8">
                {mensajeExito}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <TextField
                    label="Nombre completo *"
                    variant="outlined"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    fullWidth
                    error={!!errores.nombre}
                    helperText={errores.nombre}
                  />
                </div>

                <div>
                  <TextField
                    label="Correo electrónico *"
                    variant="outlined"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    error={!!errores.email}
                    helperText={errores.email}
                  />
                </div>

                <div>
                  <TextField
                    label="Teléfono *"
                    variant="outlined"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                    error={!!errores.telefono}
                    helperText={errores.telefono}
                  />
                </div>

                <div>
                  <FormControl fullWidth error={!!errores.departamento_id}>
                    <InputLabel>Departamento *</InputLabel>
                    <Select
                      name="departamento_id"
                      value={form.departamento_id}
                      onChange={handleChange}
                      label="Departamento *"
                    >
                      <MenuItem value="1">Atención al cliente</MenuItem>
                      <MenuItem value="2">Recursos Humanos</MenuItem>
                      <MenuItem value="3">Finanzas</MenuItem>
                    </Select>
                    <FormHelperText>{errores.departamento_id}</FormHelperText>
                  </FormControl>
                </div>
              </div>

              <div>
                <FormControl fullWidth error={!!errores.tipo}>
                  <InputLabel>Tipo *</InputLabel>
                  <Select
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                    label="Tipo *"
                  >
                    <MenuItem value="queja">Queja</MenuItem>
                    <MenuItem value="sugerencia">Sugerencia</MenuItem>
                  </Select>
                  <FormHelperText>{errores.tipo}</FormHelperText>
                </FormControl>
              </div>

              <div>
                <TextField
                  label="Descripción *"
                  variant="outlined"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={5}
                  error={!!errores.descripcion}
                  helperText={errores.descripcion}
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
              >
                Enviar solicitud
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
