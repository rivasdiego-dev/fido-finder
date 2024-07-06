interface ApiPet {
    id: string,
    owner_id: string,
    name: string,
    color_id: number,
    breed_id: number,
    description: string,
    img: string,
    breeds: ApiBreed,
    colors: ApiColor
}