import * as admin from "firebase-admin";

export function createUser(user) {
  console.log('creating user');
  return admin.auth().createUser({
    email: user.email,
    emailVerified: false,
    password: user.password,
    displayName: user.userName,
    photoURL: user.avatarURL,
    disabled: false
  });
}

export function createToken(user) {
  const claims = {
    userName: user.userName,
    avatarURL: user.avatarURL
  };
  return admin.auth().createCustomToken(user.uid, claims);
}