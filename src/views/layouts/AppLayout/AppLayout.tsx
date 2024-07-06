import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { bottomNavigation } from '../../../configs/navigation'
import BottomNavigation from '../../../components/organisms/BottomNavigation'
import AppBar from '../../../components/molecules/AppBar'

export default function AppLayout() {
    return (
        <div className='flex flex-col min-h-dvh max-h-dvh bg-gradient-to-b from-10% from-[#222831] to-90% to-[#13161B] '>
            <Toaster richColors theme='dark' />
            <AppBar />
            <div className='flex flex-col flex-1 overflow-y-auto'>
                <Outlet />
            </div>
            <BottomNavigation nav={bottomNavigation} />
        </div>
    )
}
