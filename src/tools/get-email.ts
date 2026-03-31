import type { ApiClient } from "../api-client.js";

export const getEmailTool = {
	name: "get_email",
	description: "Get detailed information about a specific email by ID",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if NSEND_API_KEY env is set)",
			},
			email_id: {
				type: "string",
				description: "The email ID to retrieve",
			},
		},
		required: ["email_id"],
	},
};

export async function handleGetEmail(client: ApiClient, args: Record<string, unknown>) {
	const response = await client.get(`/v1/emails/${args.email_id}`);

	if (!response.ok) {
		return {
			content: [{ type: "text" as const, text: `Error: ${response.error}` }],
			isError: true,
		};
	}

	return {
		content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }],
	};
}
