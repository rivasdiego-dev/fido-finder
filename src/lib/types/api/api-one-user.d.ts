interface ApiUser {
    id: string;
    name: string;
    lastname: string;
    phone_number: string | null;
    img: string;
    email: string;
    dob: string | null;
    pets: ApiPet[];
}