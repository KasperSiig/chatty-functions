import * as admin from 'firebase-admin';
import * as api from './api/main';

const svc = require('../serviceaccount.json');
const config = JSON.parse(process.env.FIREBASE_CONFIG as string);

admin.initializeApp({
  credential: admin.credential.cert(svc),
  databaseURL: config.databaseURL
});

module.exports = {
  ...api
};
