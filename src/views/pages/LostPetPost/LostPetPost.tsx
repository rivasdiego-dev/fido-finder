import { format, parse } from '@formkit/tempo';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import PetImage from '../../../components/atoms/PetImage';
import MapComponent from '../../../components/molecules/MapComponent';
import { getPostSeenReports } from '../../../lib/services/post.service';
import extractCoordinates from '../../../lib/utils/extractCoordinates';

export default function LostPetPost() {
    const data = useLoaderData() as ApiPost | undefined;
    const [lastSeen, setLastSeen] = useState<string>(new Date().toISOString());
    const [loading, setLoading] = useState(true);
    const [lastReport, setLastReport] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

    useEffect(() => {
        if (!data) return;

        const fetchLastSeen = async () => {
            setLoading(true);
            const res = await getPostSeenReports(data.id);

            if (res.isError) {
                console.warn('Error fetching last seen');
                return;
            }

            if (res.response.data.length === 0) {
                setLastSeen(data.lost_datetime);
                const coordinates = extractCoordinates(data.lost_in);
                setLastReport(coordinates);
                setLoading(false);
                return;
            }

            const lastReport = res.response.data[res.response.data.length - 1];
            setLastSeen(lastReport.date_seen);
            const coordinates = extractCoordinates(lastReport.geom);
            setLastReport(coordinates);
            console.log(coordinates);
            setLoading(false);
        };

        fetchLastSeen();
    }, [data]);

    if (!data) {
        console.warn('No data found');
        return null;
    }

    const pet = data.pets;
    const lostLocation = extractCoordinates(data.lost_in);

    return (
        <section className='flex-1 p-4 flex flex-col gap-6'>
            <div className='space-y-2'>
                <PetImage
                    src={pet.img}
                    alt='Lost Pet'
                    description={`${pet.breeds.breed} ${pet.colors.color}`}
                    petName={pet.name}
                />
                <p className='font-roboto-condensed text-lg'>{data.details}</p>
            </div>

            {!loading && lastReport.lat !== 0 && lastReport.lng !== 0 && (

                <div className='space-y-2'>
                    <div className='flex w-full items-center justify-between'>
                        <div>
                            <p className='font-roboto font-medium text-2xl'>Última vez visto</p>
                            <p className='text-sm font-roboto-condensed'>
                                {format(parse(lastSeen), 'DD MMMM, YYYY - h:mm A', 'es')}
                            </p>
                        </div>
                        <Link to={`/post/${data.id}/seen-reports`}>
                            <Button color='secondary' variant='bordered'>
                                Detalles
                            </Button>
                        </Link>
                    </div>
                    <MapComponent
                        points={[
                            {
                                lat: lastReport.lat,
                                lng: lastReport.lng,
                                title: '',
                                description: ''
                            }
                        ]}
                    />
                    <div className='flex gap-2'>
                        <Button
                            size='lg'
                            color='primary'
                            variant='flat'
                        >
                            Reportar
                        </Button>

                        <Button
                            size='lg'
                            color='primary'
                            fullWidth
                        >
                            Contactar dueño
                        </Button>
                    </div>
                </div>
            )}

            <div >
                <p className='font-roboto font-medium text-2xl'> Lugar de extravío </p>
                <MapComponent
                    points={{
                        lat: lostLocation.lat,
                        lng: lostLocation.lng,
                        title: '',
                        description: ''
                    }}
                />
            </div>
        </section>
    );
}
