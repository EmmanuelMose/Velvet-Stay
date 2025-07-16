import React from 'react';

const About: React.FC = () => {
  return (
    <main className="min-h-screen px-4 py-6 bg-gray-100 text-gray-800">
      <section className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Frame 1: About */}
        <div className="bg-blue-300 hover:bg-green-400 transition-all duration-300 p-4 rounded-lg shadow-sm border border-gray-200 h-64 flex flex-col justify-center items-center relative z-0 hover:z-10 hover:scale-105">
          <h1 className="text-xl font-bold text-blue-700 mb-2 text-center">
            About Velvet Stay
          </h1>
          <p className="text-sm text-gray-700 text-center px-2">
            Your ultimate platform to manage hotel rooms, guests, bookings, and services efficiently and effortlessly.
          </p>
        </div>

        {/* Frame 2: Our Mission */}
        <div className="bg-blue-300 hover:bg-green-400 transition-all duration-300 p-4 rounded-lg shadow-sm border border-gray-200 h-64 flex flex-col justify-center relative z-0 hover:z-10 hover:scale-105">
          <h2 className="text-xl font-semibold text-blue-600 mb-2 text-center">Our Mission</h2>
          <p className="text-gray-700 text-sm leading-relaxed text-center px-2">
            We aim to redefine hotel management by offering a modern, user-friendly solution that streamlines operations, enhances guest satisfaction, and boosts profitability.
          </p>
        </div>

        {/* Frame 3: What We Offer */}
        <div className="bg-blue-300 hover:bg-green-400 transition-all duration-300 p-4 rounded-lg shadow-sm border border-gray-200 h-64 flex flex-col justify-center relative z-0 hover:z-10 hover:scale-105">
          <h2 className="text-xl font-semibold text-blue-600 mb-2 text-center">What We Offer</h2>
          <div className="text-gray-700 text-sm space-y-1 text-center">
            <p>Room and Guest Management</p>
            <p>Online Booking System</p>
            <p>Staff Scheduling</p>
            <p>Payment Reports</p>
            <p>Facility Tracking</p>
          </div>
        </div>

        {/* Frame 4: Why Choose Us */}
        <div className="bg-blue-300 hover:bg-green-400 transition-all duration-300 p-4 rounded-lg shadow-sm border border-gray-200 h-64 flex flex-col justify-center relative z-0 hover:z-10 hover:scale-105">
          <h3 className="text-xl font-semibold text-blue-600 mb-2 text-center">Why Choose Us?</h3>
          <p className="text-gray-700 text-sm text-center px-2 mb-3">
            Built with cutting-edge tech, Velvet Stay ensures security, speed, and scalability for all hotel types.
          </p>
          <div className="flex justify-center gap-3">
            <button className="px-4 py-1 bg-blue-800 text-white rounded hover:bg-black transition text-sm">
              Learn More
            </button>
            <button className="px-4 py-1 bg-blue-800 text-white rounded hover:bg-black transition text-sm">
              Contact
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
