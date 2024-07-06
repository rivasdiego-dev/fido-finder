import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { WhoAmI } from '../../../lib/services/auth.service';
import { useUserStore } from '../../../lib/store/user';
import Loader from '../../../views/pages/Loader';

const AuthGuard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const setToken = useUserStore((state) => state.setToken);
    const token = useUserStore((state) => state.token);

    useEffect(() => {
        const validateUser = async () => {

            if (!token || !user) {
                setIsLoading(false);
                setUser(undefined);
                setToken(undefined);
                navigate('/login');
                return;
            }

            try {
                const { response, isError } = await WhoAmI(token);
                if (!isError) {
                    setUser(response.data);
                    setToken(token);
                } else {
                    throw new Error('Token validation failed');
                }
            } catch (error) {
                console.error(error);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        validateUser();
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return <Outlet />;
};

export default AuthGuard;
