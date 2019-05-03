import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const main = express();

const messageRouter = require('./routes/messageRouter');
const filesRouter = require('./routes/filesRouter');

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(cors({ origin: true }));

main.use('/message', messageRouter);
main.use('/files', filesRouter);

exports.api = functions.https.onRequest(main);
