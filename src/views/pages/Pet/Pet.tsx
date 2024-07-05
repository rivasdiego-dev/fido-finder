import { useLoaderData } from 'react-router-dom';
import PetImage from '../../../components/atoms/PetImage';

const Pet = () => {
  const { pet, owner } = useLoaderData() as { pet: ApiPet; owner: User };

  return (
    <div className="px-5 flex flex-col gap-4 overflow-y-scroll font-roboto-condensed">
      <PetImage
        alt="Pet"
        petName={pet.name}
        src={pet.img}
        description={`Mascota de ${owner.email}`}
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl font-roboto-condensed">Chobe es un</p>
          <p>{pet.breeds.breed}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl font-roboto-condensed">Color</p>
          <p>{pet.colors.color}</p>
        </div>
      </div>
      <p className="text-justify">{pet.description}</p>
      <div className="flex flex-col items-center justify-center">
        <img src="img/qr.png" alt="qr" />
        <p className="">Código QR de {pet.name}</p>
      </div>
    </div>
  );
};

export default Pet;
