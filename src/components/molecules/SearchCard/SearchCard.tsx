import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

type SearchCardProps = {
  postId: string;
  name: string;
  location: string;
  img: string;
  breed: string;
  color: string;
};

const SearchCard = (props: SearchCardProps) => {
  const { postId, name, location, breed, img, color } = props;
  return (
    <div className="flex p-2 rounded-xl gap-2 bg-b-base-foreground font-roboto-condensed">
      <div className="w-28 h-28">
        <img
          src={img ? img : 'img/lost-dog.jpg'}
          alt="Post"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col w-full justify-between">
        <div className="flex flex-col justify-center gap-1">
          <p className="text-b-primary-400 text-xl leading-none">{name}</p>
          <p className="text-sm">{location.toLowerCase()}</p>
          <div className="flex gap-1">
            <div className="bg-b-secondary-200 text-b-secondary-700 px-2 rounded-md">
              <p className="text-xs">{breed}</p>
            </div>
            <div className="bg-[#E6CABB] text-[#70462E] px-2 rounded-md">
              <p className="text-xs">{color}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2">
          <Link to={`/post/${postId}/report`} className="w-full">
            <Button color="primary" fullWidth radius="sm" variant="solid">
              Reportar
            </Button>
          </Link>
          <Link to={`/post/${postId}`} className="w-full">
            <Button color="primary" fullWidth radius="sm" variant="flat">
              Ver
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
