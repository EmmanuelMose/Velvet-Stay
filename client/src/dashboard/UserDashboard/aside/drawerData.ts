import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";


export type DrawerData = {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number }>;
    link: string;
}

export const userDrawerData: DrawerData[] = [
    
    {
        id: "View",
        name: "View Hotels",
        icon: FaTasks,
        link: "viewhotels"
    },
    {
        id: "history",
        name: "Booking History",
        icon: FaUserCheck,
        link: "bookinghistory"
    },
    {
        id: "Support Ticket",
        name: "Support Ticket",
        icon: TbBrandGoogleAnalytics,
        link: "suportticket"
    },
    {
        id: "Logout",
        name: "LogOut",
        icon: TbBrandGoogleAnalytics,
        link: "loggingout"
    }

]