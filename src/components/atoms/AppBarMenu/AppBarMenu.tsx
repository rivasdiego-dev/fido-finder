import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { IconChartBar, IconLogout, IconMenu2, IconUserCog } from "@tabler/icons-react";
import { useUserStore } from "../../../lib/store/user";
import { Link } from "react-router-dom";

export default function AppBarMenu() {

    const resetData = useUserStore((state) => state.resetData);

    const handleLogout = () => resetData();

    return (
        <Dropdown>
            <DropdownTrigger>
                <IconMenu2 size={28} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="stats">
                    <Link to="/stats">
                        <div className="flex gap-2 items-center align-middle">
                            <IconChartBar />
                            <p>Estadísticas</p>
                        </div>
                    </Link>
                </DropdownItem>
                <DropdownItem key="edit-profile">
                    <Link to="/profile/edit">
                        <div className="flex gap-2 items-center align-middle">
                            <IconUserCog />
                            <p>
                                Editar Perfil
                            </p>
                        </div>
                    </Link>
                </DropdownItem>
                <DropdownItem key="logout" onClick={handleLogout}>
                    <div className="flex gap-2 items-center align-middle">
                        <IconLogout />
                        <p>Cerrar Sesión</p>
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>

    )
}

