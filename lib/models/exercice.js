import { model, Schema } from "mongoose";
import { createdAt } from "./preSave";

const exerciceSchema = new Schema({
  id: String,
  name: {
    type: String,
    unique: true,
    index: true
  },
  image: String,
  form: Object,
  formAnswers: Object,
  createdAt: Number,
  updatedAt: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  }
});

createdAt(exerciceSchema);

export default model("Exercice", exerciceSchema);
