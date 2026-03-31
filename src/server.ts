/**
 * buchida MCP server — core server creation and tool registration.
 * Uses the low-level Server class for raw JSON Schema tool definitions.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { ApiClient } from "./api-client.js";
import { getBaseUrl, resolveApiKey } from "./auth.js";
import { allTools, toolHandlers } from "./tools/index.js";

const SERVER_NAME = "buchida-mcp";
const SERVER_VERSION = "0.1.0";

export function createServer(): Server {
	const server = new Server(
		{ name: SERVER_NAME, version: SERVER_VERSION },
		{ capabilities: { tools: {} } },
	);

	// Handle tools/list — return all tool definitions
	server.setRequestHandler(ListToolsRequestSchema, async () => {
		return {
			tools: allTools.map((tool) => ({
				name: tool.name,
				description: tool.description,
				inputSchema: tool.inputSchema,
			})),
		};
	});

	// Handle tools/call — dispatch to the correct handler
	server.setRequestHandler(CallToolRequestSchema, async (request) => {
		const { name, arguments: args = {} } = request.params;

		const handler = toolHandlers[name];
		if (!handler) {
			return {
				content: [{ type: "text" as const, text: `Error: Unknown tool "${name}"` }],
				isError: true,
			};
		}

		try {
			const apiKey = resolveApiKey(args.api_key as string | undefined);
			const client = new ApiClient({
				baseUrl: getBaseUrl(),
				apiKey,
			});
			return await handler(client, args as Record<string, unknown>);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unknown error";
			return {
				content: [{ type: "text" as const, text: `Error: ${message}` }],
				isError: true,
			};
		}
	});

	return server;
}
