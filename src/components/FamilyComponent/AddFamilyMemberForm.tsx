"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";

const AddFamilyMemberForm = () => {
  const { family } = useUser();
  const [memberData, setMemberData] = useState({
    fullName: "",
    dob: "",
    mobileNo: "",
    gender: "Male",
    aadhar: "",
    caste: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberData.fullName || !memberData.aadhar || !memberData.gender) {
      toast.error("Please fill all the required fields.");
      return;
    }
    try {
      const response = axios.post("/api/user/add-family-member", {
        memberData,
        family,
      });
      toast.promise(response, {
        loading: "Adding family member...",
        success: "Family member added successfully.",
        error: "Failed to add family member. Please try again.",
      });
      router.push("/user/manage-family");
    } catch (error) {
      toast.error("Failed to add family member. Please try again.");
    }
  };

  if (!family) return null;

  return (
    <div className="max-w-lg mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Add Family Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter full name"
              value={memberData.fullName}
              onChange={(e) => setMemberData({ ...memberData, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={memberData.dob}
              onChange={(e) => setMemberData({ ...memberData, dob: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              className="input input-bordered w-full"
              placeholder="Enter mobile number"
              minLength={10}
              maxLength={10}
              value={memberData.mobileNo}
              onChange={(e) => setMemberData({ ...memberData, mobileNo: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter Aadhar number"
              minLength={12}
              maxLength={12}
              value={memberData.aadhar}
              onChange={(e) => setMemberData({ ...memberData, aadhar: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              className="select select-bordered w-full"
              value={memberData.gender}
              onChange={(e) => setMemberData({ ...memberData, gender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Caste</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter caste"
              value={memberData.caste}
              onChange={(e) => setMemberData({ ...memberData, caste: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full text-lg">Add Family Member</button>
      </form>
    </div>
  );
};

export default AddFamilyMemberForm;
