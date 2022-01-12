import { gql } from "@apollo/client";

export const GET_BREED_NAMES = gql`
  query getBreeds {
    breeds {
      id
      name
    }
  }
`;
