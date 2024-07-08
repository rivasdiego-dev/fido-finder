import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { WhoAmI } from '../../../lib/services/auth.service';
import Loader from '../Loader';
import { useUserStore } from '../../../lib/store/user';

export default function VerifyToken() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const { response, isError } = await WhoAmI(token);
        if (!isError) {
          setUser(response.data);
          setToken(token);
          navigate('/');
        } else {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };

    fetchUser();
  }, [token, navigate, setUser, setToken]);

  return <Loader />;
}
