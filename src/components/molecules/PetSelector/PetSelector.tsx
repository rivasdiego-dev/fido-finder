import { IconCircleCheckFilled } from '@tabler/icons-react';
import React, { useState } from 'react';
import PetImage from '../../atoms/PetImage';

type PetSelectorProps = {
    state: [ApiPet | null, React.Dispatch<React.SetStateAction<ApiPet | null>>];
    pets: ApiPet[];
};

export default function PetSelector({
    state,
    pets
}: PetSelectorProps) {

    const [, setPet] = state;
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

    const handleSelectPet = (pet: ApiPet) => {
        setPet(pet);
        setSelectedPetId(pet.id);
    };

    return (
        <div className='flex gap-2 justify-evenly snap-x snap-mandatory overflow-x-auto mx-2'>
            {
                pets.map(pet => (
                    <div className={`relative min-w-[60%] transition-all snap-always snap-center rounded-2xl ${selectedPetId === pet.id ? 'border-8 border-b-base-foreground' : 'border-8 border-transparent'}`} onClick={() => handleSelectPet(pet)}>
                        {selectedPetId === pet.id && <IconCircleCheckFilled size={40} className='absolute top-0 right-0 z-10 text-b-primary-600' />}
                        <PetImage
                            src={pet.img}
                            alt={pet.name}
                            petName={pet.name}
                        />
                    </div>
                ))
            }
        </div>
    );
}
