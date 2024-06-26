import { Link } from "react-router-dom";
import AppLogo from "../../../components/atoms/AppLogo";

export default function Login() {

    return (
        <main className="relative flex flex-col items-center min-h-dvh overflow-hidden">
            <div className="relative w-[900px] h-[900px] flex items-center justify-center">
                <div className="absolute bottom-[50%] rounded-full w-[800px] h-[800px] overflow-hidden">
                    <img
                        src="/img/lost-dog.jpg"
                        alt="Lost Dog"
                        className="object-cover w-full h-full transform -translate-x-10 translate-y-32"
                    />
                </div>
                <div className="flex flex-col min-h-[48%] self-end">
                    <AppLogo includeSlogan />

                    <Link
                        to={`${import.meta.env.VITE_API_URL}/auth/google`}
                        className="w-full bg-[#EEEEEE] text-[#3C4043] py-2 rounded-full flex gap-2 items-center font-medium font-roboto justify-center shadow-md"
                    >
                        <img src="/img/google-icon.webp" alt="Google" className="w-7 h-7 drop-shadow-sm" />
                        <p className="translate-y-0.5">Continuar con Google</p>
                    </Link>
                </div>
            </div>
        </main>
    );
}
