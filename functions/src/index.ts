const admin = require('firebase-admin');
const api = require('./api/main');

admin.initializeApp();

module.exports = {
  ...api
};
