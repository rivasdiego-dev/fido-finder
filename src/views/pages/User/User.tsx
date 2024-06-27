import React from 'react';
import UserDetails from '../../../components/molecules/UserDetails';
import PetImage from '../../../components/atoms/PetImage';

type Props = {};

const User = (props: Props) => {
  return (
    <main>
      <div className="px-5 flex flex-col gap-4 overflow-y-scroll">
        <UserDetails />
        <p className="font-quicksand font-bold text-xl text-b-base-text leading-none text-center">
          Mascotas
        </p>
        <PetImage alt="Pet" petName="Fido" src="img/lost-dog.jpg" />
        <PetImage alt="Pet" petName="Fido" src="img/lost-dog.jpg" />
        <PetImage alt="Pet" petName="Fido" src="img/lost-dog.jpg" />
        <PetImage alt="Pet" petName="Fido" src="img/lost-dog.jpg" />
      </div>
    </main>
  );
};

export default User;
