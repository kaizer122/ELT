import { model, Schema } from "mongoose";
import URLSlugs from "mongoose-url-slugs";
import { createdAt, hashPassword } from "../preSave";
import addressSchema from "../utilSchemas/address";
import profileSchema from "../utilSchemas/profile";
const teacherSchema = new Schema({
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

createdAt(teacherSchema);
hashPassword(teacherSchema);
teacherSchema.plugin(URLSlugs("profile.firstName profile.lastName"));

export default model("Teacher", teacherSchema);
