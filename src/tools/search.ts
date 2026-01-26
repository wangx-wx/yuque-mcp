/**
 * MCP Tool: Search Yuque documents
 */

import { z } from 'zod';
import { YuqueApiClient } from '../api/yuque-api.js';
import { ResponseTransformer, type SearchToolResponse } from '../models/responses.js';

// Tool schema
export const searchSchema = z.object({
  q: z.string().describe('Search keyword'),
});

// Tool registration function
export function registerSearchTool(server: any) {
  server.tool(
    'search',
    'Search documents by keyword in Yuque knowledge base. Use this when user wants to find specific documents or content. Returns matching documents with titles and summaries.',
    searchSchema.shape,
    async (args: z.infer<typeof searchSchema>) => {
      try {
        const client = new YuqueApiClient();
        const apiResponse = await client.search({
          q: args.q,
          type: 'doc',
          page: 1,
        });

        const response: SearchToolResponse = ResponseTransformer.transformSearch(apiResponse);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(response, null, 2),
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
