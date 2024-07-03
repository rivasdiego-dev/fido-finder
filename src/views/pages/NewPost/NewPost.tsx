import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import PetSelector from "../../../components/molecules/PetSelector"
import { Button } from "@nextui-org/react"

export default function NewPost() {

    const ownedPets = useLoaderData() as ApiPet[]
    const petState = useState<ApiPet | null>(null)

    const positionState = useState<GeolocationPosition | null>(null)


    return (
        <>
            <h1 className="font-quicksand text-3xl font-medium text-center">
                Crear publicación
            </h1>

            <PetSelector state={petState} pets={ownedPets} />

            <Button className="w-full mt-4" color="primary" onClick={
                () => navigator.geolocation.getCurrentPosition(
                    (position) => positionState[1](position),
                    (error) => console.error(error)
                )
            }>
                Ubicación actual
            </Button>

            <Button className="w-full mt-4" color="primary" onClick={() => {
                console.log({ pet: petState[0], position: positionState[0] })
            }}>
                Continuar
            </Button>


        </>
    )
}
