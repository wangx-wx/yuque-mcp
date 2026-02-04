## Why

当前 yuque-mcp 仅支持创建文档（create_doc），但不支持更新已有文档内容。用户需要能够修改现有文档的标题、内容、路径等属性，这是文档管理的基本需求。通过实现语雀 OpenAPI 的更新文档接口，可以完善 MCP 工具的文档管理能力。

## What Changes

- 新增 MCP Tool `update_doc`：支持更新语雀文档的标题、内容、路径、公开性等属性
- 扩展 `YuqueApiClient`：添加 `updateDoc` 方法调用 PUT /api/v2/repos/:group_login/:book_slug/docs/:id
- 新增类型定义：`UpdateDocRequest`、`UpdateDocResponse`
- 在 MCP Server 中注册新工具

## Capabilities

### New Capabilities
- `yuque-doc-update`: 更新语雀文档内容，支持修改标题、正文、路径、格式和公开性设置

### Modified Capabilities
- 无（本次变更不修改现有功能的行为）

## Impact

**受影响代码:**
- `src/tools/update-doc.ts` (新增)
- `src/api/yuque-api.ts` (添加 updateDoc 方法)
- `src/models/types.ts` (添加 UpdateDocRequest/UpdateDocResponse 类型)
- `src/server.ts` (注册新工具)
- `src/models/responses.ts` (可能需要添加响应转换器)

**API 依赖:**
- 语雀 OpenAPI: PUT /api/v2/repos/:group_login/:book_slug/docs/:id

**环境依赖:**
- 复用现有环境配置（YUQUE_GROUP_LOGIN, YUQUE_BOOK_SLUG, YUQUE_AUTH_TOKEN）
