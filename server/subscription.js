const gql = require("graphql-tag");
const { PubSub } = require("graphql-subscriptions");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const pubsub = new PubSub();

const typeDefs = gql`
  type Query {
    messages: [Message]
  }
  type Message {
    id: ID
    author: String
    body: String
  }
  type Subscription {
    newMessage: Message
  }
`;

const resolvers = {
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator("newMessage"),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

exports.pubsub = pubsub;
exports.schema = schema;
