const { ApolloServer, gql, PubSub }  = require('apollo-server');

//1 create graphql schema 
const typeDefs = gql`
    type Query {
        hello(name: String): String!
        user: User
    }

    type User {
        id: ID!
        username: String!
        firstLetterOfUsername: String!
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
        login(userInfo: UserInfo): String!
    }

    type Subscription {
        newUser: User!

    }
`; 

const NEW_USER = 'NEW_USER'

//2 resolvers
const resolvers = {
    Subscription: {
        newUser: {
            subscribe: (parent, args, {pubsub}) => pubsub.asyncIterator(NEW_USER)
        }
    },
    User: {
        firstLetterOfUsername: (parent) => parent.username[0]
        // username: (parent) => {
        //     console.log(parent)
        //     return parent.username // 'I am username'
        // }
    }, 
    Query: {
        hello: (parent, {name}, context, info) => `Hello Word! - ${name}`,
        user: () => ({
            id: 1,
            username: 'Pawel'
        })
    },
    Mutation: {
        // args === userInfo: UserInfo
        login: (parent, {userInfo: {username}}, context, info) => {
            console.log(context)
            return username
        },
        register: (parent, {userInfo: {username}}, {pubsub}) => {
            const user = {
                id: 1,
                username
            }

            pubsub.publish(NEW_USER, {
                newUser: user
            })

            return {
                errors: [
                    {
                        field: 'username',
                        message: 'bad'
                    }
                ],
                user
            }
        }
    }
}

// create instance of PubSub

const pubsub = new PubSub()

//3 create instance of apollo server
const server = new ApolloServer({ typeDefs, resolvers, context: (req, res) => ({req, res, pubsub}) })

//4 start server
server.listen().then( ({url}) => console.log(`server started at ${url}`) )
