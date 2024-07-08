import { ErrorResponse, Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const { status, statusText, ...error } = useRouteError() as ErrorResponse & { error: { message: string } };
    return (
        <div className="h-dvh flex flex-col items-center justify-center text-center text-b-primary-200 gap-8 p-4">
            <div>
                <img
                    src="/img/logo.png"
                    alt=""
                    className='w-32 sm:w-44 h-auto mx-auto'
                />
                <p className="text-7xl sm:text-9xl mb-4 bg-gradient-to-r font-bold text-transparent bg-clip-text from-b-primary-400 to-b-primary-800">
                    {status}
                </p>
                <p className="text-3xl font-quicksand font-bold tracking-[0.15em] sm:tracking-[0.3em]">
                    {statusText}
                </p>
            </div>
            <div>
                <p className="text-sm mb-4">
                    {error.error.message}
                </p>
                <Link to="/" className="bg-primary px-3 py-1.5 text-primary-foreground rounded shadow transition-all hover:shadow-md hover:bg-yellow-500 hover:text-white">
                    Volver al inicio
                </Link>
            </div>
        </div>
    )
}
