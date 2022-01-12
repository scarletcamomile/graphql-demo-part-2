import { gql } from "@apollo/client";

export const CAT_FIELDS = gql`
   fragment CatFields on CatConnectionType {
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
      pageInfo {
         hasNextPage
         startCursor
      }
   }
`;
