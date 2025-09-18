"use client";

import AddFamilyMemberForm from "@/components/FamilyComponent/AddFamilyMemberForm";
import UpdateFamilyMember from "@/components/FamilyComponent/UpdateFamilyMember";
import { useState } from "react";

const FamilyMembersComponent = () => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 mb-6">
        <button
          className={`w-full sm:w-auto px-4 py-2 text-lg font-semibold rounded-lg transition-all ${
            activeTab === "add" ? "bg-primary text-white shadow-lg" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add Family Member
        </button>
        <button
          className={`w-full sm:w-auto px-4 py-2 text-lg font-semibold rounded-lg transition-all ${
            activeTab === "update" ? "bg-primary text-white shadow-lg" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("update")}
        >
          Update Family Member
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        {activeTab === "add" ? <AddFamilyMemberForm /> : <UpdateFamilyMember />}
      </div>
    </div>
  );
};

export default FamilyMembersComponent;