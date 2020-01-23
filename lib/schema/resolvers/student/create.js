import StudentModel from "../../../models/actors/student";
export default {
  Query: {
    me: () => "salem"
  },
  Mutation: {
    createStudent: (_, { student }) => {
      // studentValidation(student);
      console.log(student);
      const newStudent = new StudentModel(student);
      return new Promise((resolve, reject) => {
        return newStudent.save((error, createdStudent) => {
          if (error) reject(error);
          return resolve(createdStudent);
        });
      });
    },
    getExercice() {
      return { zz: "zz" };
    }
  }
};
