"use client";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/User";
import Link from "next/link";
import { useEffect } from "react";

const UserDashboard = () => {
  const { family } = useUser();

  useEffect(() => {
    if (!family) {
      console.warn("No family data found.");
    }
  }, [family]);

  return (
    <main className="p-6">
      {/* Welcome Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-base-content">
          Welcome, {family?.familyName}!
        </h1>
        <p className="mt-4 text-xl">Community: {family?.community}</p>
        <p className="mt-4 text-lg text-base-content">
          Our platform connects families within communities to foster stronger
          relationships, share resources, and provide help when needed. It's
          designed to make family management seamless and empower communities
          with easy access to critical information.
        </p>
      </header>

      {/* Importance of the Project Section */}
      <section className="mb-12">
        <div className="card bg-primary text-primary-content shadow-lg p-6">
          <h2 className="text-3xl font-semibold">Why This Project Matters</h2>
          <p className="mt-4 text-base text-primary-content">
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
        <h2 className="text-3xl font-semibold text-base-content">
          Your Family Members
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {family?.members.map((member: User, index) => (
            <div
              key={index}
              className="card bg-accent text-accent-content shadow-lg"
            >
              <div className="card-body">
                <h3 className="font-semibold text-xl">{member.fullName}</h3>
                <p className="text-sm">ID: {member.aadhar}</p>
                <p className="text-sm">Gender: {member.gender}</p>
                <p className="text-sm">Mobile No.: {member.mobileNo}</p>
                <div className="flex space-x-2 mt-4">
                  <Link
                    href={`/user/edit-member/${member._id}`}
                    className="btn btn-xs btn-secondary"
                  >
                    Edit
                  </Link>
                  <button className="btn btn-xs btn-error">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default UserDashboard;
