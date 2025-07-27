import homeIMG from '../../assets/images/home.jpg';
import facebook from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';
// import instagram from '../../assets/images/instagram.png';
// import linkedin from '../../assets/images/linkedin.png';
// import watsup from '../../assets/images/whatsapp.png';
import telegram from '../../assets/images/telegram.png';
import youtube from '../../assets/images/youtube.png';

function Home() {
  return (
    <main className="mt-5">
      <section id="welcome" className="flex flex-col lg:flex-row justify-evenly gap-5 px-5">

        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl md:text-4xl text-center text-blue-800 font-bold py-5">
            Discover Trusted Hotel Booking & Management
          </h1>
          <p className="text-xl italic  text-center pb-5">
            Exceptional Stays, Seamless Reservations  At  One Place.
          </p>
          <p className="text-lg md:text-xl px-4 mb-4" color='black' hover:text-blue>
            Our platform connects you with top rated hotels and guesthouses, 
            offering easy booking, room management, and guest services. 
            Whether you’re planning a vacation or managing reservations, we make hospitality simple.
            <br />
            Enjoy convenience, comfort, and customer care —right at your fingertips.
          </p>

          <div className="flex justify-center items-center gap-5 my-5">
            <button className="px-5 py-2 bg-blue-700 hover:bg-green-700 hover:text-white rounded text-lg">
              Get Started
            </button>
            <button className="px-5 py-2 bg-blue-700 hover:bg-green-700 hover:text-white rounded text-lg">
              Learn More
            </button>
          </div>

          <div className="flex justify-center gap-3">
            <img
              src={facebook}
              alt="Facebook"
              className="w-10 h-10 bg-gray-300 p-2 hover:bg-green-600 rounded cursor-pointer"
            />
            <img
              src={youtube}
              alt="YouTube"
              className="w-10 h-10 bg-gray-300 p-2 hover:bg-green-600 rounded cursor-pointer"
            />
            <img
              src={telegram}
              alt="Telegram"
              className="w-10 h-10 bg-gray-300 p-2 hover:bg-green-600 rounded cursor-pointer"
            />
            <img
              src={twitter}
              alt="Twitter"
              className="w-10 h-10 bg-gray-300 p-2 hover:bg-green-600 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img src={homeIMG} alt="Hotel Hero" className="w-4/5" />
        </div>

      </section>
    </main>
  );
}

export default Home;
