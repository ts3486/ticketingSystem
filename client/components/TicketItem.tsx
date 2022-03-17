import React, { useState } from "react";
import { Card, Typography, Button } from "@mui/material";
import { useBuyTicketMutation } from "../graphql/graphql_gen/generated/graphql";

interface Props {
  name?: string;
  id?: number;
}

const TicketItem = (props: Props) => {
  const [userId, setUser] = useState(1);
  const [ticketId, setTicket] = useState(props.id ?? 0);
  const [buyTicket] = useBuyTicketMutation();

  const buy = async () => {
    buyTicket({
      variables: {
        userId: userId,
        ticketId: ticketId,
      },
    });
  };

  return (
    <Card
      sx={{
        margin: "2%",
        padding: "5%",
        backgroundColor: "pink",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}>
      <Typography variant="h5">{props.name}</Typography>
      <Typography>ID: {props.id}</Typography>

      <Button onClick={() => buy()}>Buy</Button>
    </Card>
  );
};

export default TicketItem;
