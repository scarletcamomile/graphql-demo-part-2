import { gql } from "@apollo/client";

export const ADD_MESSAGE = gql`
  mutation addCat($body: String, $author: String!) {
    addMessage(body: $body, author: $author) {
      id
      body
      author
    }
  }
`;
