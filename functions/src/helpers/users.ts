/**
 * Check whether or not user is correctly formatted
 * @param user User to be checked
 */
export function isUser(user) {
  return (user.username !== undefined &&
          user.avatarUrl !== undefined);
}
