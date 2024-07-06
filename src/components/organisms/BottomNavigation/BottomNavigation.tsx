import BottomNavItem from '../../atoms/BottomNavItem';
import { BottomNavItemProps } from '../../atoms/BottomNavItem/BottomNavItem';

type BottomNavigationProps = {
    nav: Array<BottomNavItemProps>
}

export default function BottomNavigation({ nav }: BottomNavigationProps) {
    return (
        <div className='py-3'>
            <ul className='flex justify-evenly text-sm max-w-3xl flex-wrap mx-auto'>
                {
                    nav.map((item, index) => (
                        <BottomNavItem
                            key={index}
                            {...item}
                        />
                    ))
                }
            </ul>
        </div>
    )
}
