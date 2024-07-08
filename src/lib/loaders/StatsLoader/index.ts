import {
  getLostPetAmountsByCommunities,
  getLostPetAmountsByDepartments,
  getLostPetAmountsByMunicipalities,
} from '../../services/stats.service';

export default async function StatsLoader() {
  const response = await Promise.all([
    getLostPetAmountsByDepartments(),
    getLostPetAmountsByMunicipalities(),
    getLostPetAmountsByCommunities(),
  ]);

  return {
    departments: response[0].response.data,
    municipalities: response[1].response.data,
    communities: response[2].response.data,
  };
}
