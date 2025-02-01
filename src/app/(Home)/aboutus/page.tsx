"use client";

import React from "react";
import {Heart, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 sm:p-16">
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-white">
          About Us
        </h1>
      </div>
      <section className="mt-16 mb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-[#5C7285] mb-6 flex items-center justify-center">
            <Heart className="text-red-500 mr-4" size={32} />
            Our Mission
          </h2>
          <p className="text-lg text-[#C4D9FF] leading-relaxed max-w-3xl mx-auto">
            Our mission is to create a platform that fosters connection and
            community. We empower families to connect, manage details, and
            interact securely and efficiently, creating an engaging experience
            for all.
          </p>
        </motion.div>
      </section>
      <section className="mb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-[#5C7285] mb-6 flex items-center justify-center">
            <Users className="text-green-400 mr-4" size={32} />
            What We Offer
          </h2>
          <p className="text-lg text-[#155E95] leading-relaxed max-w-3xl mx-auto mb-4">
            Our platform offers intuitive tools for managing family profiles,
            connecting with communities, and ensuring secure interactions.
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#C4D9FF] max-w-3xl mx-auto">
            <li>Streamlined profile and family management features.</li>
            <li>Advanced search to find connections within the community.</li>
            <li>Secure, personalized, and user-friendly interface.</li>
          </ul>
        </motion.div>
      </section>
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-[#5C7285] mb-6 flex justify-center items-center">
            <Shield className="text-yellow-300 mr-4" size={32} />
            Our Values
          </h2>
          <p className="text-lg text-[#C4D9FF] leading-relaxed max-w-3xl mx-auto mb-8">
            We prioritize privacy, transparency, and community. Our platform is
            designed with robust security measures to ensure user data is
            protected while fostering meaningful connections.
          </p>
          <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
