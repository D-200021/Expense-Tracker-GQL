import { users } from "../dummyData/data.js"

const userResolver = {
    Query: {
        users: () => {
            return users
        },
        authUser: () => {

        },
        user: (parent, args, context, info) => {
            return users.find((user) => user._id === args.userId)
        }
    },
    Mutation: {

    }
}

export default userResolver;