import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "../src/api-client.js";
import { allTools, toolHandlers } from "../src/tools/index.js";

describe("Tool registry", () => {
	it("exports 12 tools", () => {
		expect(allTools).toHaveLength(12);
	});

	it("has a handler for every tool", () => {
		for (const tool of allTools) {
			expect(toolHandlers[tool.name]).toBeDefined();
			expect(typeof toolHandlers[tool.name]).toBe("function");
		}
	});

	it("every tool has required fields", () => {
		for (const tool of allTools) {
			expect(tool.name).toBeTruthy();
			expect(tool.description).toBeTruthy();
			expect(tool.inputSchema).toBeDefined();
			expect(tool.inputSchema.type).toBe("object");
			expect(tool.inputSchema.properties).toBeDefined();
		}
	});

	it("every tool has an api_key property", () => {
		for (const tool of allTools) {
			const props = tool.inputSchema.properties as Record<string, unknown>;
			expect(props.api_key).toBeDefined();
		}
	});

	const expectedTools = [
		"send_email",
		"list_emails",
		"get_email",
		"list_domains",
		"add_domain",
		"verify_domain",
		"list_api_keys",
		"create_api_key",
		"get_metrics",
		"send_batch",
		"list_templates",
		"send_with_template",
	];

	it("registers all expected tool names", () => {
		const names = allTools.map((t) => t.name);
		for (const expected of expectedTools) {
			expect(names).toContain(expected);
		}
	});
});

describe("Tool handlers", () => {
	const mockFetch = vi.fn();
	const originalFetch = globalThis.fetch;

	beforeEach(() => {
		globalThis.fetch = mockFetch;
	});

	afterEach(() => {
		globalThis.fetch = originalFetch;
		mockFetch.mockReset();
	});

	function createClient() {
		return new ApiClient({
			baseUrl: "https://api.buchida.com",
			apiKey: "bc_test_xxxxxxxxxxxxxxxxxxxx",
		});
	}

	function mockSuccess(data: unknown, status = 200) {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			status,
			statusText: "OK",
			text: async () => JSON.stringify(data),
		});
	}

	function mockError(message: string, status = 400) {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			status,
			statusText: "Bad Request",
			text: async () => JSON.stringify({ message }),
		});
	}

	it("send_email calls POST /v1/emails", async () => {
		mockSuccess({ id: "email_abc" });
		const result = await toolHandlers.send_email(createClient(), {
			from: "hello@example.com",
			to: "user@example.com",
			subject: "Test",
			html: "<p>Hello</p>",
		});

		expect(result.isError).toBeUndefined();
		expect(result.content[0].text).toContain("email_abc");
		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.buchida.com/v1/emails",
			expect.objectContaining({ method: "POST" }),
		);
	});

	it("list_emails calls GET /v1/emails with query params", async () => {
		mockSuccess({ data: [], total: 0 });
		const result = await toolHandlers.list_emails(createClient(), {
			limit: 10,
			status: "delivered",
		});

		expect(result.isError).toBeUndefined();
		const url = mockFetch.mock.calls[0][0] as string;
		expect(url).toContain("limit=10");
		expect(url).toContain("status=delivered");
	});

	it("get_email calls GET /v1/emails/:id", async () => {
		mockSuccess({ id: "email_123", status: "delivered" });
		await toolHandlers.get_email(createClient(), { email_id: "email_123" });

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.buchida.com/v1/emails/email_123",
			expect.anything(),
		);
	});

	it("list_domains calls GET /v1/domains", async () => {
		mockSuccess({ data: [{ id: "dom_1", domain: "example.com" }] });
		await toolHandlers.list_domains(createClient(), {});

		expect(mockFetch).toHaveBeenCalledWith("https://api.buchida.com/v1/domains", expect.anything());
	});

	it("add_domain calls POST /v1/domains", async () => {
		mockSuccess({ id: "dom_1", domain: "example.com" });
		await toolHandlers.add_domain(createClient(), { domain: "example.com" });

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.buchida.com/v1/domains",
			expect.objectContaining({ method: "POST" }),
		);
	});

	it("verify_domain calls POST /v1/domains/:id/verify", async () => {
		mockSuccess({ verified: true });
		await toolHandlers.verify_domain(createClient(), { domain_id: "dom_1" });

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.buchida.com/v1/domains/dom_1/verify",
			expect.objectContaining({ method: "POST" }),
		);
	});

	it("send_batch validates email count", async () => {
		const result = await toolHandlers.send_batch(createClient(), { emails: [] });
		expect(result.isError).toBe(true);
		expect(result.content[0].text).toContain("non-empty");
	});

	it("send_batch rejects >100 emails", async () => {
		const emails = Array.from({ length: 101 }, (_, i) => ({
			from: "a@b.com",
			to: `user${i}@b.com`,
			subject: "Test",
		}));
		const result = await toolHandlers.send_batch(createClient(), { emails });
		expect(result.isError).toBe(true);
		expect(result.content[0].text).toContain("100");
	});

	it("send_batch calls POST /v1/emails/batch", async () => {
		mockSuccess({ sent: 2 });
		const emails = [
			{ from: "a@b.com", to: "c@d.com", subject: "Test 1" },
			{ from: "a@b.com", to: "e@f.com", subject: "Test 2" },
		];
		await toolHandlers.send_batch(createClient(), { emails });

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.buchida.com/v1/emails/batch",
			expect.objectContaining({ method: "POST" }),
		);
	});

	it("handles API errors gracefully", async () => {
		mockError("Rate limit exceeded", 429);
		const result = await toolHandlers.send_email(createClient(), {
			from: "a@b.com",
			to: "c@d.com",
			subject: "Test",
		});

		expect(result.isError).toBe(true);
		expect(result.content[0].text).toContain("Rate limit exceeded");
	});

	it("send_email maps domain_not_registered to friendly hint", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			status: 403,
			statusText: "Forbidden",
			text: async () =>
				JSON.stringify({
					error: {
						code: "domain_not_registered",
						message: "Domain 'nope.com' is not registered on your account.",
					},
				}),
		});

		const result = await toolHandlers.send_email(createClient(), {
			from: "hello@nope.com",
			to: "x@y.com",
			subject: "test",
		});

		expect(result.isError).toBe(true);
		expect(result.content[0].text).toContain("dashboard/domains");
		expect(result.content[0].text).toContain("nope.com");
	});

	it("send_email maps domain_not_verified to dns hint", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			status: 403,
			statusText: "Forbidden",
			text: async () =>
				JSON.stringify({
					error: {
						code: "domain_not_verified",
						message: "Domain 'pending.com' has not completed DNS verification.",
					},
				}),
		});

		const result = await toolHandlers.send_email(createClient(), {
			from: "hello@pending.com",
			to: "x@y.com",
			subject: "test",
		});

		expect(result.isError).toBe(true);
		expect(result.content[0].text).toContain("dashboard/domains");
		expect(result.content[0].text).toContain("pending.com");
		expect(result.content[0].text).toContain("DNS");
	});

	it("create_api_key includes warning message", async () => {
		mockSuccess({ id: "key_1", key: "bc_live_newkey1234567890ab" });
		const result = await toolHandlers.create_api_key(createClient(), {
			name: "My Key",
		});

		expect(result.content).toHaveLength(2);
		expect(result.content[1].text).toContain("Save this key");
	});

	it("get_metrics passes date filters", async () => {
		mockSuccess({ sent: 100, delivered: 95 });
		await toolHandlers.get_metrics(createClient(), {
			from: "2026-03-01",
			to: "2026-03-31",
		});

		const url = mockFetch.mock.calls[0][0] as string;
		expect(url).toContain("from=2026-03-01");
		expect(url).toContain("to=2026-03-31");
	});

	it("send_with_template calls POST /v1/emails/template", async () => {
		mockSuccess({ id: "email_tpl_1" });
		await toolHandlers.send_with_template(createClient(), {
			template_id: "tpl_welcome",
			from: "hello@example.com",
			to: "user@example.com",
			variables: { name: "Alice" },
		});

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.buchida.com/v1/emails/template",
			expect.objectContaining({ method: "POST" }),
		);
	});
});
