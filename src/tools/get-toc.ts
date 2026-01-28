/**
 * MCP Tool: Get Yuque knowledge base table of contents
 */

import { z } from 'zod';
import { YuqueApiClient } from '../api/yuque-api.js';
import { ResponseTransformer, type TocToolResponse } from '../models/responses.js';

// Tool schema (no parameters needed, book_id from env)
export const getTocSchema = z.object({});

// Tool registration function
export function registerGetTocTool(server: any) {
  server.tool(
    'get_toc',
    'Get the table of contents (directory structure) of the Yuque knowledge base. Use this when user wants to browse or navigate the folder structure. Returns a flat list of all folders and documents with uuid and title.',
    getTocSchema.shape,
    async () => {
      try {
        const client = new YuqueApiClient();
        const apiResponse = await client.getToc();

        const response: TocToolResponse = ResponseTransformer.transformToc(apiResponse.data);

        return {
          content: [{
            type: 'resource',
            resource: {
              uri: 'yuque://toc',
              mimeType: 'application/json',
              text: JSON.stringify(response),
            },
          }],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ error: message }, null, 2),
          }],
          isError: true,
        };
      }
    }
  );
}
