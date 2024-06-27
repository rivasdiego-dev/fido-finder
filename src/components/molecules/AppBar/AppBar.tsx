import { Link } from "react-router-dom";
import AppBarMenu from "../../atoms/AppBarMenu";

export default function AppBar() {
    return (
        <div className="flex justify-between p-4 items-center text-b-base-text">
            <Link className="flex items-center gap-2" to={'/'}>
                <img src="/img/logo.png" className="w-10 h-10 object-contain" />
                <p className="font-quicksand text-lg font-semibold"> FidoFinder </p>
            </Link>
            <div className="flex gap-4">
                <AppBarMenu />
            </div>
        </div>
    )
}
