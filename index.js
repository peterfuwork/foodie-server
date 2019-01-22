const express = require('express');
const expressGraphQL = require('express-graphql');
const graphQL = require('./graphQL/schema');


const app = express();

app.use('/graphql', expressGraphQL({
    schema: graphQL,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening');
});