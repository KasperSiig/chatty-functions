import * as admin from 'firebase-admin';
import * as api from './api/main';

admin.initializeApp({
  serviceAccountId: 'firebase-adminsdk-i39i8@chatty-dev-e0191.iam.gserviceaccount.com'
});

module.exports = {
  ...api
};
