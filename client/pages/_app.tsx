import App from "next/app";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo";

export default class TicketSystem extends App {
  render() {
    const { Component, pageProps }: AppProps = this.props;

    return (
      <ApolloProvider client={client}>
        <Component {...pageProps} />;
      </ApolloProvider>
    );
  }
}
