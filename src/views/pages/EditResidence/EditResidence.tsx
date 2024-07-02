import { Button, Input } from '@nextui-org/react';
import React from 'react';

type Props = {};

const EditResidence = (props: Props) => {
  return (
    <div className="px-5 flex flex-col justify-center gap-4 font-roboto-condensed">
      <p className="text-2xl text-center">Lugar de Residencia</p>
      <div className="bg-white h-[250px] rounded-xl">
        <p className="text-black text-center">MAPA</p>
      </div>
      <div className="flex gap-2">
        <Input
          type="latitude"
          label="Latitud"
          placeholder="Latitud"
          labelPlacement="outside"
        />
        <Input
          type="longitude"
          label="Longitud"
          placeholder="Longitud"
          labelPlacement="outside"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button color="primary" variant="solid">
          Utilizar ubicación actual
        </Button>
        <Button color="danger" variant="solid">
          Eliminar localización
        </Button>
        <p className="text-sm font-thin">
          Al eliminar tu ubicación, los registros de la misma no podran ser
          recuperados y no podremos enviarte contenido relevante cerca.
        </p>
      </div>
    </div>
  );
};

export default EditResidence;
