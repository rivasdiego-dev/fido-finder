
type AppLogoProps = {
    includeSlogan?: boolean;
}

export default function AppLogo({ includeSlogan = false }: AppLogoProps) {
    return (
        <div>
            <img src="/img/logo.png" alt="" className="h-32 w-32 mx-auto" />
            <h1 className="text-5xl font-semibold mb-2 text-center font-quicksand">FidoFinder</h1>
            {
                includeSlogan && <p className="text-center mb-16 font-roboto-condensed font-medium w-2/3 mx-auto">La ayuda que tu mascota necesita para regresar</p>
            }
        </div>
    )
}
