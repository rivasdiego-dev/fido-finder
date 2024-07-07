import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react';

type UserDetailsProps = {
  name: string;
  email: string;
  img: string | null;
  phone: string | null;
};

const UserDetails = (props: UserDetailsProps) => {
  const { name, email, phone, img } = props;

  return (
    <div className="relative flex font-roboto-condensed flex-col justify-center items-center gap-4 w-full px-4 pb-4 mt-12 bg-b-base-foreground rounded-xl">
      <div className="absolute flex justify-center items-center p-1 bg-white rounded-full -translate-y-20">
        <img
          src={img ? img : 'img/lost-dog.jpg'}
          alt="User"
          className="h-[5rem] w-[5rem] rounded-full object-cover"
        />
      </div>
      <div className="h-14"></div>
      <div className="flex flex-col">
        <p className="font-quicksand font-bold text-center text-xl text-b-base-text leading-none">
          {name}
        </p>
        <div className="flex gap-1 justify-center items-center">
          <img src="img/Map Pin.png" alt="location" className="w-4 h-4" />
          {/* TODO: Add residence */}
          <p>San Salvador, Mejicanos</p>
        </div>
      </div>
      <div className="flex justify-evenly w-9/12">
        <Popover placement="bottom" showArrow={true}>
          <PopoverTrigger>
            <Button
              isIconOnly
              className="bg-b-primary-800 border-none"
              variant="faded"
              aria-label="Take a photo"
            >
              <img src="img/Mail.png" alt="Mail" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 px-1 py-2">
              <div className="text-small font-bold">{email}</div>
              <div className="self-end">
                <Button color="primary" variant="flat" size="sm">
                  Contactar
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Popover placement="bottom" showArrow={true}>
          <PopoverTrigger>
            <Button
              isIconOnly
              className="bg-b-primary-800 border-none"
              variant="faded"
              aria-label="Take a photo"
            >
              <img src="img/Phone.png" alt="Phone" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 px-1 py-2">
              <div className="text-small font-bold">
                {phone ? phone : 'N/D'}
              </div>
              <div className="self-end">
                <Button color="primary" variant="flat" size="sm">
                  Contactar
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default UserDetails;
