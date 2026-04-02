<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>buchida邮件API的MCP服务器</strong></p>

  [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/mcp)](https://www.npmjs.com/package/@buchida/mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

[buchida](https://buchida.com)邮件API的MCP（Model Context Protocol）服务器。支持从Claude Desktop、Claude Code、Cursor等MCP兼容客户端发送邮件、管理域名和查看分析数据。

## 安装

```bash
npx @buchida/mcp
```

## 快速开始

添加到Claude Desktop配置文件（`~/Library/Application Support/Claude/claude_desktop_config.json`）:

```json
{
  "mcpServers": {
    "buchida": {
      "command": "npx",
      "args": ["@buchida/mcp"],
      "env": {
        "BUCHIDA_API_KEY": "bc_live_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

然后向Claude提问: "从hello@mybrand.com向user@example.com发送一封欢迎邮件"

## 可用工具

| 工具 | 说明 |
|------|------|
| `send_email` | 发送事务性邮件 |
| `send_batch` | 向多个收件人批量发送邮件 |
| `get_email` | 获取已发送邮件的详情和状态 |
| `list_emails` | 按条件筛选已发送邮件列表 |
| `list_domains` | 查看已验证的发送域名列表 |
| `manage_domains` | 添加、验证或删除域名 |
| `get_metrics` | 查看邮件分析和送达率指标 |

## 文档

- [快速开始](https://buchida.com/zh/docs/quickstart)
- [MCP设置指南](https://buchida.com/zh/docs/mcp)
- [GitHub](https://github.com/Vyblor/buchida-mcp)

## 许可证

MIT
