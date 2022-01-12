import { gql } from "@apollo/client";

export const GET_BREEDS = gql`
  query getBreeds {
    breeds {
      id
      name
      vocalness
      temperament
      colors
    }
  }
`;
