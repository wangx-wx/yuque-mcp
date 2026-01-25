/**
 * MCP Tool: Get Yuque document content
 */

import { z } from 'zod';
import { YuqueApiClient } from '../api/yuque-api.js';
import { ResponseTransformer, type DocDetailToolResponse } from '../models/responses.js';

// Tool schema
export const getDocSchema = z.object({
  book_id: z.number().describe('Knowledge base (repository) ID'),
  doc_id: z.number().describe('Document ID'),
});

// Tool registration function
export function registerGetDocTool(server: any) {
  server.tool(
    'get_doc',
    'Get detailed content of a specific Yuque document by doc_id',
    getDocSchema.shape,
    async (args: z.infer<typeof getDocSchema>) => {
      try {
        const client = new YuqueApiClient();
        const apiResponse = await client.getDoc({
          // book_id: args.book_id,
          doc_id: args.doc_id,
        });

        const response: DocDetailToolResponse = ResponseTransformer.transformDocDetail(apiResponse);

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
