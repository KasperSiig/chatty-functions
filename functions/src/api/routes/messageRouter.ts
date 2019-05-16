import * as express from 'express';
import { isMessage } from "../../helpers/messages";
import { sendMessage } from "../services/messageService";

const app = express();

/**
 * Adds message to firestore collection
 */
app.post('', async (req, res) => {
  const message = req.body;

  if (!isMessage(message)) {
    res.status(500).send({message: 'Message could not be sent'});
    return;
  }

  sendMessage(message)
    .then(() => {
      console.log('Message was sent by ' + message.sender.userName);
      res.send({message: 'Message was sucessfully sent'});
    })
    .catch((e) => {
      console.log(e.toString());
      res.status(500).send({message: 'Message could not be sent'});
    })
});

export = app;