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
    <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Add Family Member</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-base font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="input input-bordered w-full"
            placeholder="Enter full name"
            value={memberData.fullName}
            onChange={(e) =>
              setMemberData({ ...memberData, fullName: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="dob" className="block text-base font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="input input-bordered w-full"
            value={memberData.dob}
            onChange={(e) =>
              setMemberData({ ...memberData, dob: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="mobileNo" className="block text-base font-medium">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobileNo"
            name="mobileNo"
            className="input input-bordered w-full"
            placeholder="Enter mobile number"
            minLength={10}
            maxLength={10}
            value={memberData.mobileNo}
            onChange={(e) =>
              setMemberData({ ...memberData, mobileNo: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="aadhar" className="block text-base font-medium">
            Aadhar Number
          </label>
          <input
            type="text"
            id="aadhar"
            name="aadhar"
            minLength={12}
            maxLength={12}
            className="input input-bordered w-full"
            placeholder="Enter Aadhar number"
            value={memberData.aadhar}
            onChange={(e) =>
              setMemberData({ ...memberData, aadhar: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-base font-medium">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="select select-bordered w-full"
            value={memberData.gender}
            onChange={(e) =>
              setMemberData({ ...memberData, gender: e.target.value })
            }
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="caste" className="block text-base font-medium">
            Caste
          </label>
          <input
            type="text"
            id="caste"
            name="caste"
            className="input input-bordered w-full"
            placeholder="Enter caste"
            value={memberData.caste}
            onChange={(e) =>
              setMemberData({ ...memberData, caste: e.target.value })
            }
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-full">
            Add Family Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFamilyMemberForm;
