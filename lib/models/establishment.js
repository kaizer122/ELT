import { model, Schema } from "mongoose";
import { createdAt } from "./preSave";
import addressSchema from "./utilSchemas/address";

const establishmentSchema = new Schema({
  id: String,
  name: {
    type: String,
    required: true,
    index: true
  },
  image: {
    type: String,
    default: null
  },
  webSite: String,
  address: {
    type: addressSchema
  },
  createdAt: Number,
  updatedAt: Number
});

createdAt(establishmentSchema);

export default model("Establishment", establishmentSchema);
