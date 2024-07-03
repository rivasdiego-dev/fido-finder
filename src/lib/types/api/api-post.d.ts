interface ApiPost {
    id: string;
    pet_id: string;
    author_id: string;
    is_lost: boolean;
    lost_datetime: string;
    details: string;
    users: User;
    pets: ApiPet;
    lost_in: string;
    found_in: string | null;
}