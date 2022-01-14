import { gql } from "@apollo/client";
import { CAT_FIELDS } from '../fragments/CatFields';

export const GET_CATS = gql`
 ${CAT_FIELDS}
  query getCats ($limit: Int, $cursor: ID) {
    cats (limit: $limit, cursor: $cursor) {
      ...CatFields
    }
  }
`;
