import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomInput from '../../../components/molecules/CustomInput';
import { petFormSchema, typePetFormSchema } from '../../../lib/schemas/PetForm';
import InputImage from '../../../components/molecules/ImageInput/ImageInput';
import { Button } from '@nextui-org/react';

export default function AddPet() {

    const { register, handleSubmit, formState: { errors } } = useForm<typePetFormSchema>({
        resolver: zodResolver(petFormSchema),
    });

    const image = useState<File | null>(null);

    const onSubmit: SubmitHandler<typePetFormSchema> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='px-8'>
            <InputImage
                inputLabel='Podras ver a tu mascota aquí'
                fileState={image}
                className='mb-2'
            />
            <div className='flex flex-col gap-4 mb-8'>
                <CustomInput
                    id='name'
                    label="Nombre"
                    register={register}
                    errors={errors}
                />
                <CustomInput
                    id='type'
                    label="Tipo"
                    register={register}
                    errors={errors}
                />
                <CustomInput
                    id='breed'
                    label="Raza"
                    register={register}
                    errors={errors}
                />
                <CustomInput
                    id='color'
                    label="Color"
                    register={register}
                    errors={errors}
                />
            </div>

            <Button type='submit' color='primary' className='w-full text-lg font-medium' size='lg'>
                Guardar
            </Button>
        </form>
    );
}
