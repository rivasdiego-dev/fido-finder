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
        <p className="font-quicksand font-bold text-xl text-b-base-text">
          Mis publicaciones
        </p>
        {data.map((post) => (
          <Card
            key={post.id}
            isFooterBlurred
            radius="lg"
            className="border-none"
          >
            <div className="relative w-auto min-h-[250px] max-h-[250px] h-[250px] flex justify-center items-center overflow-hidden rounded-lg">
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
          </Card>
        ))}
      </div>
    </div>
  );
}
