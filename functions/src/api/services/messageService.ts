import * as admin from 'firebase-admin';

/**
 * Adds message to firestore
 * @param message
 */
module.exports.upload = (req, res) => {
  const message = req.body;
  if (message.content === undefined ||
      message.sender === undefined ||
      message.time === undefined) res.status(500).send("Message could not be sent");
  admin.firestore().collection('messages').add(message).then().catch();
  res.send("Message was sucessfully sent");
};
