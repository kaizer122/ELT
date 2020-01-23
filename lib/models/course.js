import { model, Schema } from "mongoose";
import { createdAt } from "./preSave";

const courseSchema = new Schema({
  id: String,
  name: {
    type: String,
    unique: true,
    index: true
  },
  image: String,
  url: String,
  createdAt: Number,
  updatedAt: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  }
});

createdAt(courseSchema);

export default model("Course", courseSchema);
