export default `
scalar JSON

type Exercice {
  id: ID!
  name: String!
  image: String!
  form: JSON
  formAnswers: JSON
  createdAt: Float
  updatedAt: Float
} 
`;
