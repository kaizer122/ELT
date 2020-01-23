export default `
  type Student {
    id: ID!
    profile: Profile!
    mobile: String!
    email: String!
    emailVerified: Boolean!
    address: Address
    createdAt: Float!
    updatedAt: Float
  }

  input StudentInput {
    profile: ProfileInput
    mobile: String!
    email: String!
    address: AddressInput
    password: String
  }

`;
