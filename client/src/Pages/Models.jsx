import React, { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion is used for animation effects on cards and headings
import { Link } from "react-router-dom"; // Link component for navigation to booking pages
import {
  Car,
  Users,
  Briefcase,
  Fuel,
  Star,
  ChevronRight,
  Search,
  Filter
} from "lucide-react"; // Icon library used for features, ratings, and UI elements

// Array of car objects representing the fleet
// Each car has id, name, category, price, image URL, features (seats, luggage, fuel), and rating
// You can add more cars to this array in future (e.g., more Luxury or Sports models)
const cars = [
  {
    id: 1,
    name: "Tesla Model 3",
    category: "Sedan",
    price: 89,
    image: "https://media.zigcdn.com/media/model/2024/Jun/bmw-m5-2025.jpg",
    features: { seats: "5", luggage: "3", fuel: "Electric" },
    rating: 4.9,
  },
  {
    id: 2,
    name: "BMW X5",
    category: "SUV",
    price: 129,
    image: "https://www.carhelpcanada.com/wp-content/uploads/2019/02/2019-BMW-X5-2.jpg",
    features: { seats: "7", luggage: "5", fuel: "Hybrid" },
    rating: 4.8,
  },
  {
    id: 3,
    name: "Mercedes S-Class",
    category: "Luxury",
    price: 250,
    image: "https://hips.hearstapps.com/hmg-prod/images/mercedes-benz-s-class-50-1608218514.jpg?crop=1xw:0.846595699831366xh;center,top&resize=1200:*",
    features: { seats: "5", luggage: "4", fuel: "Hybrid" },
    rating: 4.9,
  },
  {
    id: 4,
    name: "Porsche 911",
    category: "Sports",
    price: 300,
    image: "https://prs.porsche.com/iod/image/CA/992452/1/N4Igxg9gdgZglgcxALlAQynAtmgLnaAZxQG0BdAGnDSwFMAnNFUOAExRFoA9cBaAGwgB3XjHrQ+-WjFwgqEAA74izEADc09OBlnIQWCACM4UkAF8zVWlDVxxUOlF0t2egPJpCcYvKUEoxKgWVPyIABb4UEioIGwcACIAggCaciCKygHMwSAK4qwArmDOsa4gAJzlAEwALACsVWkZ-oGgkAVO9ACeAMIQrLQcPYlpBgP8ybSaKFUADFUAbL6ZgSQgAIwAEml1ABwAWmkAMgDiACrxAEpHIGQWliCEtLiRCK0gMBD0OLogAFYKWhIKi4RgBBSaay6GBofhPCxAA?clientId=modelpage",
    features: { seats: "2", luggage: "1", fuel: "Petrol" },
    rating: 4.9,
  },
];

// Main Models component rendering the car fleet page
const Models = () => {
  // State to store search input typed by user
  const [searchTerm, setSearchTerm] = useState("");
  // State to store the currently active category selected by user
  const [activeCategory, setActiveCategory] = useState("All");

  // Array of categories displayed as filter buttons
  // These correspond to the car objects’ category property
  const categories = ["All", "Sedan", "SUV", "Luxury", "Sports"];

  // Filter cars array based on search term and selected category
  // This is recalculated on every render
  const filteredCars = cars.filter(car => {
    // Check if car name includes search term (case-insensitive)
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Check if car matches selected category, or allow all if "All" is selected
    const matchesCategory = activeCategory === "All" || car.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    // Outer container with min height to cover screen and dark mode support
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors duration-300 pt-24 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Page Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Animated heading using Framer Motion */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }} // Start invisible, slightly above
            animate={{ opacity: 1, y: 0 }} // Animate to visible, original position
            className="text-4xl md:text-5xl font-bold mb-4 dark:text-white"
          >
            Our Vehicle <span className="text-orange-500">Fleet</span>
          </motion.h1>
          {/* Subtitle paragraph */}
          <p className="text-gray-600 dark:text-zinc-400">
            Choose from our extensive collection of premium vehicles, from eco-friendly electric cars to high-performance luxury SUVs.
          </p>
        </div>

        {/* Search Bar and Category Filters Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            {/* Search icon positioned inside input */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search car models..."
              value={searchTerm} // Controlled input
              onChange={(e) => setSearchTerm(e.target.value)} // Update state on input
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-white"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)} // Update active category on click
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                  ${activeCategory === cat
                    ? "bg-orange-500 text-white" // Active category styling
                    : "bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-orange-100 dark:hover:bg-zinc-800"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Car Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id} // Unique key for React list rendering
              initial={{ opacity: 0, y: 20 }} // Card appears from below with fade-in
              whileInView={{ opacity: 1, y: 0 }} // Animate when scrolled into viewport
              viewport={{ once: true }} // Animate only once
              transition={{ delay: index * 0.1 }} // Stagger animation for each card
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              {/* Car Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={car.image} // Car image URL
                  alt={car.name} // Alt text for accessibility
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" // Hover zoom effect
                />
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {/* Star Icon */}
                  <span className="text-sm font-bold dark:text-white">{car.rating}</span> {/* Rating Value */}
                </div>
              </div>

              {/* Car Info Section */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {/* Car Category */}
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">{car.category}</span>
                    {/* Car Name */}
                    <h3 className="text-xl font-bold dark:text-white">{car.name}</h3>
                  </div>
                  {/* Price */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-500">${car.price}</p>
                    <p className="text-xs text-gray-400">per day</p>
                  </div>
                </div>

                {/* Features Row */}
                <div className="grid grid-cols-3 gap-2 mb-6 py-4 border-t border-b border-gray-100 dark:border-zinc-800">
                  {/* Seats Feature */}
                  <div className="flex flex-col items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-zinc-400">{car.features.seats} Seats</span>
                  </div>
                  {/* Luggage Feature */}
                  <div className="flex flex-col items-center gap-1 border-x border-gray-100 dark:border-zinc-800 px-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-zinc-400">{car.features.luggage} Bags</span>
                  </div>
                  {/* Fuel Feature */}
                  <div className="flex flex-col items-center gap-1">
                    <Fuel className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-zinc-400">{car.features.fuel}</span>
                  </div>
                </div>

                {/* Book Now CTA */}
                <Link
                  to={`/booking/${car.id}`} // Navigate to booking page of specific car
                  className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                >
                  Book Now
                  <ChevronRight className="w-5 h-5" /> {/* Arrow icon */}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State when no cars match search or filter */}
        {filteredCars.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-zinc-500 text-lg">
              No cars found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Models;
