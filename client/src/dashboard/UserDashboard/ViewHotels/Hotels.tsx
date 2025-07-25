import React, { useState } from "react";
import {
  useGetHotelsQuery,
  useGetHotelsByLocationQuery,
  useGetHotelsByRatingQuery,
} from "../../../Features/hotels/HotelsAPI";
import AvailableRooms from "../../../dashboard/UserDashboard/ViewHotels/AvailableRooms";

const Hotels = () => {
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [searchType, setSearchType] = useState<"all" | "location" | "rating">("all");
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);

  const {
    data: allHotels,
    isLoading: loadingAll,
    refetch: refetchAll,
  } = useGetHotelsQuery(undefined, { skip: searchType !== "all" });

  const {
    data: locationHotels,
    isLoading: loadingLocation,
    refetch: refetchLocation,
  } = useGetHotelsByLocationQuery(location, { skip: searchType !== "location" });

  const {
    data: ratingHotels,
    isLoading: loadingRating,
    refetch: refetchRating,
  } = useGetHotelsByRatingQuery(rating, { skip: searchType !== "rating" });

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchType("location");
    refetchLocation();
  };

  const handleRatingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchType("rating");
    refetchRating();
  };

  const handleViewAll = () => {
    setSearchType("all");
    refetchAll();
  };

  const toggleAvailableRooms = (hotelId: number) => {
    setSelectedHotelId((prevId) => (prevId === hotelId ? null : hotelId));
  };

  const hotels =
    searchType === "all"
      ? allHotels
      : searchType === "location"
      ? locationHotels
      : ratingHotels;

  const isLoading = loadingAll || loadingLocation || loadingRating;

  return (
    <div className="max-w-6xl mx-auto mt-6 px-2 h-[calc(100vh-80px)] overflow-y-auto">
      {/* Search Filters */}
      <div className="bg-white p-4 rounded shadow mb-4 border border-blue-300">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Location Search */}
          <form onSubmit={handleLocationSearch} className="flex gap-2 w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 px-3 py-1 text-sm rounded border border-gray-300 text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-green-500"
            >
              Search
            </button>
          </form>

          {/* Rating Search */}
          <form onSubmit={handleRatingSearch} className="flex gap-2 w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="flex-1 px-3 py-1 text-sm rounded border border-gray-300 text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-green-500"
            >
              Search
            </button>
          </form>
        </div>

        {/* View All */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleViewAll}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            View All
          </button>
        </div>
      </div>

      {/* Display Hotels */}
      <div>
        {isLoading ? (
          <p className="text-center">Loading hotels...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotels?.length ? (
              hotels.map((hotel) => (
                <div
                  key={hotel.hotelId}
                  className="border border-blue-200 bg-white p-2 rounded-md shadow-sm text-sm"
                >
                  <img
                    src={hotel.imgUrl}
                    alt={hotel.name}
                    className="w-full h-28 object-cover rounded mb-1"
                  />
                  <h3 className="font-semibold text-blue-800">{hotel.name}</h3>
                  <p className="text-gray-600">{hotel.location}</p>
                  <p className="text-gray-600">{hotel.address}</p>
                  <p className="text-gray-600">Rating: {hotel.rating}</p>
                  <p className="text-gray-600">{hotel.description}</p>

                  <button
                    onClick={() => toggleAvailableRooms(hotel.hotelId)}
                    className="mt-2 w-full bg-blue-600 hover:bg-green-500 text-white text-sm px-3 py-1 rounded"
                  >
                    {selectedHotelId === hotel.hotelId ? "Hide Rooms" : "Available Rooms"}
                  </button>

                  {selectedHotelId === hotel.hotelId && (
                    <AvailableRooms hotelId={hotel.hotelId} />
                  )}
                </div>
              ))
            ) : (
              <p className="text-center w-full col-span-full">No hotels found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
