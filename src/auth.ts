/**
 * Authentication utilities for the buchida MCP server.
 * Resolves API key from tool input or NSEND_API_KEY env var.
 */

const API_KEY_PATTERN = /^bc_(live|test|cli)_[a-zA-Z0-9]{20,}$/;

export function resolveApiKey(toolInputKey?: string): string {
	const key = toolInputKey || process.env.NSEND_API_KEY;

	if (!key) {
		throw new Error(
			"No API key provided. Set NSEND_API_KEY environment variable or pass api_key in the tool input.",
		);
	}

	if (!API_KEY_PATTERN.test(key)) {
		throw new Error("Invalid API key format. Expected: bc_live_xxx, bc_test_xxx, or bc_cli_xxx");
	}

	return key;
}

export function getBaseUrl(): string {
	return process.env.BUCHIDA_API_URL || "https://api.buchida.com";
}
