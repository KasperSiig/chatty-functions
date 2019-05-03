import * as admin from 'firebase-admin';

module.exports.upload = async (req, res) => {
  const file = req.body;
  const docRef = await uploadMetaData(file);
  file.id = docRef.id;
  await uploadFile(file);
  res.send('ok');
};

function uploadMetaData(file) {
  return admin.firestore().collection('files').add({
    type: file.type,
    size: file.size
  });
}

function uploadFile(file) {
  const buffer = new Buffer(file.base64File, 'base64');
  return admin.storage().bucket().file('uploads/' + file.id)
    .save(buffer, {
      gzip: true,
      metadata: {contentType: file.type}
    });
}

function sendMessage(file) {
  return admin.firestore().collection('messages/')
    .add(file.)
}
