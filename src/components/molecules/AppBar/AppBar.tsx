import { IconMenu2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function AppBar() {
    return (
        <div className="flex justify-between p-4 items-center text-b-base-text">
            <Link className="flex items-center gap-2" to={'/'}>
                <img src="/img/logo.png" className="w-10 h-10 object-contain" />
                <p className="font-quicksand text-lg font-semibold"> FidoFinder </p>
            </Link>
            <div className="flex gap-4">
                <IconMenu2 size={28} />
            </div>
        </div>
    )
}
