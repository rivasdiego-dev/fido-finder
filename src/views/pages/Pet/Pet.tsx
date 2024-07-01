import React from 'react';
import PetImage from '../../../components/atoms/PetImage';

type Props = {};

const Pet = (props: Props) => {
  return (
    <div className="px-5 flex flex-col gap-4 overflow-y-scroll font-roboto-condensed">
      <PetImage
        alt="Pet"
        petName="Fido"
        src="img/lost-dog.jpg"
        description="Mascota de DataHard911"
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl font-roboto-condensed">Chobe es un</p>
          <p>Gorila Espalda Plateada</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl font-roboto-condensed">Color</p>
          <p>Gris</p>
        </div>
      </div>
      <p className="text-justify">
        Mi gorila es grande y fuerte, con un pelaje negro brillante y ojos
        expresivos. Lleva una cicatriz distintiva en su pata derecha y tiene una
        mancha blanca en su pecho. Le encanta comer plátanos. Es amigable y
        curioso, pero puede asustarse fácilmente si escucha cumbias,
        especialmente Los Ángeles Azules.
      </p>
      <div className="flex flex-col items-center justify-center">
        <img src="img/qr.png" alt="qr" />
        <p className="">Código QR de Chobe</p>
      </div>
    </div>
  );
};

export default Pet;
