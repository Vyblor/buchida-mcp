import type { ApiClient } from "../api-client.js";

export const listEmailsTool = {
	name: "list_emails",
	description: "List sent emails with pagination",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if NSEND_API_KEY env is set)",
			},
			limit: {
				type: "number",
				description: "Number of emails to return (default: 20, max: 100)",
			},
			offset: {
				type: "number",
				description: "Pagination offset (default: 0)",
			},
			status: {
				type: "string",
				enum: ["queued", "sent", "delivered", "bounced", "failed"],
				description: "Filter by email status",
			},
		},
	},
};

export async function handleListEmails(client: ApiClient, args: Record<string, unknown>) {
	const params = new URLSearchParams();
	if (args.limit) params.set("limit", String(args.limit));
	if (args.offset) params.set("offset", String(args.offset));
	if (args.status) params.set("status", String(args.status));

	const query = params.toString();
	const path = `/v1/emails${query ? `?${query}` : ""}`;
	const response = await client.get(path);

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
