import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userRole = useSelector((state: RootState) => state.user.user?.role);
  const userToken = useSelector((state: RootState) => state.user.token);
  const isAdmin = userRole === 'admin';
  const isUser = userRole === 'user';

  return (
    <div className="bg-blue-800 text-white">
      <nav className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        
      
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="w-20">
            <img src={logo} alt="Logo" className="w-full" />
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navigation Items */}
        <div
          className={`w-full md:flex md:items-center md:justify-between mt-4 md:mt-0 ${
            menuOpen ? 'block' : 'hidden'
          }`}
        >
          {/* Navigation Links */}
          <ul className="flex flex-col md:flex-row md:justify-center md:flex-1 gap-2 md:gap-6 text-sm text-center">
            <li className="hover:bg-green-600 px-4 py-1 rounded transition">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="hover:bg-green-600 px-4 py-1 rounded transition">
              <NavLink to={
                isAdmin
                  ? "/admin/dashboard"
                  : isUser
                  ? "/user/dashboard"
                  : "/"
              }>
                Dashboard
              </NavLink>
            </li>
            <li className="hover:bg-green-600 px-4 py-1 rounded transition">
              <NavLink to="/services">Services</NavLink>
            </li>
            <li className="hover:bg-green-600 px-4 py-1 rounded transition">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="hover:bg-green-600 px-4 py-1 rounded transition">
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>

          {/* Auth Buttons */}
          {!userToken && (
            <ul className="flex flex-col md:flex-row gap-2 md:gap-3 mt-4 md:mt-0 md:ml-auto text-sm">
              <li>
                <NavLink
                  to="/login"
                  className="bg-white text-blue-800 w-28 text-center px-4 py-1 rounded-full hover:bg-green-600 hover:text-white transition block"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="bg-white text-blue-800 w-28 text-center px-4 py-1 rounded-full hover:bg-green-600 hover:text-white transition block"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
