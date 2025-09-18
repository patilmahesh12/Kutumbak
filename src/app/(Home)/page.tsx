"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Share, Users, TrendingUp } from "lucide-react";
import SignUp from "@/dialogs/SignUp";

const Hero = () => {
  // const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleGetStarted = () => {
    (document.getElementById("signup") as HTMLDialogElement).showModal();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <div className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-base-content">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 dark:bg-gray-800 overflow-hidden">
      <header className="text-center w-full bg-base-300 dark:bg-gray-700 py-10">
        <motion.div
          className="flex justify-center items-center"
          initial={{ y: -20 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <Globe size={50} className="text-primary" />
        </motion.div>
        <h1
          className="font-bold text-primary mt-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
        >
          Visit Your Community!
        </h1>
        <p
          className="mt-4 text-base-content"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
        >
          Join us to connect, share, and grow together.
        </p>
        <button
          onClick={handleGetStarted}
          className="btn btn-secondary mt-6 font-semibold px-8 py-3 shadow-lg transition duration-200 hover:scale-105"
        >
          Find People
        </button>
      </header>

      <section className="w-full max-w-5xl px-4 py-10">
        <h2
          className="text-center text-base-content font-semibold"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
        >
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: "Connect",
              description: "Meet like-minded individuals and expand your network.",
              Icon: Users,
            },
            {
              title: "Share",
              description: "Share your knowledge, experiences, and ideas.",
              Icon: Share,
            },
            {
              title: "Grow",
              description: "Learn from others and grow both personally and professionally.",
              Icon: TrendingUp,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-base-100 dark:bg-gray-700 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="flex justify-center items-center mb-4"
                initial={{ y: -10 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <feature.Icon size={40} className="text-primary" />
              </motion.div>
              <h3
                className="text-primary font-bold"
                style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-base-content mt-2"
                style={{ fontSize: "clamp(0.875rem, 2vw, 1.125rem)" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        <SignUp />
      </section>
    </div>
  );
};

export default Hero;
