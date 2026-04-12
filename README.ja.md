<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>buchida MCP サーバー — AI エージェントのためのメール API</strong></p>

  [English](README.md) | [한국어](README.ko.md) | [**日本語**](README.ja.md) | [中文](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/mcp)](https://www.npmjs.com/package/@buchida/mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

@buchida/mcp は AI エージェントのために作られたメール API の公式 Model Context Protocol サーバーです。buchida は CLI、MCP サーバー、そして 5 言語の SDK (Node、Python、Go、Ruby、Java) を提供しており、すべて同じ REST API 表面を共有しています。`@buchida/email` テンプレートは韓国語、日本語、中国語をネイティブにレンダリングします。

## インストール

```bash
npx @buchida/mcp
```

## 最初のメールを送信

MCP クライアントの設定ファイル（例: `~/Library/Application Support/Claude/claude_desktop_config.json`）に追加してください:

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

設定後、エージェントに依頼してください:
> 「hello@example.com に 'buchida からこんにちは' というテストメールを送って」

## ドキュメント

完全なドキュメント: **[buchida.com/docs](https://buchida.com/docs)**

- API リファレンス: https://buchida.com/docs/api-reference
- クイックスタートガイド: https://buchida.com/docs/quickstart
- CJK メールテンプレート: https://buchida.com/docs/templates
- MCP サーバーセットアップ: https://buchida.com/docs/mcp
- CLI リファレンス: https://buchida.com/docs/cli

## リンク

- **ウェブサイト:** [buchida.com](https://buchida.com)
- **ドキュメント:** [buchida.com/docs](https://buchida.com/docs)
- **料金:** [buchida.com/pricing](https://buchida.com/pricing)
- **GitHub:** https://github.com/Vyblor/buchida-mcp

## ライセンス

MIT
