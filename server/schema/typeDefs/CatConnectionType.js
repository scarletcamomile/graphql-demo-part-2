const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLBoolean,
   GraphQLList,
   GraphQLID
 } = require("graphql");
 
 const CatType = require("./CatType");

 const PageInfo = new GraphQLObjectType({
   name: 'PageInfo',
   fields: {
       hasNextPage: { type: GraphQLBoolean },
       startCursor: { type: GraphQLID }
   }
 });
 
 const CatEdge = new GraphQLObjectType({
   name: 'CatEdge',
   fields: {
       node: { type: CatType },
       cursor: { type: GraphQLString },
   }
 });
 
 const CatConnection = new GraphQLObjectType({
   name: 'CatConnectionType',
   fields: {
       edges: { type: new GraphQLList(CatEdge) },
       pageInfo: { type: PageInfo }
   }
 });
 
 module.exports = CatConnection;
 