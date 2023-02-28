import chalk from 'chalk';
import cors from 'cors';
import express, { json } from 'express';
import signinRouter from './routers/signup.js';
import tweetsRouter from './routers/tweets.js';

const app = express();
app
  .use(cors())
  .use(json())
  .use(signinRouter)
  .use(tweetsRouter);

app.listen(4000, () => {
  console.log(chalk.bold.blue('Servidor funfando de boas!!!....'));
});
