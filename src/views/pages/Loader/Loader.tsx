import { Spinner } from "@nextui-org/react";
import AppLogo from "../../../components/atoms/AppLogo";

export default function Loader() {
    return (
        <div className="min-h-dvh grid place-items-center">
            <div className="flex flex-col">
                <AppLogo />
                <Spinner
                    size='lg'
                    className="mx-auto mt-6"
                    classNames={{
                        wrapper: "w-20 h-20",
                        circle1: "w-20 h-20 border-[0.4rem]",
                        circle2: "w-20 h-20 border-[0.4rem]"
                    }}
                />
            </div>
        </div>
    )
}
