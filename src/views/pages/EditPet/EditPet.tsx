import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CustomInput from '../../../components/molecules/CustomInput';
import CustomSelect from '../../../components/molecules/CustomSelect';
import CustomTextArea from '../../../components/molecules/CustomTextArea';
import InputImage from '../../../components/molecules/ImageInput/ImageInput';
import { petFormSchema, typePetFormSchema } from '../../../lib/schemas/PetForm';
import { editPet } from '../../../lib/services/pets.service';
import { useUserStore } from '../../../lib/store/user';

export default function AddPet() {
  const { petInfo, breeds, colors } = useLoaderData() as {
    petInfo: ApiPet;
    breeds: { value: string; label: string }[];
    colors: { value: string; label: string }[];
  };
  const user = useUserStore((state) => state.user);

  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typePetFormSchema>({ resolver: zodResolver(petFormSchema) });

  const onSubmit: SubmitHandler<typePetFormSchema> = async (data) => {
    if (!image) {
      toast.error('Debes seleccionar una imagen para tu mascota', {
        id: 'pet-creation',
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('breed_id', data.breed);
    formData.append('color_id', data.color);
    formData.append('file', image);

    toast.loading('editando mascota...', { id: 'pet-creation' });

    const res = await editPet(petInfo.id, formData);

    if (res.isError) {
      toast.error('Ocurrió un error al editar tu mascota', {
        id: 'pet-creation',
      });
      return;
    }

    toast.success('Mascota editada con éxito', { id: 'pet-creation' });
    navigate('/profile');
  };

  useEffect(() => {
    if (user?.id !== petInfo.owner_id) {
      navigate('/');
    } else {
      setIsOwner(true);
    }
  }, []);

  return (
    isOwner ?? (
      <form onSubmit={handleSubmit(onSubmit)} className="px-8">
        {/* TODO: Show pet image */}
        <InputImage
          inputLabel="Podras ver a tu mascota aquí"
          fileState={[image, setImage]}
          fileUrl={petInfo.img}
          className="mb-4"
        />
        <div className="flex flex-col gap-3 mb-8">
          <CustomInput
            id="name"
            label="Nombre"
            value={petInfo.name}
            register={register}
            errors={errors}
          />
          <CustomSelect
            id="breed"
            label="Raza"
            options={breeds}
            register={register}
            value={petInfo.breed_id}
            errors={errors}
          />
          <CustomSelect
            id="color"
            label="Color"
            options={colors}
            register={register}
            value={petInfo.color_id}
            errors={errors}
          />
          <CustomTextArea
            id="description"
            label="Descripción"
            value={petInfo.description}
            register={register}
            errors={errors}
          />
        </div>

        <Button
          type="submit"
          color="primary"
          className="w-full text-lg font-medium"
          size="lg"
        >
          Guardar
        </Button>
      </form>
    )
  );
}
