/**
 * MCP Server Configuration
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerCreateDocTool } from './tools/create-doc.js';
import { registerGetDocTool } from './tools/get-doc.js';
import { registerGetTocTool } from './tools/get-toc.js';
import { registerSearchTool } from './tools/search.js';
import { registerUpdateDocTool } from './tools/update-doc.js';

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
  registerGetTocTool(server);
  registerCreateDocTool(server);
  registerUpdateDocTool(server);

  return server;
}
