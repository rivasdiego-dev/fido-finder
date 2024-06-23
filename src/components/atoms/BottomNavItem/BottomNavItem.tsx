import React from 'react';
import { Link, useMatch } from 'react-router-dom';

type CustomIcons = {
    active: React.ReactNode;
    inactive: React.ReactNode;
};

export type BottomNavItemProps = {
    label?: string;
    icon: React.ReactNode | CustomIcons;
    goTo: string;
};

export default function BottomNavItem({
    label,
    icon,
    goTo,
}: BottomNavItemProps) {

    const active = useMatch(goTo);

    const renderIcon = () => {
        if (typeof icon === 'object' && icon !== null && 'active' in icon && 'inactive' in icon) {
            return active ? (icon as CustomIcons).active : (icon as CustomIcons).inactive;
        }
        return icon;
    };

    return (
        <Link to={goTo}>
            <li className={`flex flex-col text-white items-center cursor-pointer transition-all duration-300 p-2 rounded-full ${active ?
                'bg-b-primary-700'
                :
                ''}`
            }>
                <span>
                    {renderIcon()}
                </span>
                {
                    label && <span className='font-semibold'> {label} </span>
                }

            </li>
        </Link >
    );
}
