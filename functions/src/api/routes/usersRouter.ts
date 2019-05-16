import * as express from 'express';
import { createUser } from "../services/usersService";

const app = express();

// POST
/**
 * Creates user
 */
app.post('/create', async (req, res) => {
  const user = req.body;
  try {
    await createUser(user);
  } catch (e) {
    console.log(e.toString());
    res.status(500).send('User could not be created');
    return;
  }
  res.send({message: 'User Successfully Created'});
});

export = app;