# Yuque MCP Server

语雀（Yuque）文档 Model Context Protocol (MCP) 服务器，提供文档搜索、目录浏览、内容获取和文档创建功能。

## 功能

- **search**: 搜索语雀文档
- **get_doc**: 获取文档详细内容
- **get_toc**: 获取知识库目录结构
- **create_doc**: 创建新文档

## 安装

```bash
npm install
```

## 构建

```bash
git clone https://github.com/wangx-wx/yuque-mcp.git
cd yuque-mcp
npm install
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
        "YUQUE_BASE_URL": "https://www.yuque.com",
        "YUQUE_GROUP_LOGIN": "your-group-login",
        "YUQUE_BOOK_SLUG": "your-book-slug"
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

**使用场景：** 用户想查找特定内容的文档

**示例：**
```
搜索关键词 "TypeScript" 的文档
```

### get_toc

获取知识库目录结构。

**参数：** 无（从环境变量读取知识库配置）

**使用场景：** 用户想浏览目录或导航文件夹结构

**返回：** 扁平化的目录项列表，包含 uuid 和 title

**示例：**
```
查看知识库的目录结构
```

### get_doc

获取指定文档的详细内容。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| doc_id | number | 是 | 文档 ID |

**使用场景：** 已有文档 ID，需要读取完整文档内容

**示例：**
```
获取文档 123456 的详细内容
```

### create_doc

创建新文档并添加到目录结构中。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 文档标题 |
| content | string | 是 | 文档内容（Markdown 格式） |
| target_uuid | string | 否 | 目标节点 UUID（通过 get_toc 获取）。不填则添加到根节点 |
| action_mode | string | 否 | 插入模式：`child`（子级，默认）或 `sibling`（同级） |

**使用场景：** 用户想创建新文档

**返回：** 文档 ID、标题和访问 URL

**示例：**
```
创建标题为 "部署指南" 的文档，内容为 "# 部署\n\n..."
```

## 项目结构

```
yuque-mcp/
├── src/
│   ├── config/
│   │   └── env.ts          # 环境变量配置
│   ├── models/
│   │   ├── types.ts        # TypeScript 类型定义
│   │   └── responses.ts    # 响应转换器
│   ├── api/
│   │   ├── client.ts       # HTTP 客户端
│   │   └── yuque-api.ts    # 语雀 API 封装
│   ├── tools/
│   │   ├── search.ts       # search 工具实现
│   │   ├── get-doc.ts      # get_doc 工具实现
│   │   ├── get-toc.ts      # get_toc 工具实现
│   │   └── create-doc.ts   # create_doc 工具实现
│   ├── server.ts           # MCP 服务器配置
│   └── index.ts            # 入口文件
├── package.json
├── tsconfig.json
└── README.md
```

## 使用示例

### 搜索文档

```
帮我搜索关于 "TypeScript" 的语雀文档
```

### 浏览目录

```
查看知识库的目录结构
```


### 创建文档

```
创建一个新文档，标题是 "部署指南"，内容如下：
# 部署指南

## 环境准备
- Node.js 18+
- MySQL 8.0

## 部署步骤
...
```

### 组合使用

```
先查看目录，找到 "技术文档" 分类的 uuid，然后在该分类下创建一个新文档
```

## 许可证

MIT

## 参考文档

- [语雀 API 文档](https://www.yuque.com/yuque/developer/api)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
