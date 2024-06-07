// Global declarations
const usernames: string[] = [];
const usedNames: Set<string> = new Set();

/**
 * Generate a unique username based on an initial string.
 * @param initialString - The base string for the username.
 * @returns A unique username.
 */
export function generateUniqueUsername(initialString: string): string {
  let username: string;
  let counter = 1;

  // Generate a unique username
  do {
    username = `${initialString}${counter}`;
    counter++;
  } while (usedNames.has(username));

  // Add the unique username to the global collections
  usernames.push(username);
  usedNames.add(username);

  return username;
}
