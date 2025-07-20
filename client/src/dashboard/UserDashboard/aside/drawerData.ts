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
        id: "view",
        name: "View Rooms",
        icon: FaTasks,
        link: "todos"
    },
    {
        id: "book",
        name: "Book Room",
        icon: FaUserCheck,
        link: "book"
    },
    {
        id: "pay",
        name: "Pay For Room",
        icon: TbBrandGoogleAnalytics,
        link: "pay"
    },
    {
        id: "history",
        name: "Booking History",
        icon: TbBrandGoogleAnalytics,
        link: "history"
    }

]