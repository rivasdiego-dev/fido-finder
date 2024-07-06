import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import PetImage from '../../../components/atoms/PetImage';
import { useEffect, useState } from 'react';
import { getOneUser } from '../../../lib/services/users.service';
import { Button } from '@nextui-org/react';
import { IconEdit } from '@tabler/icons-react';
import { QRCodeSVG } from 'qrcode.react';

const Pet = () => {
  const { pet } = useLoaderData() as { pet: ApiPet };
  const [owner, setOwner] = useState<User>();

  const navigate = useNavigate();

  const handleOwnerData = async () => {
    const ownerResponse = await getOneUser(pet.owner_id);
    if (ownerResponse.isError) {
      navigate('/');
      return;
    }

    const tempOwner = ownerResponse.response.data as User;
    setOwner(tempOwner);
  };

  useEffect(() => {
    handleOwnerData();
  }, []);

  return owner ? (
    <div className="px-5 flex flex-col gap-4 overflow-y-scroll font-roboto-condensed">
      <div className="relative">
        {/* TODO: Check ownership */}
        <Link
          className="absolute top-0 right-0 z-50 m-2"
          to={`/pet/${pet.id}/edit`}
        >
          <Button variant="solid" color="primary" radius="sm" isIconOnly>
            <IconEdit />
          </Button>
        </Link>
        <PetImage
          alt="Pet"
          petName={pet.name}
          src={pet.img}
          description={`Mascota de ${owner!.name}`}
        />
      </div>
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
        <div className="p-2 bg-white rounded-xl">
          <QRCodeSVG
            value={pet.id}
            size={150}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'H'}
            includeMargin={false}
          />
        </div>
        <p className="">Código QR de {pet.name}</p>
      </div>
    </div>
  ) : (
    ''
  );
};

export default Pet;
