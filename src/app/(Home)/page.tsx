"use client";
import { useState } from "react";
import SignUp from "@/dialogs/SignUp";

const Hero = () => {
  const [showRegister, setShowRegister] = useState(false);

  const handleGetStarted = () => {
    (document.getElementById("signup") as HTMLDialogElement).showModal();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <header className="text-center w-full h-1/2bg-base-300">
        <h1 className="text-5xl font-bold text-primary">
          Visit Your Community!
        </h1>
        <p className="mt-4 text-lg text-base-content">
          Join us to connect, share, and grow together.
        </p>
        <button
          onClick={handleGetStarted}
          className="btn btn-secondary mt-6 font-semibold px-8 py-3 shadow-lg transition duration-200 hover:scale-105"
        >
          Find People
        </button>
      </header>

      <section className="w-full max-w-5xl px-4 mt-12">
        <h2 className="text-3xl font-semibold text-center text-base-content">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {["Connect", "Share", "Grow"].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-base-100 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-primary">{feature}</h3>
              <p className="mt-2 text-base-content">
                {feature === "Connect"
                  ? "Meet like-minded individuals and expand your network."
                  : feature === "Share"
                  ? "Share your knowledge, experiences, and ideas."
                  : "Learn from others and grow both personally and professionally."}
              </p>
            </div>
          ))}
        </div>
        <SignUp />
      </section>
    </div>
  );
};

export default Hero;
