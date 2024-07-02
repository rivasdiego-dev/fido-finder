import { getAllBreeds } from "../../services/breeds.service";
import { getAllColors } from "../../services/colors.service";

export default async function AddPetLoader() {
    const colorsResponse = await getAllColors();
    const breedsResponse = await getAllBreeds();

    if (colorsResponse.isError || breedsResponse.isError) return { breeds: [], colors: [] }

    const rawColors = colorsResponse.response.data as ApiColor[];
    const rawBreeds = breedsResponse.response.data as ApiBreed[];

    const colors = rawColors.sort((a, b) => a.color.localeCompare(b.color)).map((color) => ({ value: color.id, label: color.color }));
    const breeds = rawBreeds.sort((a, b) => a.breed.localeCompare(b.breed)).map((breed) => ({ value: breed.id, label: breed.breed }));

    return { colors, breeds }
}