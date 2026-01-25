# MCP 配置指南

## 项目级配置

项目已包含 `.mcp.json` 配置文件，支持项目级别的 MCP 服务器集成。

### 快速开始

1. **设置环境变量**
   ```bash
   # Windows (PowerShell)
   $env:YUQUE_AUTH_TOKEN="your-token-here"

   # Windows (CMD)
   set YUQUE_AUTH_TOKEN=your-token-here

   # 或创建 .env 文件
   echo YUQUE_AUTH_TOKEN=your-token-here > .env
   ```

2. **构建项目**
   ```bash
   npm run build
   ```

3. **启动 MCP 服务器**
   ```bash
   npm start
   ```

### Claude Desktop 配置

如果需要在 Claude Desktop 中使用，编辑配置文件：

**Windows 配置文件位置：**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**配置内容：**
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

### 获取 Token

1. 登录 [语雀](https://yuque.com)
2. 进入 **个人设置** > **Token** > **新建 Token**
3. 复制生成的 Token 到配置中

### 使用示例

配置完成后，在 Claude 中可以直接使用：

```
搜索语雀中关于 "TypeScript" 的文档
```

```
获取知识库 123 中文档 456 的内容
```

### 故障排查

| 问题 | 解决方案 |
|------|----------|
| Missing environment variable | 检查 `.env` 文件或 Claude 配置中的 `env` 字段 |
| API request failed | 验证 Token 正确性和权限 |
| Cannot find module | 运行 `npm run build` 重新构建 |
