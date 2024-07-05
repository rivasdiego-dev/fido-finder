import { useState } from 'react';
import CardImage from '../../../components/molecules/CardImage';
import NotRegistered from '../../../components/molecules/NotRegistered';
import { useLoaderData } from 'react-router-dom';
import formatDateTime from '../../../lib/utils/formatDateTime';

const Home = () => {
  const { posts } = useLoaderData() as { posts: ApiPost[] };
  const [isRegistered] = useState<boolean>(true);

  return (
    <main className="relative">
      {isRegistered ? (
        <div className="px-5 flex flex-col gap-4 overflow-y-scroll">
          {/* TODO: Change default image */}
          {posts.map((post) => {
            const { id, users, pets, locationInfo, lost_datetime } = post;

            const finalImg = users.img ? users.img : 'img/lost-dog.jpg';
            const finalLocation = locationInfo.community
              ? locationInfo.community
              : locationInfo.mun;
            const finalDate = formatDateTime(lost_datetime);

            return (
              <CardImage
                key={id}
                avatarUrl={finalImg}
                user={users.email}
                date={finalDate}
                location={finalLocation}
                petImg={pets.img}
                petName={pets.name}
                postId={id}
              />
            );
          })}
        </div>
      ) : (
        <NotRegistered />
      )}
    </main>
  );
};

export default Home;
