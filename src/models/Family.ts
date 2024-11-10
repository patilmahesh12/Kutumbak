import mongoose, { Schema } from "mongoose";

const FamilySchema: Schema = new Schema({
  familyName: {
    type: String,
    required: true,
  },
  community: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
});

const Family = mongoose.models.Family || mongoose.model("Family", FamilySchema);

export default Family;
