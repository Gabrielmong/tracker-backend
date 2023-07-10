import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { startApolloServer } from './graphql';

const app = express();
const httpServer = createServer(app);
const apolloServer = await startApolloServer({ httpServer });

const { PORT } = process.env;
const version = process.env.npm_package_version;

app.use(
  '/graphql',
  cors<cors.CorsRequest>({
    origin: '*',
  }),
  bodyParser.json(),
  expressMiddleware(apolloServer),
);

app.use(routes);

const colors: { [key: string]: string } = {
  Green: '\x1b[32m',
  Magenta: '\x1b[35m',
  Yellow: '\x1b[33m',
  Cyan: '\x1b[36m',
  LightBlue: '\x1b[94m',
  Reset: '\x1b[0m',
};

httpServer.listen({ port: PORT || 4000 }, () => {
  console.clear();
  console.log(
    ` ${colors.Green}Tracker`,
    `${colors.LightBlue}v${version}${colors.Reset}`,
  );
  console.log(
    ` ${colors.Magenta}Server ready at http://localhost:${PORT}/graphql${colors.Reset}\n`,
    `${colors.Yellow}Subscriptions ready at ws://localhost:${PORT}/graphql${colors.Reset}\n`,
    `${colors.Cyan}HTTP Server ready at http://localhost:${PORT}${colors.Reset}`,
  );
});
