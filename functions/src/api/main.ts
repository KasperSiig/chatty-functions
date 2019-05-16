import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const main = express();

const messageRouter = require('./routes/messageRouter');
const filesRouter = require('./routes/filesRouter');
const usersRouter = require('./routes/usersRouter');
const allowedMethods = ['POST', 'OPTIONS'];

main.use((req, res, next) => {
  if (!allowedMethods.includes(req.method))
    return res.status(405).send('Method Not Allowed');
  else
    next();

  return;
});

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(cors({ origin: true }));

main.use('/message', messageRouter);
main.use('/files', filesRouter);
main.use('/users', usersRouter);

exports.api = functions.https.onRequest(main);
