import { model, Schema } from "mongoose";
import { ACTIVE, ADMIN, adminRoles, INACTIVE } from "../../helpers/constants";
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
  status: {
    type: String,
    enum: [ACTIVE, INACTIVE],
    default: ACTIVE
  },
  role: {
    type: String,
    enum: adminRoles,
    default: ADMIN
  },
  createdAt: Number,
  updatedAt: Number
});

createdAt(studentSchema);
hashPassword(studentSchema);

export default model("Student", studentSchema);
