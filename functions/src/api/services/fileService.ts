import * as admin from 'firebase-admin';
import { isFile } from "../../helpers/file";

/**
 * Instantiates upload process
 * @param req Incoming Request
 * @param res Outgoing Response
 */
module.exports.upload = async (req, res) => {
  const file = req.body;

  if (!isFile(file)) {
    res.status(500).send('File Could Not Be Uploaded');
    return;
  }

  // Upload Metadata to database and returns id
  const docRef = await uploadMetaData(file);
  file.id = docRef.id;

  await uploadFile(file);
  res.send(docRef.id);
};

/**
 * Uploads MeteData to Firestore
 * @param file File containing MetaData
 */
function uploadMetaData(file) {
  return admin.firestore().collection('files').add({
    type: file.type,
    size: file.size
  });
}

/**
 * Uploads file to storage
 * @param file File to be uploaded
 */
function uploadFile(file) {
  const buffer = Buffer.from(file.base64File, 'base64');
  return admin.storage().bucket().file('uploads/' + file.id)
    .save(buffer, {
      gzip: true,
      metadata: {contentType: file.type}
    });
}

