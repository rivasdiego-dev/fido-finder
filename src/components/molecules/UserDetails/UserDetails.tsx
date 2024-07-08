import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import { toast } from 'sonner';

type UserDetailsProps = {
  name: string;
  email: string;
  location?: string;
  img: string | null;
  phone: string | null;
};

const UserDetails = (props: UserDetailsProps) => {
  const { name, email, phone, img, location } = props;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    toast.success("Copiado al portapapeles!")
  };

  const handleCopyPhone = () => {
    if (phone) {
      navigator.clipboard.writeText(phone);
      toast.success("Copiado al portapapeles!")
    }
  };

  return (
    <div className="relative flex font-roboto-condensed flex-col justify-center items-center gap-4 w-full px-4 pb-4 mt-12 bg-b-base-foreground rounded-xl">
      <div className="absolute flex justify-center items-center p-1 bg-white rounded-full -translate-y-20">
        <img
          src={img ? img : 'img/owner.png'}
          alt="User"
          className="h-[5rem] w-[5rem] rounded-full object-cover"
        />
      </div>
      <div className="h-14"></div>
      <div className="flex flex-col">
        <p className="font-quicksand font-bold text-center text-xl text-b-base-text leading-none">
          {name}
        </p>
        {location && (
          <div className="flex gap-1 justify-center items-center">
            <IconMapPin size={14} />
            <p>{location}</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly w-9/12">
        <Popover placement="bottom" showArrow={true}>
          <PopoverTrigger>
            <Button
              isIconOnly
              className="bg-b-primary-800 border-none"
              variant="faded"
              aria-label="Copy email"
            >
              <IconMail />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 px-1 py-2">
              <div className="text-small font-bold">{email}</div>
              <div className="self-end">
                <Button color="primary" variant="flat" size="sm" onClick={handleCopyEmail}>
                  Copiar
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
              aria-label="Copy phone"
            >
              <IconPhone />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 px-1 py-2">
              <div className="text-small font-bold">
                {phone ? phone : 'N/D'}
              </div>
              <div className="self-end">
                {phone && (
                  <Button color="primary" variant="flat" size="sm" onClick={handleCopyPhone}>
                    Copiar
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default UserDetails;
