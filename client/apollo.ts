import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path, locations }: any) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      console.log(locations);
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:5000/graphql", credentials: "include" })]);

export const client = new ApolloClient({
  cache: new InMemoryCache({}),
  credentials: "include",
  link: link,
});
