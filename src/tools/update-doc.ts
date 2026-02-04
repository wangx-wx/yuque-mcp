/**
 * MCP Tool: Update Yuque document
 */

import { z } from 'zod';
import { YuqueApiClient } from '../api/yuque-api.js';
import { ResponseTransformer, type UpdateDocToolResponse } from '../models/responses.js';

// Tool schema
export const updateDocSchema = z.object({
  doc_id: z.string().describe('Document ID to update'),
  title: z.string().optional().describe('Update document title'),
  content: z.string().describe('Update document content (markdown format)'),
  slug: z.string().optional().describe('New document slug'),
});

// Tool registration function
export function registerUpdateDocTool(server: any) {
  server.tool(
    'update_doc',
    'Update an existing document in Yuque knowledge base. Modify title, content, path, or visibility.',
    updateDocSchema.shape,
    async (args: z.infer<typeof updateDocSchema>) => {
      try {
        const client = new YuqueApiClient();

        // Build request body with only provided fields
        const updateResponse = await client.updateDoc({
          doc_id: args.doc_id,
          ...(args.title && { title: args.title }),
          ...(args.content && { body: args.content }),
          ...(args.slug && { slug: args.slug }),
          public: 2,
          format: 'markdown',
        });

        const response: UpdateDocToolResponse = ResponseTransformer.transformUpdateDoc(updateResponse);

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
