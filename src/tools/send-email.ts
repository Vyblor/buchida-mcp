import type { ApiClient } from "../api-client.js";

export const sendEmailTool = {
	name: "send_email",
	description: "Send a single email via the buchida API",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if NSEND_API_KEY env is set)",
			},
			from: {
				type: "string",
				description: 'Sender email address (e.g. "hello@example.com" or "Name <hello@example.com>")',
			},
			to: {
				type: "string",
				description: "Recipient email address",
			},
			subject: {
				type: "string",
				description: "Email subject line",
			},
			html: {
				type: "string",
				description: "HTML body content",
			},
			text: {
				type: "string",
				description: "Plain text body content (fallback)",
			},
			reply_to: {
				type: "string",
				description: "Reply-to email address",
			},
			cc: {
				type: "array",
				items: { type: "string" },
				description: "CC recipients",
			},
			bcc: {
				type: "array",
				items: { type: "string" },
				description: "BCC recipients",
			},
			tags: {
				type: "object",
				additionalProperties: { type: "string" },
				description: "Key-value tags for tracking",
			},
		},
		required: ["from", "to", "subject"],
	},
};

export async function handleSendEmail(
	client: ApiClient,
	args: Record<string, unknown>,
) {
	const { api_key: _, ...payload } = args;
	const response = await client.post("/v1/emails", payload);

	if (!response.ok) {
		return { content: [{ type: "text" as const, text: `Error: ${response.error}` }], isError: true };
	}

	return {
		content: [
			{
				type: "text" as const,
				text: JSON.stringify(response.data, null, 2),
			},
		],
	};
}
