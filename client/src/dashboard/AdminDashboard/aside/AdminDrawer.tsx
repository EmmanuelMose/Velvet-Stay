import { Link } from "react-router-dom";
import { adminDrawerData } from "../../AdminDashboard/aside/drawerData";

const UserDrawer = () => {
    return (
        <div className="bg-gradient-to-b from-blue-800 via-blue-600 to-green-600 min-h-screen w-full mt-[10px] ml-[10px] rounded-lg">
            <h2 className="text-2xl font-bold text-white p-6 border-b border-white tracking-wide">
                Dashboard Menu
            </h2>

            <ul className="mt-4">
                {adminDrawerData.map((item) => (
                    <li key={item.id}>
                        <Link
                            to={item.link}
                            className="flex items-center space-x-4 p-4 mx-2 my-2 rounded-lg transition duration-300 ease-in-out 
                                       text-white hover:text-green-300 hover:bg-white/10 hover:border-l-4 hover:border-lightBlue-400"
                        >
                            <span className="text-lightBlue-300 group-hover:text-green-300 transition">
                                <item.icon size={26} />
                            </span>
                            <span className="text-lg font-medium group-hover:text-green-300 transition">
                                {item.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDrawer;
