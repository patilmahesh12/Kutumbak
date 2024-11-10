export interface User {
  _id: string;
  fullName: string;
  dob: string;
  gender: string;
  caste: string;
  aadhar: string;
  mobileNo: string;
  role: "FamilyHead" | "FamilyMember";
  profileImage: string;
  familyId: string;
  createdAt: Date;
  updatedAt: Date;
}
