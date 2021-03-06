import * as express from 'express';
import { generateUUID, uploadFile, uploadMetaData } from "../services/fileService";
import { isFile } from "../../helpers/file";
import { sendMessage } from "../services/messageService";

const app = express();

const config = JSON.parse(process.env.FIREBASE_CONFIG as string);

// POST
/**
 * Uploads file and sends it as a message
 */
app.post('', async (req, res) => {
  // Gives file a uuid(Universal Unique ID) and a download url
  const file = req.body;
  file.id = await generateUUID();
  file.url = "https://firebasestorage.googleapis.com/v0/b/" + config.storageBucket + "/o/uploads%2F" + file.id + "?alt=media&token=" + file.id;

  if (!isFile(file) || !file.type.startsWith('image/')) {
    res.status(500).send({message: 'File Could Not Be Uploaded'});
    return;
  }

  const message = {
    content: file.url,
    time: Date.now(),
    sender: file.user,
    isFile: true
  };

  await uploadFile(file);

  Promise.all([uploadMetaData(file), sendMessage(message)])
    .then(() => {
      res.send({message: 'File Succesfully Uploaded'});
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({message: 'File Could Not Be Uploaded'});
    });
});

export = app