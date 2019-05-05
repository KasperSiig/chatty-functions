import * as admin from 'firebase-admin';
import * as UUID from 'uuid-v4';

/**
 * Uploads MeteData to Firestore
 * @param file File containing MetaData
 */
export function uploadMetaData(file) {
  return admin.firestore().doc('files/' + file.id).create({
    type: file.type,
    size: file.size,
    url: file.url
  });
}


/**
 * Uploads file to storage
 * @param file File to be uploaded
 */
export function uploadFile(file) {
  const buffer = Buffer.from(file.base64File, 'base64');

  return admin.storage().bucket('chatty-dev-e0191.appspot.com').file('uploads/' + file.id)
    .save(buffer, {
      gzip: true,
      metadata: {
        contentType: file.type,
        metadata: {
          firebaseStorageDownloadTokens: file.id
        }
      }
    });
}

/**
 * Generates UUID not existing in database already
 */
export async function generateUUID() {
  const uuid = UUID();
  let exists = true;
  while (exists) {
    let docRef = await admin.firestore().doc('files/' + uuid).get();
    if (!docRef.exists) return uuid;
  }
}
