import express from "express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { TicketResolver } from "./resolvers/TicketResolver";

const cors = require("cors");

(async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  //creating a db connection with typeorm
  await createConnection()
    .then(() => {
      console.log("db connected");
    })
    .catch((error) => {
      console.log(error, "db connection error");
    });

  const schema = await buildSchema({
    resolvers: [TicketResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    // playground: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(5000, () => {
    console.log("Server Running at 5000");
  });
})().catch((error) => {
  console.log(error, "error");
});
