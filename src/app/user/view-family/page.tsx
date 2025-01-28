"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/User";

const ViewFamily = () => {
  const { family } = useUser();
  const [selectedMember, setSelectedMember] = useState<User | null>(null);

  // Function to download all family members' details in a single PDF
  const downloadAllPDF = () => {
    if (!family || family.members.length === 0) {
      alert("No family members to export.");
      return;
    }

    const doc = new jsPDF();
    const familyName = family?.familyName || "Family Details";
    let yPosition = 20;

    // Adding the family name at the top
    doc.setFontSize(20);
    doc.text(familyName, 20, yPosition);
    yPosition += 10;

    // Iterate over all members and add their details to the PDF
    family.members.forEach((member, index) => {
      yPosition += 10;

      // Add a heading for each member
      doc.setFontSize(14);
      doc.text(`Member ${index + 1}: ${member.fullName}`, 20, yPosition);

      // Add member details
      doc.setFontSize(12);
      yPosition += 10;
      doc.text(`Aadhar Number: ${member.aadhar}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Mobile No.: ${member.mobileNo}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Gender: ${member.gender}`, 20, yPosition);
      yPosition += 10;
      doc.text(
        `Date of Birth: ${new Date(member.dob).toLocaleDateString()}`,
        20,
        yPosition
      );
      yPosition += 10;
      doc.text(`Caste: ${member.caste}`, 20, yPosition);

      // Add a page if content exceeds page height
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });

    // Save the PDF with the family name
    doc.save(`${familyName.replace(/\s+/g, "_")}_Details.pdf`);
  };

  // Function to download a single family member's details as PDF
  const downloadMemberPDF = (member: User) => {
    const doc = new jsPDF();
    const yPosition = 20;

    doc.setFontSize(20);
    doc.text(`${member.fullName}'s Details`, 20, yPosition);
    
    doc.setFontSize(12);
    doc.text(`Aadhar Number: ${member.aadhar}`, 20, yPosition + 10);
    doc.text(`Mobile No.: ${member.mobileNo}`, 20, yPosition + 20);
    doc.text(`Gender: ${member.gender}`, 20, yPosition + 30);
    doc.text(`Date of Birth: ${new Date(member.dob).toLocaleDateString()}`, 20, yPosition + 40);
    doc.text(`Caste: ${member.caste}`, 20, yPosition + 50);

    doc.save(`${member.fullName.replace(/\s+/g, "_")}_Details.pdf`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-base-200 rounded-lg shadow-lg">
      {/* Header Section with Export Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">View Family Members</h2>
        <button className="btn btn-primary" onClick={downloadAllPDF}>
          Download Family Details
        </button>
      </div>

      {/* Displaying Family Members in Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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
                  src={member.profileImage || "/default-profile.png"}
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
            <button
              className="btn btn-secondary mt-4 mx-auto"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card click event
                downloadMemberPDF(member);
              }}
            >
              Download PDF
            </button>
          </div>
        ))}
      </div>

      {/* Showing Selected Member Details in the Interface (instead of below) */}
      {selectedMember && (
        <div
          className="absolute top-0 left-0 right-0 z-10 bg-white p-6 rounded-lg shadow-xl max-w-4xl mx-auto"
          style={{
            top: "20%",
            maxHeight: "70%",
            overflowY: "auto",
            height: "auto",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            {/* Close button to unselect the member */}
            <button
              className="btn btn-error btn-sm"
              onClick={() => setSelectedMember(null)}
            >
              ✕ Close
            </button>
          </div>
          <h3 className="text-2xl font-semibold text-center mb-4">
            {selectedMember.fullName}'s Details
          </h3>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 sm:mb-0">
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
          <button
            className="btn btn-secondary mt-4 mx-auto"
            onClick={() => downloadMemberPDF(selectedMember)}
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewFamily;
