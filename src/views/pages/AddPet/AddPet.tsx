import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomSelect from '../../../components/molecules/CustomSelect';
import CustomTextArea from '../../../components/molecules/CustomTextArea';
import InputImage from '../../../components/molecules/ImageInput/ImageInput';
import { petFormSchema, typePetFormSchema } from '../../../lib/schemas/PetForm';
import { toast } from 'sonner';
import { CreatePet } from '../../../lib/services/pets.service';

export default function AddPet() {

    const { breeds, colors } = useLoaderData() as { breeds: { value: string; label: string }[], colors: { value: string; label: string }[] };

    const image = useState<File | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<typePetFormSchema>({ resolver: zodResolver(petFormSchema), });

    const onSubmit: SubmitHandler<typePetFormSchema> = async (data) => {
        if (!image[0]) {
            toast.error('Debes seleccionar una imagen para tu mascota', { id: 'pet-creation' });
            return;
        }

        const formData = {
            name: data.name,
            description: data.description,
            breed_id: parseInt(data.breed),
            color_id: parseInt(data.color),
            file: image[0] as File,
        };

        toast.promise(CreatePet(formData), {
            loading: 'Creando mascota...',
            success: 'Mascota creada con éxito',
            error: 'Error al crear la mascota',
            id: 'pet-creation'
        },)

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='px-8'>
            <InputImage
                inputLabel='Podras ver a tu mascota aquí'
                fileState={image}
                className='mb-4'
            />
            <div className='flex flex-col gap-3 mb-8'>
                <CustomInput
                    id='name'
                    label="Nombre"
                    register={register}
                    errors={errors}
                />
                <CustomSelect
                    id='breed'
                    label="Raza"
                    options={breeds}
                    register={register}
                    errors={errors}
                />
                <CustomSelect
                    id='color'
                    label="Color"
                    options={colors}
                    register={register}
                    errors={errors}
                />
                <CustomTextArea
                    id='description'
                    label='Descripción'
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
