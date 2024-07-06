import { ParamParseKey, Params } from 'react-router-dom';
import { getAllBreeds } from '../../services/breeds.service';
import { getAllColors } from '../../services/colors.service';
import { getOnePet } from '../../services/pets.service';

const Paths = {
  petDetail: '/pet/:id/edit',
} as const;

type petArgs = {
  params: Params<ParamParseKey<typeof Paths.petDetail>>;
};

export default async function EditPetLoader({ params }: petArgs) {
  const { id } = params;
  if (!id) return undefined;

  const petResponse = await getOnePet(id);
  const colorsResponse = await getAllColors();
  const breedsResponse = await getAllBreeds();

  if (colorsResponse.isError || breedsResponse.isError || petResponse.isError)
    return { petInfo: {}, breeds: [], colors: [] };

  const petInfo = petResponse.response.data as ApiPet;
  const rawColors = colorsResponse.response.data as ApiColor[];
  const rawBreeds = breedsResponse.response.data as ApiBreed[];

  const colors = rawColors
    .sort((a, b) => a.color.localeCompare(b.color))
    .map((color) => ({ value: color.id, label: color.color }));
  const breeds = rawBreeds
    .sort((a, b) => a.breed.localeCompare(b.breed))
    .map((breed) => ({ value: breed.id, label: breed.breed }));

  return { petInfo, colors, breeds };
}
