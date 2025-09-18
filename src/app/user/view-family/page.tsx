"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/User";
import Image from "next/image";

const ViewFamily = () => {
  const { family } = useUser();
  const [selectedMember, setSelectedMember] = useState<User | null>(null);

  const downloadAllPDF = () => {
    if (!family || family.members.length === 0) {
      alert("No family members to export.");
      return;
    }

    const doc = new jsPDF();
    const familyName = family?.familyName || "Family Details";
    let yPosition = 20;

    doc.setFontSize(20);
    doc.text(familyName, 20, yPosition);
    yPosition += 10;

    family.members.forEach((member, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.text(`Member ${index + 1}: ${member.fullName}`, 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
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
      yPosition += 10;

      // Add profile image if available
      if (member.profileImage) {
        const img = new window.Image();
        img.src = member.profileImage;
        img.onload = () => {
          doc.addImage(img, "JPEG", 150, yPosition - 30, 40, 40);
        };
      }

      yPosition += 20;
    });

    doc.save(`${familyName.replace(/\s+/g, "_")}_Details.pdf`);
  };

  const downloadMemberPDF = (member: User) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`${member.fullName}'s Details`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Aadhar Number: ${member.aadhar}`, 20, 40);
    doc.text(`Mobile No.: ${member.mobileNo}`, 20, 50);
    doc.text(`Gender: ${member.gender}`, 20, 60);
    doc.text(
      `Date of Birth: ${new Date(member.dob).toLocaleDateString()}`,
      20,
      70
    );
    doc.text(`Caste: ${member.caste}`, 20, 80);

    // Add profile image if available
    if (member.profileImage) {
      const img = new window.Image();
      img.src = member.profileImage;
      img.onload = () => {
        doc.addImage(img, "JPEG", 150, 30, 40, 40);
      };
    }

    doc.save(`${member.fullName.replace(/\s+/g, "_")}_Details.pdf`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-base-200 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-center sm:text-left">
          View Family Members
        </h2>
        <button
          className="btn btn-primary w-full sm:w-auto mt-2 sm:mt-0"
          onClick={downloadAllPDF}
        >
          Download Family Details
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {family?.members.map((member: User) => (
          <div
            key={member._id}
            className="card bg-accent text-accent-content shadow-lg p-4 rounded-lg"
          >
            <div className="flex flex-col items-center">
              <Image
                src={member.profileImage || "/default-profile.png"}
                alt={member.fullName}
                width={80}
                height={80}
                className="rounded-full mb-2"
              />
              <h3 className="text-lg font-semibold text-center">
                {member.fullName}
              </h3>
              <p className="text-sm">ID: {member.aadhar}</p>
              <p className="text-sm">Mobile: {member.mobileNo}</p>
              <p className="text-sm">Gender: {member.gender}</p>
              <p className="text-sm">
                DOB: {new Date(member.dob).toLocaleDateString()}
              </p>
              <button
                className="btn btn-secondary mt-3 w-full sm:w-auto"
                onClick={() => setSelectedMember(member)}
              >
                View Details
              </button>
              <button
                className="btn btn-primary mt-2 w-full sm:w-auto"
                onClick={() => downloadMemberPDF(member)}
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewFamily;

// "use client";

// import { useState } from "react";
// import { jsPDF } from "jspdf";
// import { useUser } from "@/context/UserContext";
// import { User } from "@/types/User";

// const ViewFamily = () => {
//   const { family } = useUser();
//   const [selectedMember, setSelectedMember] = useState<User | null>(null);
//   const downloadAllPDF = () => {
//     if (!family || family.members.length === 0) {
//       alert("No family members to export.");
//       return;
//     }

//     const doc = new jsPDF();
//     const familyName = family?.familyName || "Family Details";
//     let yPosition = 20;

//     doc.setFontSize(20);
//     doc.text(familyName, 20, yPosition);
//     yPosition += 10;

//     family.members.forEach((member, index) => {
//       yPosition += 10;
//       doc.setFontSize(14);
//       doc.text(`Member ${index + 1}: ${member.fullName}`, 20, yPosition);
//       yPosition += 10;
//       doc.setFontSize(12);
//       doc.text(`Aadhar Number: ${member.aadhar}`, 20, yPosition);
//       yPosition += 10;
//       doc.text(`Mobile No.: ${member.mobileNo}`, 20, yPosition);
//       yPosition += 10;
//       doc.text(`Gender: ${member.gender}`, 20, yPosition);
//       yPosition += 10;
//       doc.text(
//         `Date of Birth: ${new Date(member.dob).toLocaleDateString()}`,
//         20,
//         yPosition
//       );
//       yPosition += 10;
//       doc.text(`Caste: ${member.caste}`, 20, yPosition);

//       if (yPosition > 270) {
//         doc.addPage();
//         yPosition = 20;
//       }
//     });

//     doc.save(`${familyName.replace(/\s+/g, "_")}_Details.pdf`);
//   };
//   const downloadMemberPDF = (member: User) => {
//     const doc = new jsPDF();
//     doc.setFontSize(20);
//     doc.text(`${member.fullName}'s Details`, 20, 20);
//     doc.setFontSize(12);
//     doc.text(`Aadhar Number: ${member.aadhar}`, 20, 40);
//     doc.text(`Mobile No.: ${member.mobileNo}`, 20, 50);
//     doc.text(`Gender: ${member.gender}`, 20, 60);
//     doc.text(
//       `Date of Birth: ${new Date(member.dob).toLocaleDateString()}`,
//       20,
//       70
//     );
//     doc.text(`Caste: ${member.caste}`, 20, 80);

//     doc.save(`${member.fullName.replace(/\s+/g, "_")}_Details.pdf`);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-base-200 rounded-lg shadow-lg">
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold text-center sm:text-left">
//           View Family Members
//         </h2>
//         <button
//           className="btn btn-primary w-full sm:w-auto mt-2 sm:mt-0"
//           onClick={downloadAllPDF}
//         >
//           Download Family Details
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {family?.members.map((member: User) => (
//           <div
//             key={member._id}
//             className="card bg-accent text-accent-content shadow-lg p-4 rounded-lg"
//           >
//             <div className="flex flex-col items-center">
//               <img
//                 src={member.profileImage || "/default-profile.png"}
//                 alt={member.fullName}
//                 className="w-20 h-20 rounded-full mb-2"
//               />
//               <h3 className="text-lg font-semibold text-center">
//                 {member.fullName}
//               </h3>
//               <p className="text-sm">ID: {member.aadhar}</p>
//               <p className="text-sm">Mobile: {member.mobileNo}</p>
//               <p className="text-sm">Gender: {member.gender}</p>
//               <p className="text-sm">
//                 DOB: {new Date(member.dob).toLocaleDateString()}
//               </p>
//               <button
//                 className="btn btn-secondary mt-3 w-full sm:w-auto"
//                 onClick={() => setSelectedMember(member)}
//               >
//                 View Details
//               </button>
//               <button
//                 className="btn btn-primary mt-2 w-full sm:w-auto"
//                 onClick={() => downloadMemberPDF(member)}
//               >
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedMember && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
//             <button
//               className="btn btn-error btn-sm mb-4"
//               onClick={() => setSelectedMember(null)}
//             >
//               ✕ Close
//             </button>
//             <h3 className="text-2xl font-semibold text-center">
//               {selectedMember.fullName}'s Details
//             </h3>
//             <div className="text-center mt-4">
//               <img
//                 src={selectedMember.profileImage || "/default-profile.png"}
//                 alt={selectedMember.fullName}
//                 className="w-24 h-24 rounded-full mx-auto mb-3"
//               />
//               <p>
//                 <strong>Aadhar:</strong> {selectedMember.aadhar}
//               </p>
//               <p>
//                 <strong>Mobile:</strong> {selectedMember.mobileNo}
//               </p>
//               <p>
//                 <strong>Gender:</strong> {selectedMember.gender}
//               </p>
//               <p>
//                 <strong>DOB:</strong>{" "}
//                 {new Date(selectedMember.dob).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Caste:</strong> {selectedMember.caste}
//               </p>
//             </div>
//             {/* <button className="btn btn-secondary mt-4 w-full" onClick={() => downloadMemberPDF(selectedMember)}>
//               Download PDF
//             </button> */}
//             <button
//               className="btn btn-secondary mt-2 w-full"
//               onClick={() => setSelectedMember(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewFamily;
