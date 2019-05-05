import * as admin from 'firebase-admin';

/**
 * Adds message to firestore colletion 'messages'
 * @param message Message to be sent
 */
export function sendMessage(message) {
  return admin.firestore().collection('messages').add(message);
}

