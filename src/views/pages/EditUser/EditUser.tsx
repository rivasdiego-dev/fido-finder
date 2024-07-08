import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Switch } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/atoms/ConfirmationDialog/ConfirmationDialog";
import CustomInput from "../../../components/molecules/CustomInput";
import { editUserSchema, typeEditUserSchema } from "../../../lib/schemas/EditUser";
import { useUserStore } from "../../../lib/store/user";
import { useLiveLocationStore } from "../../../lib/store/liveLocation";
import { toast } from "sonner";
import { updateUser } from "../../../lib/services/users.service";

const EditUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPhoneOpen, setIsModalPhoneOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const startTracking = useLiveLocationStore((state) => state.startTracking);
  const stopTracking = useLiveLocationStore((state) => state.stopTracking);
  const tracking = useLiveLocationStore((state) => state.tracking);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<typeEditUserSchema>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user?.name ?? '',
      lastname: user?.lastname ?? '',
      dob: user?.dob?.split('T')[0] ?? '',
      phone_number: user?.phone_number ?? '',
    }
  });

  const onSubmit = async (data: typeEditUserSchema) => {
    if (!data.phone_number) setIsModalPhoneOpen(true);

    toast.loading('Guardando cambios...', { id: 'edit-user' });
    const res = await updateUser(data);

    if (res.isError) {
      toast.error('Ocurrió un error al guardar los cambios', { id: 'edit-user' });
      return;
    }

    toast.success('Cambios guardados con éxito', { id: 'edit-user' });
  }

  const handleOpenModal = () => setIsModalOpen(true);


  const handleConfirm = () => {
    stopTracking();
    setIsModalOpen(false);
  };

  const handleToggleLiveLocation = () => {
    if (tracking) {
      handleOpenModal();
    } else {
      startTracking();
    }
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <main className="flex-1 px-4">
      <div className="relative flex flex-col justify-center items-center w-full mt-8">
        <div className="flex justify-center items-center p-1 bg-white/75 rounded-full ">
          <img
            src={user.img ? user.img : 'img/lost-dog.jpg'}
            alt="User"
            className="h-32 w-32 rounded-full object-cover"
          />
        </div>
        <p className="mt-3 text-xs w-full text-center text-neutral-500">
          Utilizamos la información de tu cuenta de Google para completar tu perfil. Si deseas cambiar tu foto de perfil, modifica tu cuenta de Google.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 my-4'>
        <CustomInput
          id='name'
          label="Nombre(s)"
          register={register}
          errors={errors}
        />
        <CustomInput
          id='lastname'
          label="Apellido(s)"
          register={register}
          errors={errors}
        />
        <CustomInput
          id='dob'
          label="Fecha de nacimiento"
          type="date"
          register={register}
          errors={errors}
        />
        <CustomInput
          id="phone_number"
          label="Teléfono"
          type="tel"
          register={register}
          errors={errors}
        />
        <Button type='submit' color='primary' className='w-full text-lg font-medium' size='lg'>
          Guardar cambios
        </Button>
      </form>

      <div className="flex justify-between w-full gap-20 items-center">
        <p className="text-lg font-roboto-condensed">
          Localización
        </p>
        <Link to="/profile/edit/residence" className="w-full">
          <Button variant="faded" fullWidth >
            Editar
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-2 my-4">
        <Switch isSelected={tracking} onValueChange={handleToggleLiveLocation} >
          <p className="text-lg font-roboto-condensed">
            Compartir mi ubicación en tiempo real
          </p>
        </Switch>

        <p className="text-sm text-primary-200">
          Compartir tu ubicación no es obligatorio, pero nos permite mostrarte contenido relevante cercano. Si no compartes tu ubicación, la app seguirá funcionando con normalidad.
        </p>
      </div>

      <ConfirmationModal
        modalTitle="Confirmar cambio de configuración"
        modalBody="¿Estás seguro de que deseas cambiar las preferencias de localización de tu cuenta?"
        isOpen={isModalOpen}
        onOpenChange={(open) => open ? handleOpenModal() : handleCancelModal()}
        onConfirm={handleConfirm}
      />

      <ConfirmationModal
        modalTitle="Parece que no has agregado un número de teléfono"
        modalBody="Agrega un número de teléfono para que los demás usuarios puedan contactarte más fácilmente y puedas disfrutar de todas las funcionalidades de la aplicación."
        isOpen={isModalPhoneOpen}
        onOpenChange={(open) => open ? setIsModalPhoneOpen(true) : setIsModalPhoneOpen(false)}
        onConfirm={() => setIsModalPhoneOpen(false)}
      />
    </main>
  );
};

export default EditUser;
