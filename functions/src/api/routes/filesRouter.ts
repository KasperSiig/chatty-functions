import * as express from 'express';
const { upload } = require('../services/fileService');

const app = express();

app.post('', upload);

export = app