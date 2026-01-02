import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Updated cars array with dark mode background variants
const cars = [
  {
    id: 1,
    name: "Tesla Model 3",
    category: "Sedan",
    price: 89,
    image: "https://media.zigcdn.com/media/model/2024/Jun/bmw-m5-2025.jpg",
    features: { seats: "5", luggage: "3", fuel: "Electric" },
    rating: 4.9,
    reviews: 128,
    color: "bg-blue-50 dark:bg-blue-900/20", // Added dark variant
    iconColor: "text-blue-500",
  },
  {
    id: 2,
    name: "BMW X5",
    category: "SUV",
    price: 129,
    image: "https://d2m3nfprmhqjvd.cloudfront.net/blog/20220825223325/Luxury-SUVs.jpg",
    features: { seats: "7", luggage: "5", fuel: "Hybrid" },
    rating: 4.8,
    reviews: 96,
    color: "bg-orange-50 dark:bg-orange-900/20",
    iconColor: "text-orange-500",
  },
  // ... (Keeping the rest of your cars array objects, just apply the same dark:bg-.../20 logic if you use them)
];

const CarDetailPage = () => {
  const { id } = useParams();
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const car = cars.find(car => car.id === parseInt(id));
    setSelectedCar(car);
  }, [id]);

  const [rentalDetails, setRentalDetails] = useState({
    pickUpDate: "",
    dropOffDate: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRentalDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //To handle Practical Error
    if(rentalDetails.pickUpDate>=rentalDetails.dropOffDate){
      alert("Drop-off date must be after pickup date!");
      return;
    }else{
      alert("Booking confirmed!");
    }
  };

  return (
    selectedCar ? (
      <div className="container mx-auto p-6 mt-20 transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:space-x-10">

          {/* Car Image Container */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img
              src={selectedCar.image}
              alt={selectedCar.name}
              className="w-full h-80 object-cover rounded-xl border border-gray-200 dark:border-zinc-800 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            />
          </div>

          {/* Details & Booking Card */}
          <div className="w-full md:w-1/2 bg-white dark:bg-zinc-900 shadow-xl rounded-xl p-8 border border-transparent dark:border-zinc-800 transition-colors">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {selectedCar.name}
            </h2>
            <p className="text-xl text-gray-600 dark:text-zinc-400 mb-4">
              {selectedCar.category} — <span className="text-orange-500 font-bold">${selectedCar.price}/day</span>
            </p>

            {/* Rating Section */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-semibold text-gray-500 dark:text-zinc-400">{selectedCar.rating}</span>
                <div className="flex text-sm text-yellow-500">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={index < Math.floor(selectedCar.rating) ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 17.25l-6.403 3.377 1.233-7.264L1.43 7.642l7.361-.734L12 1.5l3.522 5.377 7.361.734-5.733 5.721 1.233 7.264L12 17.25z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-zinc-500">({selectedCar.reviews} reviews)</span>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-xl mb-1">🪑</div>
                <span className="text-xs text-gray-500 dark:text-zinc-400">{selectedCar.features.seats} seats</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-xl mb-1">🧳</div>
                <span className="text-xs text-gray-500 dark:text-zinc-400">{selectedCar.features.luggage} luggage</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                <div className="text-xl mb-1">⛽</div>
                <span className="text-xs text-gray-500 dark:text-zinc-400">{selectedCar.features.fuel} fuel</span>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 dark:text-zinc-400 mb-1">Pick-up Date</label>
                  <input
                    type="datetime-local"
                    name="pickUpDate"
                    value={rentalDetails.pickUpDate}
                    onChange={handleChange}
                    className="p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 dark:text-zinc-400 mb-1">Drop-off Date</label>
                  <input
                    type="datetime-local"
                    name="dropOffDate"
                    value={rentalDetails.dropOffDate}
                    onChange={handleChange}
                    className="p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 dark:text-zinc-400 mb-1">Pickup Location</label>
                <input
                  type="text"
                  name="location"
                  value={rentalDetails.location}
                  onChange={handleChange}
                  placeholder="e.g. Airport Terminal 1"
                  className="p-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full py-4 bg-orange-500 text-white font-bold rounded-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all transform active:scale-95"
              >
                Confirm Booking Now
              </button>
            </form>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center min-h-screen text-gray-500 dark:text-zinc-400">
        Loading car details...
      </div>
    )
  );
};

export default CarDetailPage;