const { createServer } = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const schema = require("./schema/index");
const { schema: subscriptionSchema } = require('./subscription');
const PORT = 3001;
const WS_PORT = 3002;

app.use(cors());
app.use(express.json());

const ws = createServer((req, res) => {
  res.writeHead(400);
  res.end()
});

ws.listen(WS_PORT, () => console.log('Websocket server has started'));

const subscriptionServer = SubscriptionServer.create({
  schema: subscriptionSchema,
  execute,
  subscribe,
  onConnect: () => console.log('Client connected')
}, { server: ws, path: '/graphql' });

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log('Server started...');
});
