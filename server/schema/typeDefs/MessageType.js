const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require("graphql");

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

module.exports = MessageType;
