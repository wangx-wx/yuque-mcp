/**
 * Environment configuration for Yuque MCP Server
 */

export interface EnvConfig {
  authToken: string;
  baseUrl: string;
  bookId?: number;
}

/**
 * Get environment variable with error handling
 */
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Load and validate environment configuration
 */
export function loadEnvConfig(): EnvConfig {
  const bookIdStr = process.env.YUQUE_BOOK_ID;
  return {
    authToken: getEnvVar('YUQUE_AUTH_TOKEN'),
    baseUrl: process.env.YUQUE_BASE_URL || 'https://api.yuque.com',
    bookId: bookIdStr ? parseInt(bookIdStr, 10) : undefined,
  };
}
