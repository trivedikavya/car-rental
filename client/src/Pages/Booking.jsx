import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/* =====================================================
   Cars Data Source (UNCHANGED CONTENT)
   ===================================================== */
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
    color: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-500",
  },
  {
    id: 2,
    name: "BMW X5",
    category: "SUV",
    price: 129,
    image: "https://imgd.aeplcdn.com/1920x1080/n/cw/ec/152681/x5-exterior-right-front-three-quarter-6.jpeg?isig=0&q=80&q=80",
    features: { seats: "7", luggage: "5", fuel: "Hybrid" },
    rating: 4.8,
    reviews: 96,
    color: "bg-orange-50 dark:bg-orange-900/20",
    iconColor: "text-orange-500",
  },
  {
    id: 3,
    name: "Audi A6",
    category: "Luxury Sedan",
    price: 109,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
    features: { seats: "5", luggage: "4", fuel: "Petrol" },
    rating: 4.7,
    reviews: 84,
    color: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-500",
  },
  {
    id: 4,
    name: "Range Rover Sport",
    category: "Premium SUV",
    price: 159,
    image: "https://di-uploads-pod3.dealerinspire.com/landroversanantonio/uploads/2024/01/range-rover-sport-autobiography-p510e-2023-im-test.webp",
    features: { seats: "7", luggage: "6", fuel: "Diesel" },
    rating: 4.9,
    reviews: 142,
    color: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-500",
  },
];

/* =====================================================
   Helper Utilities (NO behavior change)
   ===================================================== */
const resolveCarById = (collection, id) =>
  collection.find(item => item.id === parseInt(id));

const excludeActiveCar = (collection, activeId) =>
  collection.filter(item => item.id !== activeId);

const isValidDateRange = (start, end) => start < end;

/* =====================================================
   Component
   ===================================================== */
const CarDetailPage = () => {
  const { id } = useParams();

  /* ---------------- State ---------------- */
  const [selectedCar, setSelectedCar] = useState(null);

  const [rentalDetails, setRentalDetails] = useState({
    pickUpDate: "",
    dropOffDate: "",
    location: "",
  });

  /* ---------------- Effects ---------------- */
  useEffect(() => {
    const resolved = resolveCarById(cars, id);
    setSelectedCar(resolved);
  }, [id]);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRentalDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidDateRange(rentalDetails.pickUpDate, rentalDetails.dropOffDate)) {
      alert("Drop-off date must be after pickup date!");
      return;
    }

    alert("Booking confirmed!");
  };

  /* ---------------- Derived Data ---------------- */
  const relatedCars = selectedCar
    ? excludeActiveCar(cars, selectedCar.id)
    : [];

  /* =====================================================
     Render
     ===================================================== */
  return selectedCar ? (
    <div className="container mx-auto p-6 pt-28 transition-colors duration-300">

      {/* MAIN DETAIL SECTION — EXACT SAME */}
      <div className="flex flex-col md:flex-row md:space-x-10">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <img
            src={selectedCar.image}
            alt={selectedCar.name}
            className="w-full h-80 object-cover rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          />
        </div>

        <div className="w-full md:w-1/2 bg-white dark:bg-zinc-900 shadow-xl rounded-xl p-8 transition-colors">
          <h2 className="text-3xl font-bold mb-2">
            {selectedCar.name}
          </h2>

          <p className="text-xl text-gray-600 dark:text-zinc-400 mb-4">
            {selectedCar.category} —{" "}
            <span className="text-orange-500 font-bold">
              ${selectedCar.price}/day
            </span>
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

      {/* MORE CARS — NO BORDER, ONLY HOVER */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">
          More Cars You May Like
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCars.map(car => (
            <div
              key={car.id}
              className="p-4 rounded-xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h4 className="font-semibold">{car.name}</h4>
              <p className="text-sm text-gray-500">{car.category}</p>
              <p className="mt-2 font-bold text-orange-500">${car.price}/day</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen text-gray-500">
      Loading car details...
    </div>
  );
};

export default CarDetailPage;
