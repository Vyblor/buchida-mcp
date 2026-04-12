<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>buchida MCP 서버 — AI 에이전트를 위한 이메일 API</strong></p>

  [English](README.md) | [**한국어**](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/mcp)](https://www.npmjs.com/package/@buchida/mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

@buchida/mcp는 AI 에이전트를 위해 만들어진 이메일 API의 공식 Model Context Protocol 서버입니다. buchida는 CLI, MCP 서버, 그리고 5개 언어 SDK (Node, Python, Go, Ruby, Java)를 제공하며, 모두 동일한 REST API 표면을 공유합니다. `@buchida/email` 템플릿은 한국어, 일본어, 중국어를 네이티브로 렌더링합니다.

## 설치

```bash
npx @buchida/mcp
```

## 첫 이메일 보내기

MCP 클라이언트 설정 파일(예: `~/Library/Application Support/Claude/claude_desktop_config.json`)에 추가하세요:

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

설정 후 에이전트에게 요청하세요:
> "hello@example.com으로 'buchida에서 인사드립니다'라는 테스트 이메일을 보내줘"

## 문서

전체 문서: **[buchida.com/docs](https://buchida.com/docs)**

- API 레퍼런스: https://buchida.com/docs/api-reference
- 빠른 시작 가이드: https://buchida.com/docs/quickstart
- CJK 이메일 템플릿: https://buchida.com/docs/templates
- MCP 서버 설정: https://buchida.com/docs/mcp
- CLI 레퍼런스: https://buchida.com/docs/cli

## 링크

- **웹사이트:** [buchida.com](https://buchida.com)
- **문서:** [buchida.com/docs](https://buchida.com/docs)
- **요금제:** [buchida.com/pricing](https://buchida.com/pricing)
- **GitHub:** https://github.com/Vyblor/buchida-mcp

## 라이선스

MIT
