import { gql } from "@apollo/client";

export const MESSAGE_SUB = gql`
   subscription {
      newMessage {
         id
         author
         body
      }
   }
`;
