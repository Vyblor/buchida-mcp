import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getBaseUrl, resolveApiKey } from "../src/auth.js";

describe("resolveApiKey", () => {
	const originalEnv = process.env.BUCHIDA_API_KEY;

	afterEach(() => {
		if (originalEnv !== undefined) {
			process.env.BUCHIDA_API_KEY = originalEnv;
		} else {
			// biome-ignore lint/performance/noDelete: must unset env var, = undefined stringifies to "undefined"
			delete process.env.BUCHIDA_API_KEY;
		}
	});

	// --- prefix / env resolution ---

	it("returns the tool input key when provided", () => {
		const key = "bc_live_xxxxxxxxxxxxxxxxxxxx";
		expect(resolveApiKey(key)).toBe(key);
	});

	it("falls back to BUCHIDA_API_KEY env var", () => {
		process.env.BUCHIDA_API_KEY = "bc_test_yyyyyyyyyyyyyyyyyyyy";
		expect(resolveApiKey()).toBe("bc_test_yyyyyyyyyyyyyyyyyyyy");
	});

	it("tool input wins over env var when both are set", () => {
		process.env.BUCHIDA_API_KEY = "bc_live_envenvenvenvenvenvenvenv";
		const toolKey = "bc_live_tooltooltooltooltoolto";
		expect(resolveApiKey(toolKey)).toBe(toolKey);
	});

	it("throws when neither tool input nor env var is set", () => {
		// biome-ignore lint/performance/noDelete: must unset env var, = undefined stringifies to "undefined"
		delete process.env.BUCHIDA_API_KEY;
		expect(() => resolveApiKey()).toThrow("No API key provided");
	});

	it("empty string is treated as falsy — falls back to env (throws when env also unset)", () => {
		// biome-ignore lint/performance/noDelete: must unset env var, = undefined stringifies to "undefined"
		delete process.env.BUCHIDA_API_KEY;
		// empty string is falsy → treated like no key → "No API key provided"
		expect(() => resolveApiKey("")).toThrow("No API key provided");
	});

	// --- valid key shapes ---

	it("accepts bc_live_ prefix (alphanumeric only, 24 suffix chars)", () => {
		const key = "bc_live_abcdefghijklmnopqrstuvwx";
		expect(resolveApiKey(key)).toBe(key);
	});

	it("accepts bc_test_ prefix", () => {
		const key = "bc_test_ABCDEFGHIJKLMNOPQRST1234";
		expect(resolveApiKey(key)).toBe(key);
	});

	it("accepts bc_cli_ prefix", () => {
		const key = "bc_cli_abcdefghijklmnopqrst";
		expect(resolveApiKey(key)).toBe(key);
	});

	it("accepts a real-format key with underscore and hyphen in suffix", () => {
		// This is the key format emitted by the buchida API server (base64url)
		const key = "bc_live_UjJ36kY92ZBo8IU-tfdL8nwkduAabpSZ";
		expect(resolveApiKey(key)).toBe(key);
	});

	it("accepts key with underscores in suffix", () => {
		const key = "bc_live_abcdef_ghijklmnopqrst";
		expect(resolveApiKey(key)).toBe(key);
	});

	it("accepts key with hyphens in suffix", () => {
		const key = "bc_live_abcdef-ghijklmnopqrst";
		expect(resolveApiKey(key)).toBe(key);
	});

	it("accepts key with mixed underscores and hyphens", () => {
		const key = "bc_test_abc_def-ghi_jkl-mnopqr";
		expect(resolveApiKey(key)).toBe(key);
	});

	it("accepts key at exact minimum length boundary (suffix = 20 chars)", () => {
		const key = `bc_live_${"A".repeat(20)}`;
		expect(resolveApiKey(key)).toBe(key);
	});

	// --- rejected key shapes ---

	it("rejects key with suffix length 19 (one char too short)", () => {
		const key = `bc_live_${"A".repeat(19)}`;
		expect(() => resolveApiKey(key)).toThrow("Invalid API key format");
	});

	it("rejects bc_cli_short (clearly too short)", () => {
		expect(() => resolveApiKey("bc_cli_short")).toThrow("Invalid API key format");
	});

	it("rejects wrong prefix (bc_prod_)", () => {
		const key = "bc_prod_abcdefghijklmnopqrstuvwx";
		expect(() => resolveApiKey(key)).toThrow("Invalid API key format");
	});

	it("rejects plaintext string with no prefix", () => {
		expect(() => resolveApiKey("invalid_key")).toThrow("Invalid API key format");
	});

	it("rejects key with XSS payload in suffix", () => {
		const key = "bc_live_<script>alert(1)</script>abc";
		expect(() => resolveApiKey(key)).toThrow("Invalid API key format");
	});

	it("rejects key with space in suffix", () => {
		const key = "bc_live_abcdef ghijklmnopqrst";
		expect(() => resolveApiKey(key)).toThrow("Invalid API key format");
	});

	it("rejects key with @ in suffix", () => {
		const key = "bc_live_abcdef@ghijklmnopqrst";
		expect(() => resolveApiKey(key)).toThrow("Invalid API key format");
	});

	it("rejects key with leading whitespace", () => {
		const key = " bc_live_abcdefghijklmnopqrst";
		expect(() => resolveApiKey(key)).toThrow("Invalid API key format");
	});

	it("rejects key with trailing whitespace", () => {
		const key = "bc_live_abcdefghijklmnopqrst ";
		expect(() => resolveApiKey(key)).toThrow("Invalid API key format");
	});
});

describe("getBaseUrl", () => {
	const originalEnv = process.env.BUCHIDA_API_URL;

	afterEach(() => {
		if (originalEnv !== undefined) {
			process.env.BUCHIDA_API_URL = originalEnv;
		} else {
			// biome-ignore lint/performance/noDelete: must unset env var, = undefined stringifies to "undefined"
			delete process.env.BUCHIDA_API_URL;
		}
	});

	it("returns default URL when env is not set", () => {
		// biome-ignore lint/performance/noDelete: must unset env var, = undefined stringifies to "undefined"
		delete process.env.BUCHIDA_API_URL;
		expect(getBaseUrl()).toBe("https://api.buchida.com");
	});

	it("returns custom URL from env", () => {
		process.env.BUCHIDA_API_URL = "http://localhost:8080";
		expect(getBaseUrl()).toBe("http://localhost:8080");
	});
});
