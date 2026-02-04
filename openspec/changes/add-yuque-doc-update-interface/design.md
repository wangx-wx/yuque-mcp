## Context

当前 yuque-mcp 已实现以下 MCP Tools：
- `search`: 搜索文档
- `get_doc`: 获取文档详情
- `get_toc`: 获取目录结构
- `create_doc`: 创建新文档

项目采用模块化架构，每个工具独立注册到 MCP Server，API 调用封装在 `YuqueApiClient` 类中。

语雀 OpenAPI 提供更新文档接口：`PUT /api/v2/repos/:group_login/:book_slug/docs/:id`，支持修改文档的标题、内容、路径、格式和公开性。

## Goals / Non-Goals

**Goals:**
- 实现 `update_doc` MCP Tool，支持更新现有文档
- 保持与现有工具一致的代码风格和架构模式
- 复用现有环境配置和 API 客户端基础设施

**Non-Goals:**
- 不支持批量更新多个文档
- 不添加文档版本历史功能
- 不修改现有工具的行为

## Decisions

### 1. 工具命名与参数设计
**决策**: 使用 `update_doc` 作为工具名，参数与 `create_doc` 保持一致风格
**理由**:
- 与现有 `create_doc` 命名风格统一
- 降低用户学习成本
- 参数结构参考语雀 OpenAPI 的 `ApiV2DocUpdatePut` 定义

### 2. 文档标识方式
**决策**: 使用 `doc_id` 作为文档唯一标识（而非 slug）
**理由**:
- slug 可能被修改，doc_id 稳定不变
- 与 `get_doc` 工具保持一致
- API 支持使用 ID 或 slug，但 ID 更可靠

### 3. 可选参数策略
**决策**: 所有更新字段均为可选参数
**理由**:
- API 定义中所有字段均为可选
- 用户可以只更新需要修改的字段
- 未提供的字段保持原值不变

### 4. 错误处理
**决策**: 复用现有错误处理模式
**理由**:
- 保持与 `create_doc` 等工具一致的用户体验
- 使用 try-catch 包装 API 调用，返回标准化错误格式

## Risks / Trade-offs

**[Risk] 并发更新冲突** → **Mitigation**: 语雀 API 会处理并发控制，返回 422 错误，工具将错误信息透传给用户

**[Risk] 更新非存在的文档** → **Mitigation**: API 返回 404，工具透传错误信息

**[Trade-off] 不支持部分更新检测** → 工具无法判断用户是否提供了无变化的值，会发起完整 API 请求，但 API 会正确处理

## Migration Plan

无需迁移，这是新增功能：
1. 部署新代码
2. MCP Client 会自动发现新的 `update_doc` tool
3. 无需数据迁移或配置变更
