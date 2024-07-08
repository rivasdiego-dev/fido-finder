import { Button, Card } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyPosts } from '../../../lib/services/post.service';

export default function MyPosts() {
  const [data, setData] = useState<ApiPost[]>([]);

  useEffect(() => {
    getMyPosts().then((response) => {
      if (response.isError) {
        console.log(response.response);
        return;
      }
      setData(response.response.data);
    });
  }, []);

  return (
    <div>
      <div className="px-5 flex flex-col gap-4 overflow-y-scroll">
        <h1 className="font-quicksand text-3xl font-medium text-center mb-4 px-5">
          Mis publicaciones
        </h1>
        {data.map((post) => (
          <Card
            key={post.id}
            isFooterBlurred
            radius="lg"
            className="border-none"
          >
            <div className="relative w-auto min-h-[250px] max-h-[250px] h-[250px] flex justify-center items-center overflow-hidden rounded-t-lg">
              <img
                src={post.pets.img}
                alt={post.pets.name}
                className="object-cover w-full h-full"
              />
              <div className="flex flex-col justify-end absolute bottom-0 w-full bg-gradient-to-t h-full from-black to-transparent via-transparent p-2">
                <div className="flex justify-between">
                  <p className="font-quicksand font-bold text-3xl text-white">
                    {post.pets.name}
                  </p>
                  <Link to={`/post/${post.id}`}>
                    <Button
                      variant="flat"
                      color="primary"
                      className="font-poppins font-semibold bg-primary/40"
                    >
                      Ver detalles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <p className='p-2 font-roboto w-full text-center'> {post.is_lost ? 'Perdido' : 'Encontrado'}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
