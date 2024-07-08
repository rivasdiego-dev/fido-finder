import { Link } from "react-router-dom";

export default function NotFound() {

    return (
        <div className="h-dvh flex flex-col items-center justify-center text-center text-b-primary-200 gap-8 p-4">
            <div>
                <p className="text-7xl sm:text-9xl mb-4 bg-gradient-to-r font-bold text-transparent bg-clip-text from-b-primary-400 to-b-primary-800">
                    404
                </p>
                <p className="text-3xl font-quicksand font-bold tracking-[0.15em] sm:tracking-[0.3em]">
                    Not Found
                </p>
            </div>
            <div>
                <p className="text-sm mb-4">
                    Parece que no encontramos lo que buscabas...
                </p>
                <Link to="/" className="bg-primary px-3 py-1.5 text-primary-foreground rounded shadow transition-all hover:shadow-md hover:bg-yellow-500 hover:text-white">
                    Volver al inicio
                </Link>
            </div>
        </div>
    )
}
