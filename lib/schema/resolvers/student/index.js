import jsonResolver from "../common/jsonResolver";
import createStudent from "./create";
export default {
  ...jsonResolver,
  Query: { ...createStudent.Query },
  Mutation: { ...createStudent.Mutation }
};
