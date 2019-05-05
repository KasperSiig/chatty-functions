import * as admin from 'firebase-admin';
import * as api from './api/main';

const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatty-dev-e0191.firebaseio.com"
});

module.exports = {
  ...api
};
