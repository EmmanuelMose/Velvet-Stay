import facebook from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
// import instagram from '../../assets/images/instagram.png';
// import linkedin from '../../assets/images/linkedin.png';
// import watsup from '../../assets/images/whatsapp.png';
import telegram from '../../assets/images/telegram.png';
import youtube from '../../assets/images/youtube.png';

const Footer = () => {
  return (
    <div className="mb-[30px]">
      <footer className="mt-[50px] bg-blue-600 text-gray-100 p-10 rounded-lg font-bold">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-left">
          {/* SERVICES */}
          <div>
            <h6 className="text-lg mb-10 inline-block px-2 py-1 rounded transition duration-200 hover:bg-green-600 cursor-pointer">
              SERVICES
            </h6>
            <ul className="space-y-2">
              <li><a className="hover:underline" href="#">Branding</a></li>
              <li><a className="hover:underline" href="#">Design</a></li>
              <li><a className="hover:underline" href="#">Marketing</a></li>
              <li><a className="hover:underline" href="#">Advertisement</a></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h6 className="text-lg mb-4 inline-block px-2 py-1 rounded transition duration-200 hover:bg-green-600 cursor-pointer">
              COMPANY
            </h6>
            <ul className="space-y-2">
              <li><a className="hover:underline" href="#">About us</a></li>
              <li><a className="hover:underline" href="#">Contact</a></li>
              <li><a className="hover:underline" href="#">Jobs</a></li>
              <li><a className="hover:underline" href="#">Press kit</a></li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h6 className="text-lg mb-4 inline-block px-2 py-1 rounded transition duration-200 hover:bg-green-600 cursor-pointer">
              SOCIAL
            </h6>
            <div className="flex space-x-6 mt-2">
              <a href="#" aria-label="Twitter">
                <img
                  src={twitter}
                  alt="Twitter"
                  className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
                />
              </a>
              <a href="#" aria-label="YouTube">
                <img
                  src={youtube}
                  alt="YouTube"
                  className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
                />
              </a>
              <a href="#" aria-label="Facebook">
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
                />
              </a>
              <a href="#" aria-label="Telegram">
                <img
                  src={telegram}
                  alt="Telegram"
                  className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="text-center text-gray-700 font-bold mt-4">
        All rights reserved, © emmanuel guru 2025
      </div>
    </div>
  );
};

export default Footer;
