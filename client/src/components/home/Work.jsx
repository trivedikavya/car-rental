import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Car,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle,
  CircleHelp,
} from "lucide-react";

const Work = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const steps = [
    {
      icon: Car,
      title: "Select Your Car",
      description: "Choose from our wide range of premium vehicles for any occasion",
      bgcolor: "bg-blue-50 dark:bg-blue-900/20", // Added dark variant
      iconcolor: "text-blue-500",
    },
    {
      icon: MapPin,
      title: "Pick-up Location",
      description: "Select from our numerous convenient pick-up and drop-off locations",
      bgcolor: "bg-green-50 dark:bg-green-900/20",
      iconcolor: "text-green-500",
    },
    {
      icon: Calendar,
      title: "Pick-up Date",
      description: "Choose your rental duration and preferred pick-up timing",
      bgcolor: "bg-purple-50 dark:bg-purple-900/20",
      iconcolor: "text-purple-500",
    },
    {
      icon: CreditCard,
      title: "Make Payment",
      description: "Quick and secure payment with multiple payment options",
      bgcolor: "bg-orange-50 dark:bg-orange-900/20",
      iconcolor: "text-orange-500",
    },
  ];

  return (
    <section id="work-section" className="bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 transition-colors duration-300 py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => {
          const section = document.getElementById("work-section");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
            }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4
            cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors duration-200"
          >
          <CircleHelp className="w-5 h-5 text-orange-500" />
          <span className="text-orange-700 dark:text-orange-400 font-medium">
            How It Works?
            </span>
          </motion.div>
          <h2 className="text-4xl font-bold mb-6 mt-2 dark:text-white">
            Rent Your Dream Car in 4 Easy Steps
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 text-lg leading-relaxed">
            We've streamlined our rental process to get you on the road quickly
            and safely. Follow these simple steps to begin your journey with us.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div key={index} variants={item} className="relative group">
              <div
                className={`bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800 rounded-xl p-8 h-full transition-all duration-300 
                           group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-orange-500/50`}>
                <div className="flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div
                    className={`w-16 h-16 ${step.bgcolor} rounded-full flex items-center 
                               justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <step.icon className={`w-8 h-8 ${step.iconcolor}`} />
                  </div>

                  <h3 className="text-xl font-semibold mb-4 dark:text-zinc-100">{step.title}</h3>
                  <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Step Number Badge */}
                  <div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full 
                              flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20">
                    {index + 1}
                  </div>
                </div>

                {/* Connecting Line (Only for Desktop) */}
                {index !== steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 left-[90%] w-10 border-t-2 
                               border-dashed border-orange-300 dark:border-zinc-700 -translate-y-1/2 z-10"></div>
                )}
              </div>

              {/* Completion Check Icon */}
              <div className="absolute bottom-4 right-4">
                <CheckCircle
                  className="w-6 h-6 text-gray-300 dark:text-zinc-700 group-hover:text-green-500 
                                   transition-colors"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center">
          <p className="text-gray-600 dark:text-zinc-400 mb-6">
            Ready to get started? Book your dream car now!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/models")}
            className="px-8 py-4 bg-orange-500 text-white rounded-lg shadow-lg 
                     shadow-orange-500/30 hover:bg-orange-600 transition-all font-semibold">
            Book a Car Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;