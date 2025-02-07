import { transactions } from "../dummyData/data.js";

const transactionResolver = {
    Query: {
        transactions: () => {
            return transactions
        },
        transaction: (parent, args, context, info) => {
            return transactions.find((t) => t._id === args.transactionId)
        }
    },
    Mutation: {}
}

export default transactionResolver;