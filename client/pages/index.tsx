import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Container } from "@mui/material";
import { useSendTicketMutation, useGetTicketsQuery } from "../graphql/graphql_gen/generated/graphql";
import UserCard from "../components/UserCard";
import TicketItem from "../components/TicketItem";
import { Ticket } from "../types";

interface Props {
  _tickets: Ticket[];
}

const Index: React.FC<Props> = () => {
  const [userId, setUser] = useState(0);
  const [ticketId, setTicket] = useState(0);
  const [update, setUpdate] = useState(false);
  const { data, error, loading } = useGetTicketsQuery();
  const [sendTicket] = useSendTicketMutation();

  //data.getTicketsがnullでない事を示しているのに"object maybe undefined”エラーを起こすので新しくオブジェクトを一旦作りました。
  const ticketList = [] as Ticket[];

  data?.getTickets?.forEach((ticket) => {
    const typedTicket: Ticket = {
      id: ticket.id,
      name: ticket.name,
      currentOwner: ticket.currentOwner ?? 0,
      previousOwner: ticket.previousOwner ?? 0,
    };

    ticketList.push(typedTicket);
  });

  const send = async () => {
    await sendTicket({
      variables: {
        to: userId,
        ticketId: ticketId,
      },
    });
  };

  useEffect(() => {
    if (update == true) {
      send();

      window.location.href = "/";
    }
  }, [update]);

  if (loading) {
    return <h1> loading...</h1>;
  }
  if (error) {
    return <h1>error</h1>;
  }

  if (data) {
    return (
      <Container sx={{ padding: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {ticketList.map((ticket) => {
            return <TicketItem name={ticket.name} id={ticket.id} key={ticket.id} />;
          })}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: 8 }}>
          <UserCard
            username={"user1"}
            tickets={ticketList.filter((ticket) => {
              return ticket.currentOwner === 1;
            })}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={{ height: 50 }}
              variant="filled"
              placeholder="enter ticketId..."
              onChange={(e: any) => setTicket(parseInt(e.target.value))}></TextField>
            <TextField
              sx={{ height: 50 }}
              variant="filled"
              placeholder="enter userId..."
              onChange={(e: any) => setUser(parseInt(e.target.value))}></TextField>
            <Button sx={{ height: "30%" }} variant="contained" onClick={() => setUpdate(true)}>
              Send
            </Button>
          </Box>
          <UserCard
            username={"user2"}
            tickets={ticketList.filter((ticket) => {
              return ticket.currentOwner === 2;
            })}
          />
        </Box>
      </Container>
    );
  } else {
    return null;
  }
};

export default Index;

//getStaticProps:
// export const getStaticProps = async () => {
//   const { error: ticketError, data: ticketData } = await client.query({
//     query: GET_TICKETS,
//     errorPolicy: "all",
//   });

//   const tickets = ticketData.getTickets;

//   return {
//     props: {
//       _tickets: tickets,
//     },
//   };
// };
