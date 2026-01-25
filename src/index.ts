/**
 * Yuque MCP Server - Entry Point
 * Model Context Protocol server for Yuque (语雀) document search and retrieval
 */

import { createMCPServer } from './server.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

/**
 * Main entry point
 */
async function main(): Promise<void> {
  const server = createMCPServer();

  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Server is now listening via stdio
  // Process will stay alive until stdio is closed
}

// Start the server
main().catch((error) => {
  console.error('Failed to start Yuque MCP server:', error);
  process.exit(1);
});
