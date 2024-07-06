import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className='flex flex-col min-h-dvh max-h-dvh bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#343940] to-[#0D0F12]'>
            <Outlet />
        </div>
    )
}
