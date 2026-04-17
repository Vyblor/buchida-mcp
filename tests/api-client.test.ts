import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "../src/api-client.js";

describe("ApiClient", () => {
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

	it("sends GET requests with auth header", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			status: 200,
			statusText: "OK",
			text: async () => JSON.stringify({ data: [] }),
		});

		const client = createClient();
		const result = await client.get("/v1/emails");

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.buchida.com/v1/emails",
			expect.objectContaining({
				method: "GET",
				headers: expect.objectContaining({
					Authorization: "Bearer bc_test_xxxxxxxxxxxxxxxxxxxx",
				}),
			}),
		);
		expect(result.ok).toBe(true);
		expect(result.data).toEqual({ data: [] });
	});

	it("sends POST requests with body", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			status: 201,
			statusText: "Created",
			text: async () => JSON.stringify({ id: "email_123" }),
		});

		const client = createClient();
		const result = await client.post("/v1/emails", { from: "a@b.com", to: "c@d.com" });

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.buchida.com/v1/emails",
			expect.objectContaining({
				method: "POST",
				body: JSON.stringify({ from: "a@b.com", to: "c@d.com" }),
			}),
		);
		expect(result.ok).toBe(true);
	});

	it("handles HTTP errors", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			status: 401,
			statusText: "Unauthorized",
			text: async () => JSON.stringify({ message: "Invalid API key" }),
		});

		const client = createClient();
		const result = await client.get("/v1/emails");

		expect(result.ok).toBe(false);
		expect(result.status).toBe(401);
		expect(result.error).toBe("Invalid API key");
	});

	it("handles network errors", async () => {
		mockFetch.mockRejectedValueOnce(new Error("Connection refused"));

		const client = createClient();
		const result = await client.get("/v1/emails");

		expect(result.ok).toBe(false);
		expect(result.status).toBe(0);
		expect(result.error).toContain("Connection refused");
	});

	it("sends User-Agent header matching buchida-mcp/{version}", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			status: 200,
			statusText: "OK",
			text: async () => JSON.stringify({ data: [] }),
		});

		const client = createClient();
		await client.post("/v1/emails", { from: "a@b.com", to: "c@d.com" });

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.buchida.com/v1/emails",
			expect.objectContaining({
				headers: expect.objectContaining({
					"User-Agent": expect.stringMatching(/^buchida-mcp\/\d+\.\d+\.\d+$/),
				}),
			}),
		);
	});

	it("strips trailing slash from base URL", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			status: 200,
			statusText: "OK",
			text: async () => "{}",
		});

		const client = new ApiClient({
			baseUrl: "https://api.buchida.com/",
			apiKey: "bc_test_xxxxxxxxxxxxxxxxxxxx",
		});
		await client.get("/v1/emails");

		expect(mockFetch).toHaveBeenCalledWith("https://api.buchida.com/v1/emails", expect.anything());
	});
});
