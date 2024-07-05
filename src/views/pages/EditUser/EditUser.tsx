import { Button, DatePicker, Input } from '@nextui-org/react';
import { useState } from 'react';

const EditUser = () => {
  const [isLiveLocation, setIsLiveLocation] = useState<boolean>(false);

  return (
    <div className="px-5 flex flex-col gap-4 overflow-y-scroll font-roboto-condensed">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex justify-center items-center w-fit h-fit p-1 bg-white rounded-full">
          <img
            src="img/lost-dog.jpg"
            alt="User"
            className="h-[7rem] w-[7rem] rounded-full object-cover"
          />
        </div>
        <input type="file" className="hidden" />
        <Button color="primary" variant="bordered">
          Cambiar Avatar
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          type="userName"
          label="Nombres"
          placeholder="Nombres"
          labelPlacement="outside"
        />
        <Input
          type="userLastname"
          label="Apellidos"
          placeholder="Apellidos"
          labelPlacement="outside"
        />
        <DatePicker label="Fecha de nacimiento" labelPlacement="outside" />
        <Input
          type="userPhone"
          label="Número de Contacto"
          placeholder="0000-0000"
          labelPlacement="outside"
        />
        <div className="flex justify-between items-center">
          <p>Lugar de Residencia</p>
          <Button color="primary" variant="bordered">
            Ver
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p>Ubicación en Tiempo Real</p>
            <div
              onClick={() => setIsLiveLocation(!isLiveLocation)}
              className={`flex ${isLiveLocation
                  ? 'justify-end bg-green-400'
                  : 'justify-start bg-white'
                } items-center h-6 rounded-full w-12 border-[#dbdade] border-2 cursor-pointer`}
            >
              <div className="bg-[#dbdade] h-6 w-6 rounded-full transform transition-transform duration-300"></div>
            </div>
          </div>
          <p className="text-sm font-thin">
            Compartir tu ubicación no es obligatorio, pero nos permite mostrarte
            contenido relevante cercano. Si no compartes tu ubicación, la app
            seguirá funcionando con normalidad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
