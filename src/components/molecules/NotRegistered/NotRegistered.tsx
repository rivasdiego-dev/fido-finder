import React from 'react';
import { Button } from '@nextui-org/react';

const NotRegistered = () => {
  return (
    <div className="fixed w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.75)] flex justify-center items-center">
      {/* Card */}
      <div className="flex flex-col justify-center gap-4 w-11/12 p-4 bg-b-base-foreground rounded-xl">
        <div className="w-full flex justify-between">
          <img src="img/logo.png" alt="Fido Finder" className="w-16 h-16" />
          <p className="text-center font-quicksand font-bold text-2xl text-b-base-text">
            ¡Bienvenido a FidoFinder!
          </p>
        </div>
        <p>
          Completa la información de contacto en tu perfil para disfrutar de la
          experiencia completa.
        </p>
        <div className="flex justify-center gap-2 w-full">
          <Button color="primary" variant="flat">
            Completar luego
          </Button>
          <Button color="primary" variant="solid">
            Ir a perfil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotRegistered;
