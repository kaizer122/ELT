export default `
  type Teacher {
    id: ID!
    profile: Profile!
    mobile: String!
    email: String!
    emailVerified: Boolean!
    address: Address
    status: String!
    createdAt: Float!
    updatedAt: Float
  }
`;
