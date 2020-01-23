export default `
type Profile {
  firstName: String!
  lastName: String!
  photoUrl: String
  birthdate: Float
  establishment: Establishment
} 
input ProfileInput {
  firstName: String!
  lastName: String!
  photoUrl: String
  birthdate: Float
}
`;
