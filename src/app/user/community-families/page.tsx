"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { Family } from "@/types/family";
import { User } from "@/types/User";
import axios from "axios";

const CommunityFamilies = () => {
  const { family } = useUser();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredFamilies, setFilteredFamilies] = useState<Family[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [communityFamilies, setCommunityFamilies] = useState<Family[]>([]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredFamilies(communityFamilies);
    } else {
      setFilteredFamilies(
        communityFamilies.filter((family) =>
          family.familyName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, communityFamilies]);

  useEffect(() => {
    const getCommunityFamily = async () => {
      const response = await axios.post("/api/family", {
        community: family?.community,
      });
      setCommunityFamilies(response.data);
    };
    if (family) {
      getCommunityFamily();
    }
  }, [family]);

  const openFamilyModal = (family: Family) => {
    setSelectedFamily(family);
  };

  // Close modal
  const closeFamilyModal = () => {
    setSelectedFamily(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-5 p-6 sm:p-10 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-6">
        Community Families
      </h2>

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by family name"
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display Families in Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredFamilies.length > 0 ? (
          filteredFamilies.map((family) => (
            <div
              key={family._id}
              className="card bg-accent text-accent-content shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => openFamilyModal(family)}
            >
              <div className="card-body">
                <h3 className="font-semibold text-xl text-center mb-2">
                  {family.familyName}
                </h3>
                <p className="text-sm text-center">
                  Total Members: {family.members.length}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-2xl font-semibold">
            No families found
          </div>
        )}
      </div>

      {selectedFamily && (
        <div className="fixed inset-0 flex items-center justify-center bg-base-300 bg-opacity-50 z-10">
          <div className="bg-base-200 p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-2/3">
            <h3 className="text-3xl font-semibold text-center mb-4">
              Family Details
            </h3>
            <button onClick={closeFamilyModal} className="btn btn-ghost mb-4">
              Close
            </button>

            <div className="space-y-4 mb-6">
              <h4 className="text-xl font-semibold">
                Family Name: {selectedFamily.familyName}
              </h4>
              <p>
                <strong>Caste:</strong> {selectedFamily.members[0].caste}
              </p>
              <p>
                <strong>Community:</strong> {selectedFamily.community}
              </p>
              <p>
                <strong>Address:</strong> {selectedFamily.address.street},
                {selectedFamily.address.city} ,{selectedFamily.address.state}
              </p>
            </div>

            <h4 className="text-2xl font-semibold">Members</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {selectedFamily.members.map((member: User) => (
                <div
                  key={member._id}
                  className="card bg-accent text-accent-content shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <div className="card-body">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                      <img
                        src={member.profileImage || "/default-profile.png"}
                        alt={member.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Member Information */}
                    <h5 className="font-semibold text-lg text-center">
                      {member.fullName}
                    </h5>
                    <p className="text-sm text-center">ID: {member.aadhar}</p>
                    <p className="text-sm text-center">
                      Mobile No: {member.mobileNo}
                    </p>
                    <p className="text-sm text-center">
                      Gender: {member.gender}
                    </p>
                    <p className="text-sm text-center">
                      DOB: {new Date(member.dob).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityFamilies;
