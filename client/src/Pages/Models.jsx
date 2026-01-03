import React, {
  useState,
  useMemo,
  useCallback,
  Fragment
} from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  Fuel,
  Star,
  ChevronRight,
  Search,
  Filter
} from "lucide-react";

/* =====================================================
   App Constants
===================================================== */
const PRICE_CONFIG = Object.freeze({
  MIN: 50,
  MAX: 300,
  STEP: 10,
});

const FILTER_DEFAULTS = Object.freeze({
  CATEGORY: "All",
  FUEL: "All",
  PRICE: PRICE_CONFIG.MAX,
});

const CATEGORY_OPTIONS = Object.freeze([
  "All",
  "Sedan",
  "SUV",
  "Luxury",
  "Sports",
]);

const FUEL_OPTIONS = Object.freeze([
  "All",
  "Petrol",
  "Diesel",
  "Hybrid",
  "Electric",
]);

/* =====================================================
   Dataset
===================================================== */
const cars = [
  {
    id: 1,
    name: "Tesla Model 3",
    category: "Sedan",
    price: 89,
    image: "https://media.zigcdn.com/media/model/2024/Jun/bmw-m5-2025.jpg",
    rating: 4.9,
    features: {
      seats: "5",
      luggage: "3",
      fuel: "Electric",
    },
  },
  {
    id: 2,
    name: "BMW X5",
    category: "SUV",
    price: 129,
    image: "https://www.carhelpcanada.com/wp-content/uploads/2019/02/2019-BMW-X5-2.jpg",
    rating: 4.8,
    features: {
      seats: "7",
      luggage: "5",
      fuel: "Hybrid",
    },
  },
  {
    id: 3,
    name: "Mercedes S-Class",
    category: "Luxury",
    price: 250,
    image: "https://hips.hearstapps.com/hmg-prod/images/mercedes-benz-s-class-50-1608218514.jpg",
    rating: 4.9,
    features: {
      seats: "5",
      luggage: "4",
      fuel: "Hybrid",
    },
  },
  {
    id: 4,
    name: "Porsche 911",
    category: "Sports",
    price: 300,
    image:
      "https://prs.porsche.com/iod/image/CA/992452/1/N4Igxg9gdgZglgcxALlAQynAtmgLnaAZxQG0BdAGnDSwFMAnNFUOAExRFoA9cBaAGwgB3XjHrQ+-WjFwgqEAA74izEADc09OBlnIQWCACM4UkAF8zVWlDVxxUOlF0t2egPJpCcYvKUEoxKgWVPyIABb4UEioIGwcACIAggCaciCKygHMwSAK4qwArmDOsa4gAJzlAEwALACsVWkZ-oGgkAVO9ACeAMIQrLQcPYlpBgP8ybSaKFUADFUAbL6ZgSQgAIwAEml1ABwAWmkAMgDiACrxAEpHIGQWliCEtLiRCK0gMBD0OLogAFYKWhIKi4RgBBSaay6GBofhPCxAA",
    rating: 4.9,
    features: {
      seats: "2",
      luggage: "1",
      fuel: "Petrol",
    },
  },
];

/* =====================================================
   Utility Helpers
===================================================== */
const normalize = (value = "") => value.toLowerCase().trim();

const safeIncludes = (source, target) =>
  normalize(source).includes(normalize(target));

const isAll = (value) => value === "All";

const byCategory = (car, category) =>
  isAll(category) || car.category === category;

const byFuel = (car, fuel) =>
  isAll(fuel) || car.features.fuel === fuel;

const byPrice = (car, max) => car.price <= max;

const bySearch = (car, term) =>
  safeIncludes(car.name, term);

/* =====================================================
   UI Helpers (No logic change)
===================================================== */
const FeatureItem = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center gap-1">
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </div>
);

const EmptyState = () => (
  <p className="text-center mt-20 text-gray-500">
    No cars found matching your filters.
  </p>
);

/* =====================================================
   Main Component
===================================================== */
const Models = () => {
  /* ---------------- State ---------------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    FILTER_DEFAULTS.CATEGORY
  );
  const [fuelType, setFuelType] = useState(
    FILTER_DEFAULTS.FUEL
  );
  const [maxPrice, setMaxPrice] = useState(
    FILTER_DEFAULTS.PRICE
  );

  /* ---------------- Callbacks ---------------- */
  const handleSearch = useCallback(
    (e) => setSearchTerm(e.target.value),
    []
  );

  const handleCategory = useCallback(
    (value) => setActiveCategory(value),
    []
  );

  const handleFuel = useCallback(
    (e) => setFuelType(e.target.value),
    []
  );

  const handlePrice = useCallback(
    (e) => setMaxPrice(Number(e.target.value)),
    []
  );

  /* ---------------- Derived Data ---------------- */
  const filteredCars = useMemo(() => {
    return cars.filter((car) =>
      bySearch(car, searchTerm) &&
      byCategory(car, activeCategory) &&
      byFuel(car, fuelType) &&
      byPrice(car, maxPrice)
    );
  }, [searchTerm, activeCategory, fuelType, maxPrice]);

  /* ---------------- Render ---------------- */
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-24 pb-20">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Vehicle <span className="text-orange-500">Fleet</span>
          </motion.h1>
          <p className="text-gray-600 dark:text-zinc-400">
            Browse premium vehicles tailored to your needs.
          </p>
        </div>

        {/* FILTER BAR */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search car models..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-900 border rounded-xl"
            />
          </div>

          <div>
            <label className="text-sm flex items-center gap-2 mb-1">
              <Filter className="w-4 h-4" />
              Max Price (${maxPrice})
            </label>
            <input
              type="range"
              min={PRICE_CONFIG.MIN}
              max={PRICE_CONFIG.MAX}
              step={PRICE_CONFIG.STEP}
              value={maxPrice}
              onChange={handlePrice}
              className="w-full"
            />
          </div>

          <select
            value={fuelType}
            onChange={handleFuel}
            className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border"
          >
            {FUEL_OPTIONS.map((fuel) => (
              <option key={fuel}>{fuel}</option>
            ))}
          </select>
        </div>

        {/* CATEGORY */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORY_OPTIONS.map((category) => (
            <button
              key={category}
              onClick={() => handleCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium
                ${activeCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 dark:bg-zinc-900"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-900 rounded-2xl border overflow-hidden"
            >
              <div className="relative h-56">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 px-3 py-1 rounded-full flex gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold">{car.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <span className="text-xs text-orange-500 font-bold uppercase">
                      {car.category}
                    </span>
                    <h3 className="text-xl font-bold">{car.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-500">
                      ${car.price}
                    </p>
                    <p className="text-xs text-gray-400">per day</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6 text-xs text-gray-500">
                  <FeatureItem
                    icon={Users}
                    label={`${car.features.seats} Seats`}
                  />
                  <FeatureItem
                    icon={Briefcase}
                    label={`${car.features.luggage} Bags`}
                  />
                  <FeatureItem
                    icon={Fuel}
                    label={car.features.fuel}
                  />
                </div>

                <Link
                  to={`/booking/${car.id}`}
                  className="flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-xl font-bold"
                >
                  Book Now <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCars.length === 0 && <EmptyState />}
      </div>
    </div>
  );
};

export default Models;
