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
        name: "Bookings",
        icon: FaUserCheck,
        link: "bookinghistory"
    },
    {
        id: "order",
        name: "Order Food",
        icon: FaUserCheck,
        link: "orderfood"
    },
    {
        id: "Support Ticket",
        name: "Support Ticket",
        icon: TbBrandGoogleAnalytics,
        link: "supportticket"
    },
    {
        id: "User Analytics",
        name: "Analytics",
        icon: FaUserCheck,
        link: "useranalytics"
    },
    {
        id: "Logout",
        name: "LogOut",
        icon: TbBrandGoogleAnalytics,
        link: "loggingout"
    }

]