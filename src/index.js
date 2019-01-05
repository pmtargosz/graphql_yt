const { ApolloServer, gql}  = require('apollo-server');

//1 create graphql schema 
const typeDefs = gql`
    type Query {
        hello: String!
        user: User
    }

    type User {
        id: ID!
        username: String!
    }

    type Error {
        field: String!
        message: String!
    }

    type RegisterResponse {
        errors: [Error!]!
        user: User
    }

    input UserInfo {
        username: String!
        password: String!
        age: Int
    }

    type Mutation {
        register(userInfo: UserInfo): RegisterResponse!
        login(userInfo: UserInfo): Boolean!
    }
`; 

//2 resolvers
const resolvers = {
    Query: {
        hello: () => 'Hello Word!',
        user: () => ({
            id: 1,
            username: 'Pawel'
        })
    },
    Mutation: {
        login: () => true,
        register: () => ({
            errors: [
                {
                    field: 'username',
                    message: 'bad'
                }
            ],
            user: {
                id: 1,
                username: 'Pawel'
            }
        })
    }
}

//3 create instance of apollo server
const server = new ApolloServer({ typeDefs, resolvers })

//4 start server
server.listen().then( ({url}) => console.log(`server started at ${url}`) )
