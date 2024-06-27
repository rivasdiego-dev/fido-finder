import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AppLogo from "../../../components/atoms/AppLogo";

export default function Login() {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageLoad = () => setIsLoaded(true);


    return (
        <main className="relative flex flex-col items-center min-h-dvh overflow-hidden">
            <div className="relative w-[900px] h-[900px] flex items-center justify-center">
                <div className="absolute bottom-[50%] rounded-full w-[800px] h-[800px] overflow-hidden">
                    <motion.img
                        src="/img/lost-dog.jpg"
                        alt="Lost Dog"
                        className="object-cover w-full h-full transform -translate-x-10 translate-y-32"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoaded ? 1 : 0 }}
                        transition={{ duration: 2 }}
                        onLoad={handleImageLoad}
                    />
                </div>
                <div className="flex flex-col min-h-[48%] self-end">
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: isLoaded ? 0 : -50, opacity: isLoaded ? 1 : 0 }}
                        transition={{ duration: 1, delay: isLoaded ? 1 : 0 }}
                    >
                        <AppLogo includeSlogan />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoaded ? 1 : 0 }}
                        transition={{ duration: 1, delay: isLoaded ? 2 : 0 }}
                    >
                        <Link
                            to={`${import.meta.env.VITE_API_URL}/auth/google`}
                            className="w-full bg-[#EEEEEE] text-[#3C4043] py-2 rounded-full flex gap-2 items-center font-medium font-roboto justify-center shadow-md"
                        >
                            <img src="/img/google-icon.webp" alt="Google" className="w-7 h-7 drop-shadow-sm" />
                            <p className="translate-y-0.5">Continuar con Google</p>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
