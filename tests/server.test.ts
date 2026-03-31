import { describe, it, expect } from "vitest";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { createServer } from "../src/server.js";

describe("MCP Server", () => {
	it("creates a Server instance", () => {
		const server = createServer();
		expect(server).toBeDefined();
		expect(server).toBeInstanceOf(Server);
	});
});
