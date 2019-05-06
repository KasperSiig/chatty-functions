import { isUser } from './users';

/**
 * Check whether or not file is structured correctly
 * @param file File To Be Checked
 */
export function isFile(file) {
  // Determines if file is correctly formatted
  const isFileVar = (file.type !== undefined &&
    file.size !== undefined &&
    file.user !== undefined &&
    file.base64File !== undefined);

  if (!isFileVar) return false;

  // If file is correctly formatted, return if user is correct
  return isUser(file.user);
}