import { Button } from '@nextui-org/react';
import PetImage from '../../atoms/PetImage';
import { IconMapPin } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../../lib/store/user';

type CardImageProps = {
  avatarUrl: string;
  userId: string;
  user: string;
  date: string;
  is_lost: boolean;
  location: string;
  petImg: string;
  petName: string;
  postId: string;
  petId: string;
};

const CardImage = (props: CardImageProps) => {
  const { avatarUrl, user, date, location, petImg, petName, postId, petId, userId, is_lost } = props;
  const userData = useUserStore((state) => state.user);


  return (
    <div className="w-full flex flex-col gap-1 font-roboto-condensed">
      {/* Label */}
      <Link to={`/profile/${userId}`} >
        <div className="flex gap-2">
          <img
            src={avatarUrl ? avatarUrl : 'img/user.png'}
            alt="User"
            className="w-10 h-10 object-cover rounded-full"
          />
          <div className="flex flex-col justify-evenly">
            <p className="text-base font-normal leading-none">{user}</p>
            <p className="text-sm font-normal leading-none">{date}</p>
          </div>
        </div>
      </Link>
      {/* Post */}
      <div className="flex flex-col justify-center items-center gap-4 w-full p-4 bg-b-base-foreground rounded-xl">
        <Link to={`/pet/${petId}`} className="w-full">
          <PetImage src={petImg} alt="Lost Pet" petName={petName} />
        </Link>
        <div className="flex w-full justify-between">
          <div className="flex flex-col justify-center gap-1">
            <p className="text-base leading-none font-semibold">Se perdió en</p>
            <p className="text-base leading-none">{location}</p>
          </div>
          <Link to={`/post/${postId}`}>
            <Button
              radius="sm"
              className="flex flex-col h-16 px-0  bg-white/5 text-b-secondary-300"
            >
              <IconMapPin size={28} />
              <p className="text-base leading-none">Ubicación</p>
            </Button>
          </Link>
        </div>
        <div className="flex justify-center gap-2 w-full">
          <Link to={`/post/${postId}`} className='w-full'>
            <Button
              color="primary"
              fullWidth
              size="lg"
              radius="sm"
              variant="flat"
            >
              Ver publicación
            </Button>
          </Link>
          {
            userData?.id !== userId && is_lost &&
            <Link to={`/post/${postId}/report`} className='w-full'>
              <Button
                color="primary"
                fullWidth
                size="lg"
                radius="sm"
                variant="solid"
              >
                Reportar
              </Button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default CardImage;
