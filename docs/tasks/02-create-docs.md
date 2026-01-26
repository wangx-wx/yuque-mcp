# Context

使用`mcp-builder`skills，帮助我完成两个mcp的建设

### 获取知识库目录的mcp tool
参考：E:\python\yuque-api
相关接口：src.yuque.api.book_api.BookApi.get_toc
mcp tool 返回数据，只返回目录id和目录title
yuque-api返回的还是完整的数据

### 创建文档的mcp tool
这个工具需要调用两个api，一个是创建文档，创建文档成功了；再调用更新目录接口
创建文档接口
参考：E:\python\yuque-api
相关接口：src.yuque.api.doc_api.DocApi.create_doc
这里回返回文档id
更新目录接口
api：PUT /api/v2/repos/:book_id/toc
requestBody:
```json
{
  "action": "appendNode", // 必填 Enum: "appendNode" "prependNode" "editNode" "removeNode" 默认 appendNode
  "action_mode": "sibling", // 必填 Enum: "sibling" "child" (sibling:同级, child:子级) 默认子级，需要用户确认
  "target_uuid": "string", // 目标节点 UUID, 不填默认为根节点 获取方式: 调用"获取知识库目录"接口获取
  "node_uuid": "string",  //  [移动/更新/删除必填] 创建则忽略
  "doc_ids": [      // 创建的文档id
    0
  ],
  "type": "DOC",        // 默认DOC
  "title": "string",     // 与创建文档入参一直
  "url": "string",      // 节点 URL [创建外链必填]， 创建则忽略
  "open_window": 0,  // 忽略
  "visible": 1      // Enum: 0 1  是否可见 (0:不可见, 1:可见) 默认1
}
```
response
```json
"V2TocItem": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string",
            "description": "\n节点唯一 ID"
          },
          "type": {
            "type": "string",
            "enum": [
              "DOC",
              "LINK",
              "TITLE"
            ],
            "description": "\n节点类型\n(DOC:文档, LINK:外链, TITLE:分组)"
          },
          "title": {
            "type": "string",
            "description": "\n节点名称"
          },
          "url": {
            "type": "string",
            "description": "\n节点 URL"
          },
          "slug": {
            "type": "string",
            "description": "\n节点 URL",
            "deprecated": true
          },
          "id": {
            "type": "integer",
            "format": "int64",
            "description": "\n文档 ID",
            "deprecated": true
          },
          "doc_id": {
            "type": "integer",
            "format": "int64",
            "description": "\n文档 ID"
          },
          "level": {
            "type": "integer",
            "description": "\n节点层级"
          },
          "depth": {
            "type": "integer",
            "description": "\n节点层级",
            "deprecated": true
          },
          "open_window": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "description": "\n是否在新窗口打开\n(0:当前页打开, 1:新窗口打开)"
          },
          "visible": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "description": "\n是否可见\n(0:不可见, 1:可见)"
          },
          "prev_uuid": {
            "type": "string",
            "description": "\n同级前一个节点 uuid"
          },
          "sibling_uuid": {
            "type": "string",
            "description": "\n同级后一个节点 uuid"
          },
          "child_uuid": {
            "type": "string",
            "description": "\n子级第一个节点 uuid"
          },
          "parent_uuid": {
            "type": "string",
            "description": "\n父级节点 uuid"
          }
        }
      }
```

创建文档是需要传入 文档标题，文档内容（默认markdown格式），文档路径（路径id）