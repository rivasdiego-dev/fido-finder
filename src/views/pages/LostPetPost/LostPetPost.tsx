import { useLoaderData } from 'react-router-dom'
import PetImage from '../../../components/atoms/PetImage';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getPostSeenReports } from '../../../lib/services/post.service';
import { parse, format } from '@formkit/tempo';


export default function LostPetPost() {

    const data = useLoaderData() as ApiPost | undefined;
    const [lastSeen, setLastSeen] = useState<string>(new Date().toISOString());

    useEffect(() => {
        if (!data) return
        const fetchLastSeen = async () => {
            const res = await getPostSeenReports(data.id);
            console.log(res);

            if (res.isError) {
                console.warn("Error fetching last seen");
                return;
            }

            if (res.response.data.length === 0) {
                setLastSeen(data.lost_datetime);
                return;
            }
            const lastReport = res.response.data[res.response.data.length - 1];
            setLastSeen(lastReport.date_seen);
        }
        fetchLastSeen();
    }, [data]);

    if (!data) {
        console.warn("No data found");
        return;
    }


    const pet = data.pets;
    // const user = data.users;

    return (
        <section className='flex-1 p-4 flex flex-col gap-3'>
            <PetImage
                src={pet.img}
                alt="Lost Pet"
                description={`${pet.breeds.breed} ${pet.colors.color}`}
                petName={pet.name}
            />

            <p className='font-roboto-condensed'> {data.details} </p>

            <div className='flex w-full items-center justify-between'>
                <div>
                    <p className='font-roboto font-medium text-lg'>Última vez visto</p>
                    <p className='text-sm font-roboto-condensed'>{format(parse(lastSeen), 'DD MMMM, de YYYY h:mm A', 'es')}</p>
                </div>
                <Button
                    color='secondary'
                    variant='bordered'
                >
                    Detalles
                </Button>
            </div>
        </section>
    )
}
