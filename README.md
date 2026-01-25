# Yuque MCP Server

语雀（Yuque）文档 Model Context Protocol (MCP) 服务器，提供文档搜索和内容获取功能。

## 功能

- **search**: 搜索语雀文档
- **get_doc**: 获取文档详细内容

## 安装

```bash
npm install
```

## 配置

创建 `.env` 文件或设置环境变量：

```bash
YUQUE_AUTH_TOKEN=your-auth-token-here
YUQUE_BASE_URL=https://api.yuque.com
```

### 获取 Auth Token

1. 登录 [语雀](https://yuque.com)
2. 进入 **设置** > **Token** > **新建 Token**
3. 复制生成的 Token

## 构建

```bash
npm run build
```

## MCP 配置

在 Claude Desktop 配置文件中添加：

### macOS
`~/Library/Application Support/Claude/claude_desktop_config.json`

### Windows
`%APPDATA%\Claude\claude_desktop_config.json`

配置内容：

```json
{
  "mcpServers": {
    "yuque": {
      "command": "node",
      "args": ["E:\\node\\yuque-mcp\\dist\\index.js"],
      "env": {
        "YUQUE_AUTH_TOKEN": "your-auth-token-here",
        "YUQUE_BASE_URL": "https://api.yuque.com"
      }
    }
  }
}
```

## 工具说明

### search

搜索语雀文档。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| q | string | 是 | 搜索关键词 |
| type | string | 是 | 搜索类型：`doc`（文档）或 `repo`（知识库） |
| page | number | 否 | 页码，默认 1 |
| scope | string | 否 | 搜索范围 |
| creator | string | 否 | 按作者 login 筛选 |

**示例：**

```
搜索关键词 "TypeScript" 的文档
```

### get_doc

获取指定文档的详细内容。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| book_id | number | 是 | 知识库 ID |
| doc_id | number | 是 | 文档 ID |

**示例：**

```
获取知识库 123 中文档 456 的内容
```

## 项目结构

```
yuque-mcp/
├── src/
│   ├── config/
│   │   └── env.ts          # 环境变量配置
│   ├── models/
│   │   └── types.ts        # TypeScript 类型定义
│   ├── api/
│   │   ├── client.ts       # HTTP 客户端
│   │   └── yuque-api.ts    # 语雀 API 封装
│   ├── tools/
│   │   ├── search.ts       # search 工具实现
│   │   └── get-doc.ts      # get_doc 工具实现
│   ├── server.ts           # MCP 服务器配置
│   └── index.ts            # 入口文件
├── package.json
├── tsconfig.json
└── README.md
```

## 开发

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 构建
npm run build

# 运行
npm start
```

## 使用示例

### 搜索文档

```
帮我搜索关于 "TypeScript" 的语雀文档
```

### 获取文档内容

```
获取知识库 123 中文档 456 的详细内容
```

## 故障排查

### 环境变量未设置
如果看到 `Missing required environment variable: YUQUE_AUTH_TOKEN`，请确保：
1. 已创建 `.env` 文件
2. 或在 Claude Desktop 配置中设置了 `env` 字段

### API 认证失败
检查：
1. Token 是否正确
2. Token 是否有足够权限
3. 网络连接是否正常

## 许可证

MIT

## 参考文档

- [语雀 API 文档](https://www.yuque.com/yuque/developer/api)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
