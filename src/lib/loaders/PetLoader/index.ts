import { ParamParseKey, Params } from 'react-router-dom';
import { getOnePet } from '../../services/pets.service';

const Paths = {
  petDetail: '/pet/:id',
} as const;

type petArgs = {
  params: Params<ParamParseKey<typeof Paths.petDetail>>;
};

const PetLoader = async ({ params }: petArgs) => {
  const { id } = params;
  if (!id) return undefined;

  const petResponse = await getOnePet(id);
  if (petResponse.isError) return undefined;
  const pet = petResponse.response.data as ApiPet;

  return { pet };
};

export default PetLoader;
