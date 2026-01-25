/**
 * MCP Server Configuration
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerSearchTool } from './tools/search.js';
import { registerGetDocTool } from './tools/get-doc.js';

/**
 * Create and configure MCP server
 */
export function createMCPServer(): McpServer {
  const server = new McpServer({
    name: 'yuque-mcp',
    version: '1.0.0',
  });

  // Register tools
  registerSearchTool(server);
  registerGetDocTool(server);

  return server;
}
