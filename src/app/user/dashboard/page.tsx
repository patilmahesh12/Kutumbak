"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/User";
import Link from "next/link";

const UserDashboard = () => {
  const { family } = useUser();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<User | null>(null);

  useEffect(() => {
    if (!family) {
      console.warn("No family data found.");
    }
  }, [family]);

  const handleDelete = (member: User) => {
    setMemberToDelete(member);
    setShowDeleteWarning(true);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      console.log(`Deleting member: ${memberToDelete.fullName}`);
    }
    setShowDeleteWarning(false); // Close the modal after deletion
  };

  const cancelDelete = () => {
    setShowDeleteWarning(false); // Close the modal without deleting
  };

  return (
    <main className="p-6 sm:p-10">
      {/* Welcome Section */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content">
          Welcome, {family?.familyName}!
        </h1>
        <p className="mt-4 text-xl sm:text-2xl">Community: {family?.community}</p>
        <p className="mt-4 text-lg text-base-content sm:text-xl">
          Our platform connects families within communities to foster stronger
          relationships, share resources, and provide help when needed. It&#39;s
          designed to make family management seamless and empower communities
          with easy access to critical information.
        </p>
      </header>

      {/* Importance of the Project Section */}
      <section className="mb-12">
        <div className="card bg-primary text-primary-content shadow-lg p-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">Why This Project Matters</h2>
          <p className="mt-4 text-base sm:text-lg text-primary-content">
            Our goal is to build a strong foundation for communities by helping
            families stay connected and manage their details with ease. From
            helping families find each other to making sure everyone is safe,
            this platform is built with care to ensure that everyone in the
            community thrives together.
          </p>
        </div>
      </section>

      {/* Manage Family Members Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold text-base-content">
          Your Family Members
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {family?.members.map((member: User, index) => (
            <div
              key={index}
              className="card bg-accent text-accent-content shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <div className="card-body">
                <h3 className="font-semibold text-xl">{member.fullName}</h3>
                <p className="text-sm">ID: {member.aadhar}</p>
                <p className="text-sm">Gender: {member.gender}</p>
                <p className="text-sm">Mobile No.: {member.mobileNo}</p>
                <div className="flex space-x-2 mt-4">
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(member)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteWarning && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this member?</h3>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="btn btn-secondary"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserDashboard; 
