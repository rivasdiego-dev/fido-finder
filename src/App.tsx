import { RouterProvider } from 'react-router-dom';
import { router } from './configs/router';
import { useLiveLocationStore } from './lib/store/liveLocation';
import { useEffect } from 'react';
import { useUserStore } from './lib/store/user';
import { setUsersLocation } from './lib/services/users.service';

function App() {

  const tracking = useLiveLocationStore((state) => state.tracking);
  const user = useUserStore((state) => state.user);
  const setLiveLocation = useLiveLocationStore((state) => state.setLiveLocation);

  useEffect(() => {
    if (tracking && user) {
      const id = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setUsersLocation({ lat: latitude, lon: longitude, });
        });
      }, 5000);
      return () => clearInterval(id);
    }
  }, [user, tracking, setLiveLocation]);

  return <RouterProvider router={router} />;
}

export default App;
