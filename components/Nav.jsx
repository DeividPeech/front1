'use client';

import React from 'react';
import { Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const Nav = () => {
  const pathname = usePathname();

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <nav className="w-full bg-white shadow-md p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
      <div className="flex justify-center md:justify-start">
        <Logo />
      </div>

      <div className="flex justify-center flex-wrap gap-2 md:gap-4">
        <Button
          variant={pathname === '/' ? 'contained' : 'text'}
          color="primary"
          onClick={() => handleNavigate('/')}
        >
          Inicio
        </Button>
        <Button
          variant={pathname === '/quejas' ? 'contained' : 'text'}
          color="primary"
          onClick={() => handleNavigate('/quejas')}
        >
          Quejas
        </Button>
        <Button
          variant={pathname === '/seguimiento' ? 'contained' : 'text'}
          color="primary"
          onClick={() => handleNavigate('/seguimiento')}
        >
          Seguimiento
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
