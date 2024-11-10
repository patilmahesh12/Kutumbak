import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  caste: {
    type: String,
    required: true,
  },
  aadhar: {
    type: String,
    unique: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
