/**
 * MCP Tool: Get Yuque document content
 */

import { z } from 'zod';
import { YuqueApiClient } from '../api/yuque-api.js';
import { ResponseTransformer, type DocDetailToolResponse } from '../models/responses.js';

// Tool schema
export const getDocSchema = z.object({
  doc_id: z.number().describe('Document ID, Get this value from the search tool.'),
});

// Tool registration function
export function registerGetDocTool(server: any) {
  server.tool(
    'get_doc',
    'Get the full content of a specific document by its ID. Use this when you have the document ID and need to read the complete document content.',
    getDocSchema.shape,
    async (args: z.infer<typeof getDocSchema>) => {
      try {
        const client = new YuqueApiClient();
        const apiResponse = await client.getDoc({
          doc_id: args.doc_id,
        });

        const response: DocDetailToolResponse = ResponseTransformer.transformDocDetail(apiResponse);

        return {
          content: [{
            type: 'resource',
            resource: {
              uri: 'yuque://doc',
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
