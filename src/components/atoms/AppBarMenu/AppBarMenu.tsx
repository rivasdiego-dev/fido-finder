import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { IconLogout, IconMenu2 } from "@tabler/icons-react";
import { useUserStore } from "../../../lib/store/user";

export default function AppBarMenu() {

    const resetData = useUserStore((state) => state.resetData);

    const handleLogout = () => resetData();

    return (
        <Dropdown>
            <DropdownTrigger>
                <IconMenu2 size={28} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
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

