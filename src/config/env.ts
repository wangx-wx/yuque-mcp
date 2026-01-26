/**
 * Environment configuration for Yuque MCP Server
 */

export interface EnvConfig {
  authToken: string;
  baseUrl: string;
  bookSlug: string;
  groupLogin: string;
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
  return {
    authToken: getEnvVar('YUQUE_AUTH_TOKEN'),
    baseUrl: getEnvVar('YUQUE_BASE_URL'),
    groupLogin: getEnvVar('YUQUE_GROUP_LOGIN'),
    bookSlug: getEnvVar('YUQUE_BOOK_SLUG'),
  };
}