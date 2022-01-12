import { gql } from "@apollo/client";

export const ADD_BREED = gql`
  mutation addBreed(
    $name: String!
    $vocalness: String!
    $temperament: [String]
    $colors: [String]
  ) {
    addBreed(
      name: $name
      vocalness: $vocalness
      temperament: $temperament
      colors: $colors
    ) {
      id
      name
      vocalness
      temperament
      colors
    }
  }
`;
