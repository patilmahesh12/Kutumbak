"use client";

import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-10 bg-base-200 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          Our mission is to create a user-friendly platform that fosters
          connection and community. This project allows families to connect,
          manage their details, and interact within their communities. We aim to
          provide a secure, efficient, and engaging experience for all users.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
        <p className="text-lg leading-relaxed">
          Our platform enables users to create family profiles, add family
          members, and manage information with ease. With a focus on community,
          users can connect based on shared backgrounds, find family members,
          and view profiles within their community.
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Seamless profile management for families and individuals.</li>
          <li>
            Advanced search options to find family members within the community.
          </li>
          <li>
            Secure and intuitive user interface with personalized features.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
        <p className="text-lg leading-relaxed">
          We value privacy, transparency, and community. Our platform is
          designed to ensure users’ data security and privacy, allowing families
          to connect and share information in a protected space.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-lg leading-relaxed">
          If you have any questions or feedback, feel free to reach out. We are
          committed to making this platform better and more beneficial to all
          users.
        </p>
        <p className="text-lg leading-relaxed mt-2">
          <strong>Email:</strong> support@example.com
        </p>
      </section>
    </div>
  );
};

export default About;
