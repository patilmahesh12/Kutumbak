"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateFamilyMember = () => {
  const { family } = useUser();
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [gender, setGender] = useState("Male");
  const [caste, setCaste] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !dob || !mobileNo || !gender || !caste || !aadhar) {
      toast.error("Please fill all the fields.");
      return;
    }
    const updatedMember = {
      _id: selectedMember?._id,
      fullName,
      dob,
      mobileNo,
      gender,
      caste,
      aadhar,
      profileImage,
    };

    try {
      const response = axios.put(`/api/user/update-family-member`, {
        updatedMember,
      });
      toast.promise(response, {
        loading: "Updating family member...",
        success: "Family member updated successfully.",
        error: "Failed to update family member.",
      });
    } catch (error) {
      toast.error("Failed to update family member.");
    }
  };

  useEffect(() => {
    if (selectedMember) {
      setFullName(selectedMember.fullName);
      setDob(selectedMember.dob);
      setMobileNo(selectedMember.mobileNo);
      setGender(selectedMember.gender);
      setCaste(selectedMember.caste);
      setAadhar(selectedMember.aadhar);
      setProfileImage(selectedMember.profileImage || "");
    }
  }, [selectedMember]);

  return (
    <div className="max-w-3xl mx-auto p-10 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Update Family Member
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {family?.members.map((member: User) => (
          <div
            key={member._id}
            className="card bg-accent text-accent-content shadow-lg cursor-pointer"
            onClick={() => setSelectedMember(member)}
          >
            <div className="card-body flex flex-col items-center">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                <img
                  src={member.profileImage || "/default-profile.png"}
                  alt={member.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl text-center mb-2">
                {member.fullName}
              </h3>
              <p className="text-sm text-center">ID: {member.aadhar}</p>
              <p className="text-sm text-center">
                Mobile No.: {member.mobileNo}
              </p>
              <p className="text-sm text-center">Gender: {member.gender}</p>
              <p className="text-sm text-center">
                DOB: {new Date(member.dob).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Update Form */}
      {selectedMember && (
        <div>
          <h3 className="text-2xl font-semibold text-center mb-4">
            Update Details for {selectedMember.fullName}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-lg font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="input input-bordered w-full"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-lg font-medium">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="input input-bordered w-full"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="mobileNo" className="block text-lg font-medium">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobileNo"
                name="mobileNo"
                className="input input-bordered w-full"
                placeholder="Enter mobile number"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-lg font-medium">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="caste" className="block text-lg font-medium">
                Caste
              </label>
              <input
                type="text"
                id="caste"
                name="caste"
                className="input input-bordered w-full"
                placeholder="Enter caste"
                value={caste}
                onChange={(e) => setCaste(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="aadhar" className="block text-lg font-medium">
                Aadhar Number
              </label>
              <input
                type="text"
                id="aadhar"
                name="aadhar"
                className="input input-bordered w-full"
                placeholder="Enter Aadhar number"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="profileImage"
                className="block text-lg font-medium"
              >
                Profile Image URL
              </label>
              <input
                type="text"
                id="profileImage"
                name="profileImage"
                className="input input-bordered w-full"
                placeholder="Enter image URL"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
              />
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-full">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateFamilyMember;