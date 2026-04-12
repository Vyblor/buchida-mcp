<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>buchida MCP server — Email API for AI agents</strong></p>

  [**English**](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/mcp)](https://www.npmjs.com/package/@buchida/mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

@buchida/mcp is the official Model Context Protocol server for **buchida** — an email API built for AI agents. buchida ships a CLI, an MCP server, and SDKs in 5 languages (Node, Python, Go, Ruby, Java), all sharing the same REST API surface. `@buchida/email` templates render Korean, Japanese, and Chinese natively.

## Install

```bash
npx @buchida/mcp
```

## Send your first email

Add to your MCP client config (e.g. `~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "buchida": {
      "command": "npx",
      "args": ["@buchida/mcp"],
      "env": {
        "BUCHIDA_API_KEY": "bc_live_..."
      }
    }
  }
}
```

After configuring, ask your agent:
> "Send a test email to hello@example.com saying 'Hello from buchida'"

## Documentation

Full docs: **[buchida.com/docs](https://buchida.com/docs)**

- API reference: https://buchida.com/docs/api-reference
- Quickstart guide: https://buchida.com/docs/quickstart
- CJK email templates: https://buchida.com/docs/templates
- MCP server setup: https://buchida.com/docs/mcp
- CLI reference: https://buchida.com/docs/cli

## Links

- **Website:** [buchida.com](https://buchida.com)
- **Documentation:** [buchida.com/docs](https://buchida.com/docs)
- **Pricing:** [buchida.com/pricing](https://buchida.com/pricing)
- **GitHub:** https://github.com/Vyblor/buchida-mcp

## License

MIT
