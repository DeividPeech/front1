'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function SeguimientoPage() {
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleBuscar = async () => {
    if (!busqueda.trim()) {
      alert('Por favor ingresa un folio.');
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

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white shadow rounded-2xl p-6 w-full max-w-3xl">
        {/* Logotipo */}
        <div className="w-full flex justify-center mb-6">
          <img
            src="https://satq.qroo.gob.mx/logos/LOGO-CONJUNTO-COMPACTO.png" // Cambia esta ruta al path correcto del logotipo
            alt="Logotipo Quintana Roo"
            className="h-16 md:h-20 object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold mb-4">Seguimiento de Solicitudes</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ingresa tu folio"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <button
            onClick={handleBuscar}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Buscar
          </button>
        </div>

        {loading && <p className="text-gray-600">Buscando...</p>}
        {mensaje && <p className="text-red-500">{mensaje}</p>}

        {resultado && (
          <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 border">Folio</th>
                  <th className="px-4 py-2 border">Nombre del creador</th>
                  <th className="px-4 py-2 border">Tipo</th>
                  <th className="px-4 py-2 border">Departamento</th>
                  <th className="px-4 py-2 border">Estado</th>
                  <th className="px-4 py-2 border">Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{resultado.folio}</td>
                  <td className="px-4 py-2 border">{resultado.creador.nombre}</td>
                  <td className="px-4 py-2 border">{resultado.tipo}</td>
                  <td className="px-4 py-2 border">{resultado.departamento.nombre}</td>
                  <td className="px-4 py-2 border">{resultado.estado}</td>
                  <td className="px-4 py-2 border">
                    {new Date(resultado.created_at).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}