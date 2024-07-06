import { IconHome, IconMap, IconSearch, IconSquareRoundedPlus, IconUser } from "@tabler/icons-react";
import { BottomNavItemProps } from "../components/atoms/BottomNavItem/BottomNavItem";

export const bottomNavigation: Array<BottomNavItemProps> = [
  {
    icon: <IconSquareRoundedPlus size={28} strokeWidth={2} />,
    goTo: "/new-post",
  },
  {
    icon: <IconMap size={28} strokeWidth={2} />,
    goTo: "/pet-map",
  },
  {
    icon: <IconHome size={28} strokeWidth={2} />,
    goTo: "/",
  },
  {
    icon: <IconSearch size={28} strokeWidth={2} />,
    goTo: "/search",
  },
  {
    icon: <IconUser size={28} strokeWidth={2} />,
    goTo: "/profile",
  },
];