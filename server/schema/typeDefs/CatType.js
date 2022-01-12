const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} = require("graphql");

const BreedType = require("./BreedType");
const breedsData = require("../../mock_data/breeds.json");

const CatType = new GraphQLObjectType({
  name: "Cat",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    vaccinated: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    breedId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    breed: {
      type: BreedType,
      resolve(parentValue) {
        return breedsData.find((breed) => breed.id === parentValue.breedId);
      },
    },
  },
});

module.exports = CatType;
