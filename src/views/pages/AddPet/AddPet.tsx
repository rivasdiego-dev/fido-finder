import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomSelect from '../../../components/molecules/CustomSelect';
import CustomTextArea from '../../../components/molecules/CustomTextArea';
import InputImage from '../../../components/molecules/ImageInput/ImageInput';
import { petFormSchema, typePetFormSchema } from '../../../lib/schemas/PetForm';
import { CreatePet } from '../../../lib/services/pets.service';

export default function AddPet() {
    const { breeds, colors } = useLoaderData() as { breeds: { value: string; label: string }[], colors: { value: string; label: string }[] };
    const navigate = useNavigate();

    const [image, setImage] = useState<File | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<typePetFormSchema>({ resolver: zodResolver(petFormSchema), });

    const onSubmit: SubmitHandler<typePetFormSchema> = async (data) => {
        if (!image) {
            toast.error('Debes seleccionar una imagen para tu mascota', { id: 'pet-creation' });
            return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('breed_id', data.breed);
        formData.append('color_id', data.color);
        formData.append('file', image);

        toast.loading('Creando mascota...', { id: 'pet-creation' });

        const res = await CreatePet(formData);

        if (res.isError) {
            toast.error('Ocurrió un error al crear tu mascota', { id: 'pet-creation' });
            return;
        }

        toast.success('Mascota creada con éxito', { id: 'pet-creation' });
        navigate('/profile');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='px-8'>
            <InputImage
                inputLabel='Podras ver a tu mascota aquí'
                fileState={[image, setImage]}
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
