import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CustomTextArea from "../../../components/molecules/CustomTextArea";
import MapComponent from "../../../components/molecules/MapComponent";
import PetSelector from "../../../components/molecules/PetSelector";
import { getOwnedPets } from "../../../lib/services/pets.service";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../lib/services/post.service";


const NewPostSchema = z.object({
    description: z.string().nonempty("No puedes dejar la descripción vacía!").min(10, "La descripción debe tener al menos 10 caracteres")
});

export default function NewPost() {
    const [ownedPets, setOwnedPets] = useState<ApiPet[]>([]);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const petState = useState<ApiPet | null>(null);
    const [position, setPosition] = useState<{ lat: number; lng: number; }>({ lat: 0, lng: 0, });
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof NewPostSchema>>({ resolver: zodResolver(NewPostSchema), });

    useEffect(() => {
        getOwnedPets().then((response) => {
            if (!response.isError) {
                setOwnedPets(response.response.data);
            }
        }).finally(() => setLoading(false));
    }, []);

    const onSubmit: SubmitHandler<z.infer<typeof NewPostSchema>> = async (data) => {
        if (posting) return;

        if (!petState[0]) {
            toast.error('Debes seleccionar una mascota', { id: 'post-creation' });
            return;
        }

        if (position.lat === 0 && position.lng === 0) {
            toast.error('Debes seleccionar una ubicación', { id: 'post-creation' });
            return;
        }

        const petId = petState[0].id;

        setPosting(true);
        toast.loading('Creando publicación...', { id: 'post-creation' });

        const res = await createPost({
            pet_id: petId,
            details: data.description,
            lost_in: {
                lat: position.lat,
                lon: position.lng
            }
        });

        if (res.isError) {
            setPosting(false);
            toast.error('Ocurrió un error al crear la publicación', { id: 'post-creation' });
            return;
        }

        setPosting(false);
        toast.success('Publicación creada con éxito', { id: 'post-creation' });
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='px-6 space-y-4'>
            <h1 className="font-quicksand text-3xl font-medium text-center mb-4">
                Crear publicación
            </h1>

            <div>
                <Skeleton isLoaded={!loading} className="rounded-lg">
                    <div className="h-[290px] w-full grid place-items-center">
                        <div className="flex flex-col">
                            <h2 className="font-roboto-condensed">¿Quién se ha perdido?</h2>
                            {!loading && <PetSelector state={petState} pets={ownedPets} />}
                        </div>
                    </div>
                </Skeleton>
            </div>


            <div>
                <h2 className="font-roboto-condensed mt-4">¿Dónde se perdió?</h2>
                <MapComponent points={position} />
                <p className="text-neutral-500 font-roboto font-semibold text-sm text-center">
                    Latitud: {position.lat}  Longitud: {position.lng}
                </p>
                <Button
                    className="w-full mt-2"
                    color="primary"
                    variant="flat"
                    onClick={() => navigator.geolocation.getCurrentPosition(
                        (position) => {
                            setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
                        },
                        (error) => alert(error.message)
                    )}
                >
                    Establecer ubicación actual
                </Button>
            </div>

            <CustomTextArea
                id="description"
                label="¿Cómo se ha perdido?"
                register={register}
                errors={errors}
            />

            <Button
                type="submit"
                size="lg"
                color="primary"
                fullWidth
            >
                Publicar
            </Button>

        </form>
    );
}
