import { isUser } from './users';

/**
 * Checks whether or not message is correctly formatted
 * @param message Message to check
 */
export function isMessage(message) {
  // Check is message is correct
  const isMessageVar = (message.content !== undefined &&
    message.sender !== undefined &&
    message.time !== undefined);

  // Return false is message is not correct
  if (!isMessageVar) return false;

  // Return whether or not sender is correctly formatted
  return isUser(message.sender);
}