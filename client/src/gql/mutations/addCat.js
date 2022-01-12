import { gql } from "@apollo/client";

export const ADD_CAT = gql`
  mutation addCat(
    $name: String!
    $description: String!
    $age: Int!
    $breedId: ID!
    $vaccinated: Boolean!
  ) {
    addCat(
      name: $name
      description: $description
      age: $age
      breedId: $breedId
      vaccinated: $vaccinated
    ) {
      id
      name
      description
      age
      breedId
      vaccinated
      breed {
        id
        name
      }
    }
  }
`;
