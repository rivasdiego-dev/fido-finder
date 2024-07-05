import { ParamParseKey, Params } from 'react-router-dom';
import { getOnePet } from '../../services/pets.service';
import { getOneUser } from '../../services/users.service';

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

  const ownerResponse = await getOneUser(pet.owner_id);
  if (ownerResponse.isError) return undefined;
  const owner = ownerResponse.response.data as User;

  return { pet, owner };
};

export default PetLoader;
