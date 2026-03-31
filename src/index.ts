#!/usr/bin/env node

/**
 * buchida MCP server — entry point.
 * Supports stdio and HTTP (streamable-http) transports.
 *
 * Usage:
 *   buchida-mcp                  # stdio (default)
 *   buchida-mcp --http           # HTTP transport on port 3100
 *   buchida-mcp --http --port 8080
 */

import { createServer as createHttpServer } from "node:http";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "./server.js";

async function main() {
	const args = process.argv.slice(2);
	const httpMode = args.includes("--http");

	const server = createServer();

	if (httpMode) {
		const portArg = args.indexOf("--port");
		const port = portArg !== -1 ? Number.parseInt(args[portArg + 1], 10) : 3100;

		const transport = new StreamableHTTPServerTransport({
			sessionIdGenerator: () => crypto.randomUUID(),
		});

		const httpServer = createHttpServer(async (req, res) => {
			// Health check
			if (req.method === "GET" && req.url === "/health") {
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ status: "ok", server: "buchida-mcp" }));
				return;
			}

			// MCP endpoint
			if (req.url === "/mcp" || req.url === "/") {
				await transport.handleRequest(req, res);
				return;
			}

			res.writeHead(404);
			res.end("Not found");
		});

		await server.connect(transport);

		httpServer.listen(port, () => {
			console.error(`buchida-mcp HTTP server listening on port ${port}`);
			console.error(`  MCP endpoint: http://localhost:${port}/mcp`);
			console.error(`  Health check: http://localhost:${port}/health`);
		});
	} else {
		// stdio transport (default)
		const transport = new StdioServerTransport();
		await server.connect(transport);
		console.error("buchida-mcp server running on stdio");
	}
}

main().catch((err) => {
	console.error("Fatal error:", err);
	process.exit(1);
});
