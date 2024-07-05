import { Button, Tooltip } from '@nextui-org/react';

const UserDetails = () => {
  return (
    <div className="relative flex font-roboto-condensed flex-col justify-center items-center gap-4 w-full px-4 pb-4 mt-12 bg-b-base-foreground rounded-xl">
      <div className="absolute flex justify-center items-center p-1 bg-white rounded-full -translate-y-20">
        <img
          src="img/lost-dog.jpg"
          alt="User"
          className="h-[5rem] w-[5rem] rounded-full object-cover"
        />
      </div>
      <div className="h-14"></div>
      <div className="flex flex-col">
        <p className="font-quicksand font-bold text-xl text-b-base-text leading-none">
          AngelitoDe MiGuarda
        </p>
        <div className="flex gap-1 justify-center items-center">
          <img src="img/Map Pin.png" alt="location" className="w-4 h-4" />
          <p>San Salvador, Mejicanos</p>
        </div>
      </div>
      <div className="flex justify-evenly w-9/12">
        <Tooltip
          showArrow={true}
          placement="bottom"
          content={
            <div className="flex flex-col gap-2 px-1 py-2">
              <div className="text-small font-bold">justinMaiLov@yahoo.com</div>
              <div className="self-end">
                <Button color="primary" variant="flat" size="sm">
                  Contactar
                </Button>
              </div>
            </div>
          }
        >
          <Button
            isIconOnly
            className="bg-b-primary-800 border-none"
            variant="faded"
            aria-label="Take a photo"
          >
            <img src="img/Mail.png" alt="Mail" />
          </Button>
        </Tooltip>
        <Tooltip
          showArrow={true}
          placement="bottom"
          content={
            <div className="flex flex-col gap-2 px-1 py-2">
              <div className="text-small font-bold">4899-4548</div>
              <div className="self-end">
                <Button color="primary" variant="flat" size="sm">
                  Contactar
                </Button>
              </div>
            </div>
          }
        >
          <Button
            isIconOnly
            className="bg-b-primary-800 border-none"
            variant="faded"
            aria-label="Take a photo"
          >
            <img src="img/Phone.png" alt="Phone" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserDetails;
