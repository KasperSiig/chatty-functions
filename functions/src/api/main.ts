import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const main = express();

// Example route part 1
// const helloWorldRouter = require('./routes/helloWorldRouter');

const messageRouter = require('./routes/messageRouter');

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(cors({ origin: true }));

// Example route part 2
// main.use('helloWorld', helloWorldRouter);
main.use('/message', messageRouter);

exports.api = functions.https.onRequest(main);
