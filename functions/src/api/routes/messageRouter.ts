import * as express from 'express';
const { upload } = require('../services/messageService');

const app = express();

/**
 * Forwards 'Send Message' Request to the Service
 */
app.post('', upload);

export = app;