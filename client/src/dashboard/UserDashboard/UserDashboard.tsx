import { useState } from "react";
import { Outlet } from "react-router-dom"; 
import Navbar from "../../components/navbar/Navbar";
import UserDrawer from "../../dashboard/UserDashboard/aside/UserDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Footer from "../../components/footer/Footer";

const UserDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 via-white to-green-100">
            {/* Top Navbar */}
            <Navbar />

            {/* Welcome Bar */}
            <div className="flex items-center justify-between px-4 py-4 bg-green-600 shadow-md">
                <button
                    className="text-white text-2xl lg:hidden"
                    onClick={handleDrawerToggle}
                >
                    {drawerOpen ? <IoCloseSharp /> : <FaBars />}
                </button>
                <span className="text-white text-lg font-bold tracking-wide">
                    Welcome to your User Dashboard
                </span>
            </div>

            {/* Main Section */}
            <div className="flex flex-1">
                {/* Sidebar Drawer */}
                <aside
                    className={`bg-gradient-to-b from-blue-800 to-green-700 text-white w-64 transition-transform duration-300 ease-in-out 
                        fixed top-0 left-0 z-40 min-h-screen lg:static lg:translate-x-0 ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    {/* Mobile Close Button */}
                    <div className="relative">
                        <button
                            className="absolute top-4 right-4 text-white text-2xl lg:hidden"
                            onClick={handleDrawerToggle}
                        >
                            <IoCloseSharp />
                        </button>
                    </div>
                    <UserDrawer />
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 bg-white rounded-tl-3xl shadow-inner overflow-y-auto">
                    <Outlet />
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default UserDashboard;
