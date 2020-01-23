import { model, Schema } from "mongoose";
import { createdAt, hashPassword } from "../preSave";
import addressSchema from "../utilSchemas/address";
import profileSchema from "../utilSchemas/profile";

const studentSchema = new Schema({
  id: String,
  profile: {
    type: profileSchema,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  address: addressSchema,
  createdAt: Number,
  updatedAt: Number
});

createdAt(studentSchema);
hashPassword(studentSchema);

export default model("Student", studentSchema);
