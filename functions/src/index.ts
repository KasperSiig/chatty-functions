import * as admin from 'firebase-admin';
import * as api from './api/main';

admin.initializeApp();

module.exports = {
  ...api
};
