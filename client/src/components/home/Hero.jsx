import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Car,
  CheckCircle,
  ChevronRight,
  Star,
  Shield,
  Clock,
  CreditCard,
} from "lucide-react";
import { assets } from "../../assets/assets";
import Car3DModel from "./Car3DModel";

const Hero = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const slideIn = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, delay: 0.2 },
  };

  const features = [
    { icon: Shield, text: "Fully Insured" },
    { icon: Clock, text: "24/7 Support" },
    { icon: CreditCard, text: "Flexible Payment" },
  ];

  const stats = [
    { value: "50+", label: "Car Models" },
    { value: "98%", label: "Happy Clients" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div className="container flex flex-col h-auto p-8 sm:p-16 relative w-full mx-auto transition-colors duration-300">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Content */}
        <motion.div
          className="flex-1 lg:max-w-lg"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          {/* --- MOVED BADGE: Best Prices --- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-6 w-fit bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg font-bold"
          >
            Best Prices Guaranteed
          </motion.div>

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full transition-colors">
            <Star className="text-orange-500 w-5 h-5" />
            <span className="text-orange-700 dark:text-orange-400 font-medium text-sm">
              Premium Car Rental Service
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-gray-900 dark:text-white transition-colors">
            Save <span className="text-orange-500">big</span> with our{" "}
            <span className="text-orange-500">car rental</span>
          </h1>

          <p className="text-gray-600 dark:text-zinc-400 text-lg mb-8 leading-relaxed transition-colors">
            Experience the freedom of the open road with our premium car rental
            service. Unbeatable prices, unlimited miles, and flexible pick-up
            options.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/models")}
              className="flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-lg
                          hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
            >
              <span className="font-bold">Book Ride</span>
              <CheckCircle className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/learnmore")}
              className="
                  flex items-center gap-2 px-8 py-4 rounded-lg
                  bg-transparent
                  text-orange-500 font-semibold
                  border border-orange-500/50
                  transition-all duration-300
                  hover:border-orange-500
                  hover:bg-orange-500/5
                  hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]
                  "
            >
              <span>Learn More</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
          {/* Icon Features Section */}
          <div className="flex flex-wrap gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center transition-colors">
                  <feature.icon className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-gray-700 dark:text-zinc-300 font-medium transition-colors">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Stats Counters */}
          <div className="flex flex-wrap gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold text-orange-500">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-zinc-500 font-medium transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Section: 3D Model & Floating Cards */}
        <motion.div
          className="flex-1 lg:flex-[1.2] relative w-full"
          initial="initial"
          animate="animate"
          variants={slideIn}
        >
          {/* 3D Car Model Component */}
          <Car3DModel />

          {/* Floating Card: Latest Models */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="static lg:absolute lg:mt-6 lg:bottom-8 lg:-right-4 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-2xl border border-transparent dark:border-zinc-800 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Car className="text-orange-500 w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-lg dark:text-white">
                  Latest Models
                </p>
                <p className="text-gray-500 dark:text-zinc-400">
                  Premium Selection
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;