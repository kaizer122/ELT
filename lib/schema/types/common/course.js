export default `
type Course {
  id: ID!
  name: String!
  image: String
  url: String
  author: Teacher
  createdAt: Float
  updatedAt: Float
} 
`;
