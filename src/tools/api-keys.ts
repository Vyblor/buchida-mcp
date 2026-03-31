import type { ApiClient } from "../api-client.js";

export const listApiKeysTool = {
	name: "list_api_keys",
	description: "List API keys for your account (keys are masked for security)",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if NSEND_API_KEY env is set)",
			},
		},
	},
};

export async function handleListApiKeys(
	client: ApiClient,
	_args: Record<string, unknown>,
) {
	const response = await client.get("/v1/api-keys");

	if (!response.ok) {
		return { content: [{ type: "text" as const, text: `Error: ${response.error}` }], isError: true };
	}

	return {
		content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }],
	};
}

export const createApiKeyTool = {
	name: "create_api_key",
	description: "Create a new API key for your account",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if NSEND_API_KEY env is set)",
			},
			name: {
				type: "string",
				description: "Human-readable name for the API key",
			},
			permission: {
				type: "string",
				enum: ["full_access", "sending_access"],
				description: "Permission level (default: sending_access)",
			},
			domain_id: {
				type: "string",
				description: "Restrict key to a specific domain (optional)",
			},
		},
		required: ["name"],
	},
};

export async function handleCreateApiKey(
	client: ApiClient,
	args: Record<string, unknown>,
) {
	const { api_key: _, ...payload } = args;
	const response = await client.post("/v1/api-keys", payload);

	if (!response.ok) {
		return { content: [{ type: "text" as const, text: `Error: ${response.error}` }], isError: true };
	}

	return {
		content: [
			{
				type: "text" as const,
				text: JSON.stringify(response.data, null, 2),
			},
			{
				type: "text" as const,
				text: "\n⚠️  Save this key now — it will not be shown again.",
			},
		],
	};
}
