import { useState } from 'react';
import CardImage from '../../../components/molecules/CardImage';
import NotRegistered from '../../../components/molecules/NotRegistered';

const Home = () => {
  const [isRegistered,] = useState<boolean>(true);

  return (
    <main className="relative">
      {isRegistered ? (
        <div className="px-5 flex flex-col gap-4 overflow-y-scroll">
          <CardImage
            avatarUrl="img/lost-dog.jpg"
            user="DecepticonTuPapa4683"
            date="28 mayo, 3:25 PM"
            location="Colonia Expeliarmus"
          />
        </div>
      ) : (
        <NotRegistered />
      )}
    </main>
  );
};

export default Home;
