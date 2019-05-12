import * as express from 'express';
import { createToken, createUser } from "../services/usersService";

const app = express();

app.post('/create', async (req, res) => {
  const user = req.body;
  const createdUser = await createUser(user);
  const token = await createToken(createdUser);
  res.send(token);
  // firebase.auth().createUserWithEmailAndPassword('test@tests.com', 'password').then();
});

export = app;