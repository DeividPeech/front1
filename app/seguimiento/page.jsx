'use client';

import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import Nav from '@/components/Nav';

export default function SeguimientoPage() {
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleBuscar = async () => {
    if (!busqueda.trim()) {
      setMensaje('Por favor ingresa un folio.');
      return;
    }

    setLoading(true);
    setMensaje('');
    setResultado(null);

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/solicitudes/${busqueda}`);
      setResultado(res.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMensaje('No se encontró una solicitud con ese folio.');
      } else {
        setMensaje('Hubo un error al buscar la solicitud.');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fechaString) => {
    try {
      const fecha = new Date(fechaString);
      return fecha.toISOString().split('T')[0]; // yyyy-mm-dd
    } catch {
      return 'Fecha inválida';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="flex justify-center pt-10 px-4">
        <Card className="w-full max-w-2xl">
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Seguimiento de Solicitudes
            </Typography>

            <div className="flex gap-2 mb-4 items-start">
              <TextField
                label="Ingresa tu folio"
                variant="outlined"
                fullWidth
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                error={!!mensaje}
                helperText={mensaje}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleBuscar}
                className="h-full mt-[6px]"
              >
                Buscar
              </Button>
            </div>

            {loading && (
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <CircularProgress size={20} />
                <span>Buscando...</span>
              </div>
            )}

            {resultado && (
              <TableContainer component={Paper} className="mt-6">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Folio</TableCell>
                      <TableCell>Nombre del creador</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Departamento</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Fecha</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell>{resultado.folio}</TableCell>
                      <TableCell>{resultado.creador?.nombre || 'N/A'}</TableCell>
                      <TableCell>{resultado.tipo}</TableCell>
                      <TableCell>{resultado.departamento?.nombre || 'N/A'}</TableCell>
                      <TableCell>{resultado.estado}</TableCell>
                      <TableCell>{formatearFecha(resultado.created_at)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
