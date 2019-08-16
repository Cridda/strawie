import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { redis } from './redis';
import { MyContext } from './types/MyContext';

const main = async () => {
    // create connection with the db
    await createConnection();

    // build sdl schema from resolvers
    const schema = await buildSchema({
        resolvers: [__dirname + '/modules/**/*.rsv.ts'],
        authChecker: ({ context: { req } }: { context: MyContext }) => {
            return !!req.session.userId;
        },
    });

    // create the server
    const app = express();
    const server = new ApolloServer({ schema, context: ({ req }) => ({ req }) });

    // middleware
    const RedisStore = connectRedis(session);

    app.use(
        cors({
            credentials: true,
            origin: 'http://localhost:3000',
        })
    );
    app.use(
        session({
            store: new RedisStore({
                client: redis as any,
            }),
            name: 'qid',
            secret: 'ajfjefaknfeannea',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                // secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 365 * 7, // 7 days
            },
        })
    );
    server.applyMiddleware({ app });

    // start the server
    app.listen(4000, () => {
        console.log('🚀 Server started on http://localhost:4000/graphql');
    });
};

main();
