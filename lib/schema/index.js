import { ApolloServer, gql } from "apollo-server-express";
import { studentResolvers } from "./resolvers";
import { commonTypes, studentTypes } from "./types";

const temp = Object.values({ ...commonTypes, ...studentTypes }).join("\n");
const studentTypeDefs = gql`
  ${temp}
`;

const studentServer = new ApolloServer({
  typeDefs: studentTypeDefs,
  resolvers: studentResolvers
});

export { studentServer };
