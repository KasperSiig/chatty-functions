import * as admin from 'firebase-admin';
import { isMessage } from "../../helpers/messages";

/**
 * Adds message to firestore
 * @param req Incoming Request
 * @param res Outgoing Response
 */
module.exports.upload = (req, res) => {
  const message = req.body;

  if (!isMessage(message)) {
    res.status(500).send("Message could not be sent");
    return;
  }
  
  admin.firestore().collection('messages').add(message)
    .then(() => {
      res.send("Message was sucessfully sent");
    })
    .catch(() => {
      res.status(500).send("Message could not be sent");
    });
};
