'use client';

import Link from 'next/link';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { FeedbackOutlined, SearchOutlined } from '@mui/icons-material';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center">
      <div className="w-full flex justify-center p-6">
        <Logo />
      </div>

      <div className="flex flex-col items-center text-center px-4 mb-10">
        <Typography
          variant="h3"
          className="font-bold text-red-800 mb-4"
        >
          Portal de Atención Ciudadana
        </Typography>
        <Typography
          variant="subtitle1"
          className="text-gray-700 max-w-xl"
        >
          Bienvenido al sistema de quejas y sugerencias. Aquí puedes registrar una solicitud o dar seguimiento a una existente con tu folio.
        </Typography>
      </div>

      <div className="flex-grow flex items-center justify-center w-full px-6 pb-10">
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
    </div>
  );
}
