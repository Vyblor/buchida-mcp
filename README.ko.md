<div align="center">
  <img src="assets/logo-black.svg" alt="buchida" width="280" />
  <p><strong>buchida 이메일 API를 위한 MCP 서버</strong></p>

  [English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md)

  [![npm version](https://img.shields.io/npm/v/@buchida/mcp)](https://www.npmjs.com/package/@buchida/mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

---

[buchida](https://buchida.com) 이메일 API를 위한 MCP(Model Context Protocol) 서버입니다. Claude Desktop, Claude Code, Cursor 등 MCP 호환 클라이언트에서 이메일 발송, 도메인 관리, 분석 조회가 가능합니다.

## 설치

```bash
npx @buchida/mcp
```

## 빠른 시작

Claude Desktop 설정 파일(`~/Library/Application Support/Claude/claude_desktop_config.json`)에 추가하세요:

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

그런 다음 Claude에게 물어보세요: "hello@mybrand.com에서 user@example.com으로 환영 이메일을 보내줘"

## 사용 가능한 도구

| 도구 | 설명 |
|------|------|
| `send_email` | 트랜잭션 이메일 발송 |
| `send_batch` | 여러 수신자에게 이메일 일괄 발송 |
| `get_email` | 발송된 이메일의 상세 정보 및 상태 조회 |
| `list_emails` | 필터링을 사용한 발송 이메일 목록 조회 |
| `list_domains` | 인증된 발송 도메인 목록 조회 |
| `manage_domains` | 도메인 추가, 인증 또는 삭제 |
| `get_metrics` | 이메일 분석 및 전달율 지표 조회 |

## 문서

- [빠른 시작 가이드](https://buchida.com/ko/docs/quickstart)
- [MCP 설정 가이드](https://buchida.com/ko/docs/mcp)
- [GitHub](https://github.com/Vyblor/buchida-mcp)

## 라이선스

MIT
