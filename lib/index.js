require("dotenv").config();

import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { studentServer } from "./schema";

mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// ADMIN APP
const studentApp = express();
studentApp.use(cors());
studentApp.use(express.json());
studentServer.applyMiddleware({
  app: studentApp,
  path: process.env.GRAPHQL_API_URL
});
const httpStudentServer = http.createServer(studentApp);
httpStudentServer.listen(process.env.PORT, () => {
  console.log(` 🚀  Student API listening at port ${process.env.PORT} ...`);
});
