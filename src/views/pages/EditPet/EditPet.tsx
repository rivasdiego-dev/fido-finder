import { Button, Input } from '@nextui-org/react';

const EditPet = () => {
  return (
    <div className="px-5 flex flex-col gap-4 overflow-y-scroll font-roboto-condensed">
      <img
        className="w-full h-[250px] object-cover rounded-lg"
        alt="Pet"
        src="img/lost-dog.jpg"
      />
      <input type="hidden" />
      <div className="flex justify-center">
        <Button color="primary" variant="bordered">
          Cambiar Foto
        </Button>
      </div>
      <Input
        type="animalName"
        label="Nombre"
        placeholder="Chobe"
        labelPlacement="outside"
      />
      <Input
        type="animalType"
        label="Tipo"
        placeholder="Perro"
        labelPlacement="outside"
      />
      <Input
        type="animalRace"
        label="Raza"
        placeholder="Gran Danés"
        labelPlacement="outside"
      />
      <Input
        type="animalColor"
        label="Color"
        placeholder="Café"
        labelPlacement="outside"
      />
      <div>
        <Button className="w-full" color="primary" variant="solid">
          Cambiar Foto
        </Button>
      </div>
    </div>
  );
};

export default EditPet;
