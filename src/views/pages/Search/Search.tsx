import React, { useState } from 'react';
import SearchCard from '../../../components/molecules/SearchCard';
import { Link, useLoaderData } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import { IconQrcode } from '@tabler/icons-react';

const Search = () => {
  const allPosts = useLoaderData() as ApiPost[];
  const [search, setSearch] = useState<string>('');
  const [posts, setPosts] = useState<ApiPost[]>(allPosts);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const tempPosts = allPosts.filter((post) =>
        post.pets.name.toLowerCase().includes(search.toLowerCase())
      );

      if (search) {
        setPosts(tempPosts);
      } else {
        setPosts(allPosts);
      }
    }
  };

  return (
    <div className="px-5 flex flex-col gap-4 overflow-y-scroll">
      <div className="flex gap-2 items-end">
        <Input
          type="petName"
          size="md"
          label="Buscar"
          placeholder="Fido"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          className="text-xl"
          labelPlacement="outside"
          variant="faded"
        />
        <Link to={'/search/qr'}>
          <Button color="primary" isIconOnly radius="md" variant="solid">
            <IconQrcode />
          </Button>
        </Link>
      </div>

      {posts.map((post) => {
        const { id, pets, locationInfo } = post;

        return (
          <SearchCard
            key={id}
            name={pets.name}
            img={pets.img}
            location={
              locationInfo.community ? locationInfo.community : locationInfo.mun
            }
            breed={pets.breeds.breed}
            color={pets.colors.color}
            postId={id}
          />
        );
      })}
    </div>
  );
};

export default Search;
