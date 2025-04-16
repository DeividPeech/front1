'use client';

import Link from 'next/link';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { FeedbackOutlined, SearchOutlined } from '@mui/icons-material';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center p-6">
      {/* Logotipo */}
      <div className="w-full flex justify-center mb-6">
        <img
          src="https://satq.qroo.gob.mx/logos/LOGO-CONJUNTO-COMPACTO.png"
          alt="Logotipo Quintana Roo"
          className="h-16 md:h-20 object-contain"
        />
      </div>

      {/* Título principal */}
      <Typography
        variant="h3"
        className="text-center font-bold text-red-800 mb-4"
      >
        Portal de Atención Ciudadana
      </Typography>
      <Typography
        variant="subtitle1"
        className="text-center text-gray-700 mb-10 max-w-xl"
      >
        Bienvenido al sistema de quejas y sugerencias. Aquí puedes registrar una solicitud o dar seguimiento a una existente con tu folio.
      </Typography>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        <Card className="hover:shadow-lg transition duration-300 rounded-2xl">
          <CardContent className="flex flex-col items-center text-center">
            <FeedbackOutlined fontSize="large" className="text-red-800 mb-2" />
            <Typography variant="h6" className="font-semibold mb-2">
              Enviar Queja o Sugerencia
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-4">
              Registra una solicitud fácilmente para que sea atendida por el departamento correspondiente.
            </Typography>
            <Link href="/quejas">
              <Button variant="contained" color="primary">
                Ir al Formulario
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition duration-300 rounded-2xl">
          <CardContent className="flex flex-col items-center text-center">
            <SearchOutlined fontSize="large" className="text-red-800 mb-2" />
            <Typography variant="h6" className="font-semibold mb-2">
              Consultar Estado de Solicitud
            </Typography>
            <Typography variant="body2" className="text-gray-600 mb-4">
              Si ya enviaste una solicitud, consulta aquí el estado con tu folio de seguimiento.
            </Typography>
            <Link href="/seguimiento">
              <Button variant="contained" color="success">
                Ver Seguimiento
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}