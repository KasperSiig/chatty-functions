import * as admin from "firebase-admin";

/**
 * Creates users with different claims
 * @param user User to be created
 */
export function createUser(user) {
  return admin.auth().createUser({
    email: user.email,
    emailVerified: false,
    password: user.password,
    displayName: user.userName,
    photoURL: user.avatarURL,
    disabled: false
  });
}
