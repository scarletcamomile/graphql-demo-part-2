const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const { pubsub } = require('../subscription');

const catsData = require("../mock_data/cats");
const breedsData = require("../mock_data/breeds");
const messagesData = require("../mock_data/messages.json");

const CatConnection = require("./typeDefs/CatConnectionType");
const CatType = require("./typeDefs/CatType");
const BreedType = require("./typeDefs/BreedType");
const MessageType = require("./typeDefs/MessageType");

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "This is the root query",
  fields: {
    cats: {
      type: CatConnection,
      args: {
        breedId: { type: GraphQLID },
        limit: { type: GraphQLInt },
        cursor: { type: GraphQLID },
      },
      resolve: (_, { breedId, limit, cursor }) => {
        if (breedId) {
          console.log('breedId', breedId);
          const hasNextPage = null;
          const startCursor = null;
          const edges = catsData
            .filter((cat) => cat.breedId === breedId)
            .map((node) => ({
              node,
              cursor: node.id,
            }));
          return {
            totalCount: catsData.length,
            edges,
            pageInfo: {
              hasNextPage,
              startCursor,
            },
          };
        }
        if (limit) {
          const nodeIndex = cursor ? catsData.findIndex((datum) => datum.id === cursor) : 0;
          const slicedData = catsData.slice(nodeIndex, nodeIndex + limit);
          const edges = slicedData.map((node) => ({
            node,
            cursor: node.id,
          }));
          let hasNextPage =
            edges.length > 0 ? catsData.length >= nodeIndex + 1 + limit : null;
          let startCursor;
          if (hasNextPage) {
            startCursor = catsData[nodeIndex + edges.length]?.id;
          } else {
            startCursor = null;
          }
          return {
            totalCount: catsData.length,
            edges,
            pageInfo: {
              hasNextPage,
              startCursor,
            },
          };
        }
        const edges = catsData.map((node) => ({
          node,
          cursor: node.id,
        }));
        return {
          totalCount: catsData.length,
          edges,
          pageInfo: {
            hasNextPage: null,
            startCursor: null,
          },
        };
      },
    },
    cat: {
      type: CatType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (_, { id }) => catsData.find((cat) => cat.id == id),
    },
    breeds: {
      type: GraphQLList(BreedType),
      resolve: () => breedsData,
    },
    messages: {
      type: GraphQLList(MessageType),
      resolve: () => messagesData
    }
  },
});

const rootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addCat: {
      type: CatType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        vaccinated: { type: new GraphQLNonNull(GraphQLBoolean) },
        breedId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, { name, description, age, vaccinated, breedId }) => {
        const newCat = {
          id: uuidv4(),
          name,
          description,
          age,
          vaccinated,
          breedId,
        };
        catsData.push(newCat);
        fs.readFile(
          "mock_data/cats.json",
          "utf8",
          function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
              catsArr = JSON.parse(data);
              catsArr.push(newCat);
              json = JSON.stringify(catsArr);
              fs.writeFile("mock_data/cats.json", json, "utf8", () => newCat);
            }
          }
        );
        return newCat;
      },
    },
    addBreed: {
      type: BreedType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        vocalness: { type: new GraphQLNonNull(GraphQLString) },
        temperament: { type: new GraphQLList(GraphQLString) },
        colors: { type: new GraphQLList(GraphQLString) },
      },
      resolve: (_, { name, vocalness, temperament, colors }) => {
        const newBreed = {
          id: uuidv4(),
          name,
          vocalness,
          temperament,
          colors,
        };
        breedsData.push(newBreed);
        fs.readFile(
          "mock_data/breeds.json",
          "utf8",
          function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
              breedsArr = JSON.parse(data);
              breedsArr.push(newBreed);
              json = JSON.stringify(breedsArr);
              fs.writeFile("mock_data/breeds.json", json, "utf8", () => newBreed);
            }
          }
        );
        return newBreed;
      },
    },
    addMessage: {
      type: MessageType,
      args: {
        body: { type: GraphQLString },
        author: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_, { body, author }) => {
        const newMessage = {
          id: uuidv4(),
          body,
          author
        };
        messagesData.push(newMessage);
        fs.readFile(
          "mock_data/messages.json",
          "utf8",
          function readFileCallback(err, data) {
            if (err) {
              console.log(err);
            } else {
              messageArr = JSON.parse(data);
              messageArr.push(newMessage);
              json = JSON.stringify(messageArr);
              fs.writeFile("mock_data/messages.json", json, "utf8", () => newMessage);
            }
          }
        );
        pubsub.publish('newMessage', { newMessage: newMessage })
        return newMessage;
      },
    }
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
