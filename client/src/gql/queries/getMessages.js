import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query getMessages {
    messages {
      id
      body
      author
    }
    isCatsMode @client
  }
`;
