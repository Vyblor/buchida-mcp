<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>MCP server for the buchida email API</strong></p>

  [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/mcp)](https://www.npmjs.com/package/@buchida/mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

MCP (Model Context Protocol) server for the [buchida](https://buchida.com) email API. Send emails, manage domains, and view analytics from Claude Desktop, Claude Code, Cursor, or any MCP-compatible client.

## Installation

```bash
npx @buchida/mcp
```

## Quick Start

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

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

Then ask Claude: "Send a welcome email to user@example.com from hello@mybrand.com"

## Available Tools

| Tool | Description |
|------|-------------|
| `send_email` | Send a transactional email |
| `send_batch` | Send emails to multiple recipients |
| `get_email` | Get details and status of a sent email |
| `list_emails` | List sent emails with filtering |
| `list_domains` | List verified sending domains |
| `manage_domains` | Add, verify, or remove domains |
| `get_metrics` | View email analytics and deliverability metrics |

## Documentation

- [Quick Start](https://buchida.com/docs/quickstart)
- [MCP Setup Guide](https://buchida.com/docs/mcp)
- [GitHub](https://github.com/Vyblor/buchida-mcp)

## License

MIT
