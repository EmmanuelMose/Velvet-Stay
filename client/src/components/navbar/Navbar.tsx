import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/images/logo.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-blue-800 text-white">
      <nav className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        
        {/* Logo & Toggle Button */}
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
          {/* Centered navigation links */}
          <ul className="flex flex-col md:flex-row md:justify-center md:flex-1 gap-2 md:gap-6 text-sm text-center">
            <li className="hover:bg-green-600 px-4 py-1 rounded transition">
              <a href="/home">Home</a>
            </li>
            <li className="hover:bg-green-600 px-4 py-1 rounded transition">
              <a href="/services">Services</a>
            </li>
            <li className="hover:bg-green-600 px-4 py-1 rounded transition">
              <a href="/about">About</a>
            </li>
            <li className="hover:bg-green-600 px-4 py-1 rounded transition">
              <a href="/contact">Contact</a>
            </li>
          </ul>

          {/* Right-aligned auth buttons with equal size */}
          <ul className="flex flex-col md:flex-row gap-2 md:gap-3 mt-4 md:mt-0 md:ml-auto text-sm">
            <li>
              <a
                href="/login"
                className="bg-white text-blue-800 w-28 text-center px-4 py-1 rounded-full hover:bg-green-600 hover:text-white transition block"
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="bg-white text-blue-800 w-28 text-center px-4 py-1 rounded-full hover:bg-green-600 hover:text-white transition block"
              >
                Register
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
