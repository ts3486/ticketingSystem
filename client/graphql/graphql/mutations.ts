import { gql } from "@apollo/client";

export const SEND_TICKET = gql`
  mutation sendTicket($to: Float!, $ticketId: Float!) {
    sendTicket(to: $to, ticketId: $ticketId) {
      ticket {
        id
        name
        currentOwner
        previousOwner
      }
      transferLog {
        id
        currentOwner
        previousOwner
        timeStamp
      }
    }
  }
`;
