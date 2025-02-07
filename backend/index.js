import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import MergeTypeDefs from "./typeDefs/index.js";
import MergeResolvers from "./resolvers/index.js";
import connectDB from './db/connectDB.js';

dotenv.config();

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: MergeTypeDefs,
    resolvers: MergeResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({ req }),
    }),
);

await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve),
);

await connectDB();

console.log("Server is running");