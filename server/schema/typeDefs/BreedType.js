const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const BreedType = new GraphQLObjectType({
  name: "Breed",
  description: "Breeds of cats",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    vocalness: {
      type: new GraphQLNonNull(GraphQLString),
    },
    temperament: {
      type: new GraphQLList(GraphQLString),
    },
    colors: {
      type: new GraphQLList(GraphQLString),
    },
  },
});

module.exports = BreedType;
