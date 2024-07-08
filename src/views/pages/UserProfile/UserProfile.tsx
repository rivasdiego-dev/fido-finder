import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneUser } from '../../../lib/services/users.service';
import UserDetails from '../../../components/molecules/UserDetails';
import PetImage from '../../../components/atoms/PetImage';
import NotFound from '../NotFound';
import Loader from '../Loader';

export default function UserProfile() {

    const id = useParams().id as string;
    const navigate = useNavigate();
    const [user, setUser] = useState<ApiUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOneUser(id).then((response) => {
            if (response.isError) {
                setUser(null);
                return;
            }
            setUser(response.response.data);
        }).finally(() => {
            setLoading(false);
        });
    }, [id]);

    if (loading) return <Loader />
    if (!user && !loading || !user) return <NotFound />

    return (
        <div className='px-3'>
            <UserDetails
                name={`${user.name} ${user.lastname}`}
                email={user.email}
                phone={user.phone_number}
                img={user.img}
            />

            <div className="font-quicksand  w-full font-bold text-2xl mt-8 text-b-base-text leading-none text-center ">
                Mascotas
            </div>

            <div className='flex flex-col my-4 gap-6'>
                {
                    user.pets.map((pet) => {
                        const { id, name, img, breeds } = pet;
                        return (
                            <PetImage
                                key={id}
                                src={img}
                                alt={name}
                                petName={name}
                                description={breeds.breed}
                                bottomAction={() => { navigate(`/pet/${id}`) }}
                                bottomActionLabel='Perfil de mascota'
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
