import { Schema } from "mongoose";
import { DEFAULT_CITY, DEFAULT_COUNTRY } from "../../helpers/constants";

const addressSchema = new Schema(
  {
    country: {
      type: String,
      default: DEFAULT_COUNTRY,
      index: true
    },
    city: {
      type: String,
      default: DEFAULT_CITY,
      index: true
    },
    address: {
      type: String,
      index: true,
      required: false
    }
  },
  {
    id: false,
    _id: false
  }
);

addressSchema.pre("save", () => {
  this.country =
    this.country.charAt(0).toUpperCase() + this.country.slice(1).toLowerCase();
  this.city =
    this.city.charAt(0).toUpperCase() + this.city.slice(1).toLowerCase();
});

export default addressSchema;
