# buchida-mcp

MCP (Model Context Protocol) server for the buchida email API. Send emails, manage domains, view analytics, and more from Claude Desktop, Claude Code, Cursor, or any MCP-compatible client.

## Installation

```bash
npm install -g buchida-mcp
```

Or run directly with npx:

```bash
npx buchida-mcp
```

## Configuration

Set your buchida API key as an environment variable:

```bash
export BUCHIDA_API_KEY=bc_live_xxxxxxxxxxxxxxxxxxxx
```

## Setup

### Claude Desktop

Add the following to your Claude Desktop configuration file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "buchida": {
      "command": "npx",
      "args": ["buchida-mcp"],
      "env": {
        "BUCHIDA_API_KEY": "bc_live_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

### Claude Code

Add to your project's `.claude/settings.json` or global `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "buchida": {
      "command": "npx",
      "args": ["buchida-mcp"],
      "env": {
        "BUCHIDA_API_KEY": "bc_live_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

### Cursor

Add to your Cursor MCP settings (Settings > MCP Servers):

```json
{
  "mcpServers": {
    "buchida": {
      "command": "npx",
      "args": ["buchida-mcp"],
      "env": {
        "BUCHIDA_API_KEY": "bc_live_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `send_email` | Send a transactional email |
| `send_batch` | Send emails to multiple recipients |
| `get_email` | Get details and status of a sent email |
| `list_emails` | List sent emails with filtering |
| `list_domains` | List verified sending domains |
| `manage_domains` | Add, verify, or remove domains |
| `list_api_keys` | List API keys |
| `manage_api_keys` | Create or revoke API keys |
| `get_metrics` | View email analytics and deliverability metrics |
| `list_templates` | List available email templates |

## Usage Examples

Once configured, you can interact with buchida through natural language in your MCP client:

- "Send a welcome email to user@example.com from hello@mybrand.com"
- "Show me email delivery stats for the last 7 days"
- "List all my verified domains"
- "Check the status of the last email I sent"
- "Create a new API key for my staging environment"

## Transport

The MCP server supports stdio transport by default, which is compatible with all major MCP clients. HTTP transport is also available for custom integrations:

```bash
buchida-mcp --transport http --port 3100
```

## Requirements

- Node.js >= 20
- A buchida API key (get one free at [buchida.com](https://buchida.com))

## License

MIT
