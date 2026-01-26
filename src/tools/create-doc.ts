/**
 * MCP Tool: Create Yuque document
 */

import { z } from 'zod';
import { YuqueApiClient } from '../api/yuque-api.js';
import { ResponseTransformer, type CreateDocToolResponse } from '../models/responses.js';

// Tool schema
export const createDocSchema = z.object({
  title: z.string().describe('Document title'),
  content: z.string().describe('Document content in markdown format'),
  target_uuid: z.string().optional().describe('Target node UUID (parent node for child mode, or reference node for sibling mode). Leave empty for root node. Get this value from the get_toc tool.'),
  action_mode: z.enum(['sibling', 'child']).default('child').describe('Insert mode: "child" to add as child node, "sibling" to add as sibling node'),
});

// Tool registration function
export function registerCreateDocTool(server: any) {
  server.tool(
    'create_doc',
    'Create a new document in Yuque knowledge base. Creates the document first, then updates the TOC to add it to the directory structure.',
    createDocSchema.shape,
    async (args: z.infer<typeof createDocSchema>) => {
      try {
        const client = new YuqueApiClient();

        // Step 1: Create document
        const createResponse = await client.createDoc({
          title: args.title,
          body: args.content,
          format: 'markdown',
          public: 1,
        });

        // Step 2: Update TOC
        const tocResponse = await client.updateToc({
          action: 'appendNode',
          action_mode: args.action_mode,
          target_uuid: args.target_uuid,
          doc_ids: [createResponse.id],
          type: 'DOC',
          title: args.title,
          visible: 1,
        });

        const response: CreateDocToolResponse = ResponseTransformer.transformCreateDoc(
          createResponse,
          args.title,
          tocResponse
        );

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
