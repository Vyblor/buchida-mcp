import type { ApiClient } from "../api-client.js";
import { mapApiError } from "../lib/map-api-error.js";

export const sendBatchTool = {
	name: "send_batch",
	description: "Send batch emails (up to 100 at once)",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if BUCHIDA_API_KEY env is set)",
			},
			emails: {
				type: "array",
				description: "Array of email objects to send (max 100)",
				items: {
					type: "object",
					properties: {
						from: {
							type: "string",
							description: "Sender email address",
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
							description: "Plain text body content",
						},
					},
					required: ["from", "to", "subject"],
				},
				maxItems: 100,
			},
		},
		required: ["emails"],
	},
};

export async function handleSendBatch(client: ApiClient, args: Record<string, unknown>) {
	const emails = args.emails as unknown[];

	if (!Array.isArray(emails) || emails.length === 0) {
		return {
			content: [{ type: "text" as const, text: "Error: emails must be a non-empty array" }],
			isError: true,
		};
	}

	if (emails.length > 100) {
		return {
			content: [{ type: "text" as const, text: "Error: Maximum 100 emails per batch" }],
			isError: true,
		};
	}

	const response = await client.post("/v1/emails/batch", { emails });

	if (!response.ok) {
		return {
			content: [
				{
					type: "text" as const,
					text: `Error: ${mapApiError({ code: response.errorCode, message: response.error })}`,
				},
			],
			isError: true,
		};
	}

	return {
		content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }],
	};
}
