const { ApolloServer, gql}  = require('apollo-server');

//1 create graphql schema 
const typeDefs = gql`

    type Query {
        hello: String!
    }
`; 

//2 resolvers
const resolvers = {
    Query: {
        hello: () => 'hello word'
    }
}

//3 create instance of apollo server
const server = new ApolloServer({ typeDefs, resolvers })

//4 start server
server.listen().then( ({url}) => console.log(`server started at ${url}`) )
