import { gql } from "@apollo/client";

export const GET_CATS = gql`
  query getCats {
    cats {
      edges {
        node {
          id
          name
          description
          age
          vaccinated
          breed {
             id
             name
          }
        }
      }
    }
  }
`;
