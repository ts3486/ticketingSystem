import React from "react";
import { Card, Typography } from "@mui/material";
import TicketItem from "./TicketItem";
import { Ticket } from "../types";

interface Props {
  username: string;
  tickets: Ticket[] | null | undefined;
}

const UserCard: React.FC<Props> = (props) => {
  return (
    <Card
      sx={{ width: "30%", padding: "2%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
      <Typography variant="h5" sx={{ marginBottom: "5%" }}>
        {props.username}
      </Typography>
      {props.tickets!.map((ticket) => {
        return <TicketItem name={ticket.name} id={ticket.id} key={ticket.id} />;
      })}
    </Card>
  );
};

export default UserCard;
