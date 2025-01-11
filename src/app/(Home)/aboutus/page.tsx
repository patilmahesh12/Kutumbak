"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-10 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-2xl">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-gray-800">
        About Us
      </h1>

      <div className="join join-vertical w-full space-y-4">
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title flex items-center text-xl sm:text-2xl font-medium text-blue-700">
            Our Mission
            <ArrowRight className="mr-2" />
          </div>
          <div className="collapse-content">
            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              Our mission is to create a user-friendly platform that fosters
              connection and community. This project allows families to connect,
              manage their details, and interact within their communities. We aim
              to provide a secure, efficient, and engaging experience for all
              users.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title text-xl sm:text-2xl font-medium text-blue-700">
            What We Offer
          </div>
          <div className="collapse-content">
            <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4">
              Our platform enables users to create family profiles, add family
              members, and manage information with ease. With a focus on
              community, users can connect based on shared backgrounds, find
              family members, and view profiles within their community.
            </p>
            <ul className="list-disc list-inside pl-6 space-y-2 text-gray-700">
              <li>Seamless profile management for families and individuals.</li>
              <li>
                Advanced search options to find family members within the
                community.
              </li>
              <li>
                Secure and intuitive user interface with personalized features.
              </li>
            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title text-xl sm:text-2xl font-medium text-blue-700">
            Our Values 
          </div>
          <div className="collapse-content">
            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              We value privacy, transparency, and community. Our platform is
              designed to ensure users’ data security and privacy, allowing
              families to connect and share information in a protected space.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
