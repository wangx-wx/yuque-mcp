## 1. Type Definitions

- [x] 1.1 Add `UpdateDocRequest` interface to `src/models/types.ts` with fields: doc_id, title?, body?, slug?, public?, format?
- [x] 1.2 Add `UpdateDocResponse` type alias for `DocumentDetail` in `src/models/types.ts`

## 2. API Client Extension

- [x] 2.1 Add `updateDoc` method to `YuqueApiClient` class in `src/api/yuque-api.ts`
- [x] 2.2 Implement PUT request to `/api/v2/repos/{group_login}/{book_slug}/docs/{doc_id}` endpoint
- [x] 2.3 Handle request body with optional fields (only include provided values)

## 3. MCP Tool Implementation

- [x] 3.1 Create `src/tools/update-doc.ts` file
- [x] 3.2 Define Zod schema `updateDocSchema` with doc_id (required), title/content/slug/public/format (optional)
- [x] 3.3 Implement `registerUpdateDocTool` function with proper error handling
- [x] 3.4 Transform API response using `ResponseTransformer` (add `transformUpdateDoc` if needed)

## 4. Server Integration

- [x] 4.1 Import `registerUpdateDocTool` in `src/server.ts`
- [x] 4.2 Call `registerUpdateDocTool(server)` in `createMCPServer` function

## 5. Testing & Verification

- [x] 5.1 Run TypeScript compilation to check for type errors
- [ ] 5.2 Verify tool registration in MCP server startup
- [ ] 5.3 Test update_doc tool with various parameter combinations
