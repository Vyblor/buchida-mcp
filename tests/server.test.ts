import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { describe, expect, it } from "vitest";
import { createServer } from "../src/server.js";

describe("MCP Server", () => {
	it("creates a Server instance", () => {
		const server = createServer();
		expect(server).toBeDefined();
		expect(server).toBeInstanceOf(Server);
	});
});
