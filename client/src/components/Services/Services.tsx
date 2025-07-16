import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react"; // make sure lucide-react is installed

const Services = () => {
  const services = [
    { title: "Front Desk", description: "Our reception is open around the clock to assist with check-ins, check-outs, and guest inquiries at any time." },
    { title: "Room Booking & Reservations", description: "Easily book single or multiple rooms for your stay using our seamless online booking system." },
    { title: "Housekeeping Services", description: "Daily cleaning services ensure your room is always fresh, tidy, and well-stocked with essentials." },
    { title: "Concierge Assistance", description: "Our concierge helps with local recommendations, transportation, restaurant reservations, and event bookings." },
    { title: "In-Room Dining", description: "Enjoy meals from our restaurant delivered directly to your room, available during restaurant hours." },
    { title: "Complimentary Wi-Fi", description: "Stay connected with high-speed internet available throughout the hotel—free for all guests." },
    { title: "Laundry & Dry Cleaning", description: "We offer same-day laundry and dry cleaning services for your convenience and comfort." },
    { title: "Fitness Center", description: "Access our fully equipped gym during your stay, ideal for keeping up with your workout routine." },
    { title: "Spa & Wellness Services", description: "Unwind with a massage or facial at our in-house spa. Book in advance for a relaxing experience." },
    { title: "Business Center & Meeting Rooms", description: "Meeting rooms, printing services, and high-speed internet for productivity on the go." },
    { title: "Airport Shuttle Service", description: "Book our reliable airport pickup and drop-off services in advance for a stress-free travel experience." },
    { title: "Restaurant & Bar", description: "Dine in our multi-cuisine restaurant or enjoy a drink at the hotel bar featuring local and international selections." },
    { title: "Event & Banquet Facilities", description: "Host weddings, conferences, or social events in our modern event spaces with full catering and tech support." },
    { title: "Swimming Pool", description: "Take a dip and relax in our indoor or outdoor pool areas—perfect for leisure or family fun." },
    { title: "Luggage Storage", description: "Store your bags safely before check-in or after check-out with our secure luggage holding service." },
    { title: "Car Rental & Parking", description: "We provide onsite parking and can assist with arranging car rentals or taxis for your local travel needs." },
  ];

  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 6;
  const totalPages = Math.ceil(services.length / pageSize);

  const handleNext = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    }
  };

  const visibleServices = services.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  return (
    <div className="min-h-[70vh] bg-blue-50 px-4 py-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-800 animate-fade-in">
        Hotel Services at Velvet Stay
      </h2>

      <div className="relative w-full max-w-6xl">
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServices.map((service, index) => (
            <div
              key={index}
              className="bg-blue-400 border border-blue-100 rounded-xl p-6 shadow-md transform transition-all duration-300 hover:scale-105 hover:z-50 hover:shadow-2xl hover:bg-green-600 hover:text-white cursor-pointer animate-slide-up"
            >
              <h3 className="text-xl font-semibold text-blue-700 group-hover:text-white">
                {service.title}
              </h3>
              <p className="text-gray-700 mt-2 group-hover:text-white">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        {pageIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blue-700 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Arrow */}
        {pageIndex < totalPages - 1 && (
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-700 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Services;
