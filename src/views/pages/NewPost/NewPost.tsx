import { Button, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import PetSelector from "../../../components/molecules/PetSelector";
import { getOwnedPets } from "../../../lib/services/pets.service";

export default function NewPost() {
    const [ownedPets, setOwnedPets] = useState<ApiPet[]>([]);
    const [loading, setLoading] = useState(true);
    const petState = useState<ApiPet | null>(null);
    const positionState = useState<GeolocationPosition | null>(null);

    useEffect(() => {
        getOwnedPets().then((response) => {
            if (!response.isError) {
                setOwnedPets(response.response.data);
            }
        }).finally(() => setLoading(false));
    }, []);

    return (
        <>
            <h1 className="font-quicksand text-3xl font-medium text-center">
                Crear publicación
            </h1>

            <div className="p-4">
                <Skeleton isLoaded={!loading} className="rounded-lg">
                    <div className="h-[290px] w-full grid place-items-center">
                        {!loading && <PetSelector state={petState} pets={ownedPets} />}
                    </div>
                </Skeleton>
            </div>

            <Button
                className="w-full mt-4"
                color="primary"
                onClick={() => navigator.geolocation.getCurrentPosition(
                    (position) => positionState[1](position),
                    (error) => console.error(error)
                )}
            >
                Ubicación actual
            </Button>

            <Button
                className="w-full mt-4"
                color="primary"
                onClick={() => {
                    console.log({ pet: petState[0], position: positionState[0] });
                }}
            >
                Continuar
            </Button>
        </>
    );
}
