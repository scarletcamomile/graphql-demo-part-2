import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.css";
import { App } from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
  makeVar,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { relayStylePagination } from "@apollo/client/utilities";

const httpLink = new HttpLink({ uri: "http://localhost:3001/graphql" });
const wsLink = new WebSocketLink({
  uri: "ws://localhost:3002/graphql",
  options: { reconnect: true },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    //console.log(definition);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const isCatsModeVar = makeVar(false);

export const cache = new InMemoryCache({
  typePolicies: {
    Breed: {
      keyFields: ["id", "name"],
      fields: {
        name: {
          read(name) {
            return name.toUpperCase();
          },
        },
      },
    },
    Cat: {
      keyFields: ["id", "breed", ["id"]],
    },
    Query: {
      fields: {
        cats: {
          edges: relayStylePagination(),
        },
/*         cats: {
          edges: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            }
          }
        }, */
        isCatsMode: {
          read() {
            return isCatsModeVar();
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  link: splitLink,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
