
import {
    FaChartLine,
    FaBuilding,
    FaUsers,
    FaCalendarCheck,
    FaBed,
    FaCreditCard,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";



export type DrawerData = {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number }>;
    link: string;
    badge?: string;
    description?: string;
}

export const adminDrawerData: DrawerData[] = [

    
    {
        id: "hotels",
        name: "Hotels",
        icon: FaBuilding,
        description: "Manage hotel listings",
        link: "hotels"
    },
    {
        id: "rooms",
        name: "Rooms",
        icon: FaBed,
        link: "rooms",
        description: "Room Management"
    },
    {
        id: "bookings",
        name: "Bookings",
        icon: FaCalendarCheck,
        link: "bookings",
        description: "Reservation Management"
    },
    {
        id: "users",
        name: "Users",
        link: "users",
        icon: FaUsers,
        description: "Customer Management"
    },
    {
        id: "payments",
        name: "Payments",
        icon: FaCreditCard,
        link: "payments",
        description: "Financial Transactions"
    },
    {
        id: "analytics",
        name: "Analytics",
        icon: FaChartLine,
        link: "analytics",
        description: "Reports & Insights"
    },
    {
        id: "Customer Support",
        name: "Customer Support",
        icon: FaCog,
        link: "support",
        description: "System Configuration"
    },
    {
        id: "settings",
        name: "Settings",
        icon: FaCog,
        link: "settings",
        description: "System Configuration"
    },
    
    {
        id: "logout",
        name: "Logout",
        icon: FaSignOutAlt,
        link: "logout",
         description: "Sign Out"
    }


]