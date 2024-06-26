import React from 'react';
import ActionButton from '../../atoms/ActionButton';
import PetImage from '../../atoms/PetImage';
import { Button } from '@nextui-org/react';

type CardImageProps = {
  avatarUrl: string;
  user: string;
  date: string;
  location: string;
};

const CardImage = (props: CardImageProps) => {
  const { avatarUrl, user, date, location } = props;
  return (
    <div className="w-full flex flex-col gap-1 font-roboto-condensed">
      {/* Label */}
      <div className="flex gap-2">
        <img
          src={avatarUrl}
          alt="User"
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="flex flex-col justify-evenly">
          <p className="text-base font-normal leading-none">{user}</p>
          <p className="text-sm font-normal leading-none">{date}</p>
        </div>
      </div>
      {/* Post */}
      <div className="flex flex-col justify-center items-center gap-4 w-full p-4 bg-b-base-foreground rounded-xl">
        <PetImage src="img/lost-dog.jpg" alt="Lost Pet" petName="Fido" />
        <div className="flex w-full justify-between">
          <div className="flex flex-col justify-center gap-1">
            <p className="text-base leading-none font-semibold">Se perdió en</p>
            <p className="text-base leading-none">{location}</p>
          </div>
          <button className="flex flex-col justify-center items-center rounded-xl gap-1 w-16 h-16 bg-[#3c4049]">
            <img
              src="img/Map Pin.png"
              alt="Ubicacion"
              className="w-7 h-7 object-contain"
            />
            <p className="text-sm font-light leading-none text-b-secondary-300">
              Ubicación
            </p>
          </button>
        </div>
        <div className="flex justify-center gap-2 w-full">
          <Button color="primary" variant="flat">
            Ver publicación
          </Button>
          <Button color="primary" variant="solid">
            Reportar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardImage;
