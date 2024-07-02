import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomInput from '../../../components/molecules/CustomInput';
import { petFormSchema, typePetFormSchema } from '../../../lib/schemas/PetForm';
import InputImage from '../../../components/molecules/ImageInput/ImageInput';
import { Button } from '@nextui-org/react';
import CustomTextArea from '../../../components/molecules/CustomTextArea';
import { useLoaderData } from 'react-router-dom';
import CustomSelect from '../../../components/molecules/CustomSelect';

export default function AddPet() {

    const { breeds, colors } = useLoaderData() as { breeds: { value: string; label: string }[], colors: { value: string; label: string }[] };

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
