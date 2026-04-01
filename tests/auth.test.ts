import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getBaseUrl, resolveApiKey } from "../src/auth.js";

describe("resolveApiKey", () => {
	const originalEnv = process.env.BUCHIDA_API_KEY;

	afterEach(() => {
		if (originalEnv !== undefined) {
			process.env.BUCHIDA_API_KEY = originalEnv;
		} else {
			delete process.env.BUCHIDA_API_KEY;
		}
	});

	it("returns the tool input key when provided", () => {
		const key = "bc_live_xxxxxxxxxxxxxxxxxxxx";
		expect(resolveApiKey(key)).toBe(key);
	});

	it("falls back to BUCHIDA_API_KEY env var", () => {
		process.env.BUCHIDA_API_KEY = "bc_test_yyyyyyyyyyyyyyyyyyyy";
		expect(resolveApiKey()).toBe("bc_test_yyyyyyyyyyyyyyyyyyyy");
	});

	it("throws when no key is available", () => {
		delete process.env.BUCHIDA_API_KEY;
		expect(() => resolveApiKey()).toThrow("No API key provided");
	});

	it("throws for invalid key format", () => {
		expect(() => resolveApiKey("invalid_key")).toThrow("Invalid API key format");
	});

	it("accepts bc_live_ prefix", () => {
		expect(resolveApiKey("bc_live_abcdefghijklmnopqrst")).toBe("bc_live_abcdefghijklmnopqrst");
	});

	it("accepts bc_test_ prefix", () => {
		expect(resolveApiKey("bc_test_abcdefghijklmnopqrst")).toBe("bc_test_abcdefghijklmnopqrst");
	});

	it("accepts bc_cli_ prefix", () => {
		expect(resolveApiKey("bc_cli_abcdefghijklmnopqrst")).toBe("bc_cli_abcdefghijklmnopqrst");
	});
});

describe("getBaseUrl", () => {
	const originalEnv = process.env.BUCHIDA_API_URL;

	afterEach(() => {
		if (originalEnv !== undefined) {
			process.env.BUCHIDA_API_URL = originalEnv;
		} else {
			delete process.env.BUCHIDA_API_URL;
		}
	});

	it("returns default URL when env is not set", () => {
		delete process.env.BUCHIDA_API_URL;
		expect(getBaseUrl()).toBe("https://api.buchida.com");
	});

	it("returns custom URL from env", () => {
		process.env.BUCHIDA_API_URL = "http://localhost:8080";
		expect(getBaseUrl()).toBe("http://localhost:8080");
	});
});
