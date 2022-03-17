import { gql } from "@apollo/client";

export const GET_TICKETS = gql`
  {
    getTickets {
      id
      name
      currentOwner
      previousOwner
    }
  }
`;
