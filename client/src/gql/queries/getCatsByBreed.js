import { gql } from "@apollo/client";
import { CAT_FIELDS } from '../fragments/CatFields';

export const GET_CATS_BY_BREED = gql`
   ${CAT_FIELDS}
  query getCatsByBreed($breedId: ID) {
    cats(breedId: $breedId) {
       ...CatFields
    }
  }
`;
