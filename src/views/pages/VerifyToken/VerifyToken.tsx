import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { WhoAmI } from "../../../lib/services/auth.service";
import Loader from "../Loader";
import { useUserStore } from "../../../lib/store/user";

export default function VerifyToken() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const setUser = useUserStore(state => state.setUser);
    const token = searchParams.get('token');

    useEffect(() => {
        const fetchUser = async () => {
            const { response, isError } = await WhoAmI(token as string)
            if (!isError) {
                setUser(response.data);
                navigate('/');
            }
            else
                navigate('/login');
        }
        if (token)
            fetchUser();
    }, [token, navigate, setUser])

    return (
        <Loader />
    )
}
