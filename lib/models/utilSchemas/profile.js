import { Schema } from "mongoose";
import { upperCasedNames } from "../preSave";

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      index: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      index: true
    },
    establishment: {
      type: Schema.Types.ObjectId,
      ref: "Establishment",
      required: false // TODO
    },
    photoUrl: String,
    birthdate: Number
  },
  {
    id: false,
    _id: false
  }
);
upperCasedNames(profileSchema);

export default profileSchema;
