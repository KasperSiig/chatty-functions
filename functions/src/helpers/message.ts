/**
 * Checks whether or not message is correctly formatted
 * @param message Message to check
 */
module.exports.isMessage = (message) => {
  // Check is message is correct
  const isMessage = (message.content !== undefined ||
    message.sender !== undefined ||
    message.time !== undefined);

  // Return false is message is not correct
  if (!isMessage) return false;

  // Return whether or not sender is correctly formatted
  return (message.sender.userName !== undefined ||
          message.sender.avatarUrl !== undefined);
};