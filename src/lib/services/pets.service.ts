import { AxiosError } from "axios";
import axiosInstance from ".";

type NewPetBody = {
    name: string,
    color_id: number,
    breed_id: number,
    description: string,
    file: File
}

export async function CreatePet(pet: NewPetBody): Promise<AxiosCustomResponse> {
    try {
        const res = await axiosInstance.post("pets", pet)
        return { response: res, isError: false }
    } catch (error) {
        console.warn(error);
        if (error instanceof AxiosError)
            return { response: error.response, isError: true }
        return { response: error, isError: true }
    }
}