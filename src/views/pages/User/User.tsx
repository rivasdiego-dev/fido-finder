import UserDetails from '../../../components/molecules/UserDetails';
import PetImage from '../../../components/atoms/PetImage';
import { IconPlus } from '@tabler/icons-react';
import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../../lib/store/user';
import { useEffect, useState } from 'react';
import { getOwnedPets } from '../../../lib/services/pets.service';

const User = () => {
  const user = useUserStore((state) => state.user);
  const [pets, setPets] = useState<ApiPet[]>([]);

  const handleInfo = async () => {
    const petsResponse = await getOwnedPets();

    if (petsResponse.isError) {
      setPets([]);
    } else {
      setPets(petsResponse.response.data);
    }

    setPets;
  };

  useEffect(() => {
    handleInfo();
  }, []);

  return (
    <main>
      <div className="px-5 flex flex-col gap-4 overflow-y-scroll">
        <UserDetails
          name={`${user!.name} ${user!.lastname}`}
          location={
            user!.locationInfo.community
              ? user!.locationInfo.community
              : user!.locationInfo.mun
          }
          email={user!.email}
          phone={user!.phone_number}
          img={user!.img}
        />
        <div className="font-quicksand flex items-center w-full justify-center gap-3 font-bold text-xl text-b-base-text leading-none text-center">
          <Link to="/post/own">
            <p> Mis publicaciones </p>
          </Link>
          <Link to="add-pet">
            <div className="flex items-center gap-2">
              <p> Mascotas </p>
              <Button size="sm" variant="light" isIconOnly>
                <IconPlus />
              </Button>
            </div>
          </Link>
        </div>
        {pets.map((pet) => {
          const { id, name, img } = pet;

          return (
            <Link to={`/pet/${id}`} key={id}>
              <PetImage alt="Pet" petName={name} src={img} />
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default User;
