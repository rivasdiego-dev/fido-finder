import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import PetImage from '../../../components/atoms/PetImage';
import { getOneUser } from '../../../lib/services/users.service';
import { Button } from '@nextui-org/react';
import { useUserStore } from '../../../lib/store/user';

const Pet = () => {
  const { pet } = useLoaderData() as { pet: ApiPet };
  const user = useUserStore((state) => state.user);
  const [owner, setOwner] = useState<User>();
  const qrCodeRef = useRef<HTMLDivElement>(null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadQR = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector('canvas');
      if (canvas) {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = `${pet.name}-qr-code.png`;
        link.click();
      }
    }
  };

  return owner ? (
    <div className="px-5 flex flex-col gap-4 overflow-y-scroll font-roboto-condensed">
      <PetImage
        alt="Pet"
        petName={pet.name}
        src={pet.img}
        description={`Mascota de ${owner!.name}`}
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl font-roboto-condensed">{pet.name} es un</p>
          <p>{pet.breeds.breed}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl font-roboto-condensed">Color</p>
          <p>{pet.colors.color}</p>
        </div>
      </div>
      <p className="text-justify">{pet.description}</p>
      <div className="flex flex-col items-center justify-center">
        <div ref={qrCodeRef} className="p-5 bg-white rounded-2xl">
          <QRCodeCanvas
            value={pet.id}
            size={175}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'H'}
            includeMargin={false}
          />
        </div>
        <p className="font-roboto text-xl mt-3">Código QR de {pet.name}</p>
        {
          user?.id === pet.owner_id ? (
            <Button
              onClick={downloadQR}
              fullWidth
              radius='sm'
              className='mt-3 max-w-xs'
              variant='faded'
            >
              Descargar QR
            </Button>
          ) : null
        }
      </div>
    </div>
  ) : (
    ''
  );
};

export default Pet;
