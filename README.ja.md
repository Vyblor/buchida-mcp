<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>buchidaメールAPI用MCPサーバー</strong></p>

  [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/mcp)](https://www.npmjs.com/package/@buchida/mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

[buchida](https://buchida.com)メールAPI用のMCP（Model Context Protocol）サーバーです。Claude Desktop、Claude Code、Cursorなど、MCP対応クライアントからメール送信、ドメイン管理、分析の確認ができます。

## インストール

```bash
npx @buchida/mcp
```

## クイックスタート

Claude Desktopの設定ファイル（`~/Library/Application Support/Claude/claude_desktop_config.json`）に追加してください:

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

その後Claudeに聞いてください: 「hello@mybrand.comからuser@example.comにウェルカムメールを送って」

## 利用可能なツール

| ツール | 説明 |
|--------|------|
| `send_email` | トランザクションメールの送信 |
| `send_batch` | 複数の受信者にメールを一括送信 |
| `get_email` | 送信済みメールの詳細とステータスを取得 |
| `list_emails` | フィルタリングによる送信済みメール一覧 |
| `list_domains` | 認証済み送信ドメインの一覧 |
| `manage_domains` | ドメインの追加、認証、削除 |
| `get_metrics` | メール分析と配信率の指標を表示 |

## ドキュメント

- [クイックスタート](https://buchida.com/ja/docs/quickstart)
- [MCPセットアップガイド](https://buchida.com/ja/docs/mcp)
- [GitHub](https://github.com/Vyblor/buchida-mcp)

## ライセンス

MIT
