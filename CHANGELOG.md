# Changelog

All notable changes to `@buchida/mcp` will be documented in this file.

## 0.1.5 — 2026-04-17

### Added
- `User-Agent: buchida-mcp/{version}` header on all API requests so buchida dashboard logs correctly attribute MCP traffic (previously showed `sdk_name=HTTP`).

## 0.1.4 — 2026-04-17

### Fixed
- API key validation now accepts base64url characters (underscores and hyphens) in key suffix. Previous regex rejected real keys emitted by the buchida API server.

## 0.1.3 — 2026-04-10

Initial public release.
