const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const main = express();

// Example route part 1
// const helloWorldRouter = require('./routes/helloWorldRouter');

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(cors({ origin: true }));

// Example route part 2
// main.use('helloWorld', helloWorldRouter);
main.get('/hello', (req, res) => {
  res.json({"message": "hello world"});
});

exports.api = functions.https.onRequest(main);
