"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/User";

const ViewFamily = () => {
  const { family } = useUser();
  const [selectedMember, setSelectedMember] = useState<User | null>(null);

  return (
    <div className="max-w-3xl mx-auto p-10 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">
        View Family Members
      </h2>

      {/* Displaying Family Members in Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {family?.members.map((member: User) => (
          <div
            key={member._id}
            className="card bg-accent text-accent-content shadow-lg cursor-pointer"
            onClick={() => setSelectedMember(member)}
          >
            <div className="card-body flex flex-col items-center">
              {/* Profile Image */}
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                <img
                  src={member.profileImage || "/default-profile.png"} // Use default if no profile image
                  alt={member.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Full Name */}
              <h3 className="font-semibold text-xl text-center mb-2">
                {member.fullName}
              </h3>

              {/* Aadhar Number */}
              <p className="text-sm text-center">ID: {member.aadhar}</p>

              {/* Mobile Number */}
              <p className="text-sm text-center">
                Mobile No.: {member.mobileNo}
              </p>

              {/* Gender */}
              <p className="text-sm text-center">Gender: {member.gender}</p>

              {/* Optional additional details like DOB */}
              <p className="text-sm text-center">
                DOB: {new Date(member.dob).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Showing Selected Member Details */}
      {selectedMember && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-center mb-4">
            {selectedMember.fullName}'s Details
          </h3>
          <div className="bg-base-100 p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-6">
              {/* Profile Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={selectedMember.profileImage || "/default-profile.png"}
                  alt={selectedMember.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                {/* Member Details */}
                <p className="text-lg">
                  <strong>Full Name:</strong> {selectedMember.fullName}
                </p>
                <p className="text-lg">
                  <strong>Aadhar Number:</strong> {selectedMember.aadhar}
                </p>
                <p className="text-lg">
                  <strong>Mobile No.:</strong> {selectedMember.mobileNo}
                </p>
                <p className="text-lg">
                  <strong>Gender:</strong> {selectedMember.gender}
                </p>
                <p className="text-lg">
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(selectedMember.dob).toLocaleDateString()}
                </p>
                <p className="text-lg">
                  <strong>Caste:</strong> {selectedMember.caste}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewFamily;
