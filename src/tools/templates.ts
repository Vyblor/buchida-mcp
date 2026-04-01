import type { ApiClient } from "../api-client.js";

export const listTemplatesTool = {
	name: "list_templates",
	description: "List available email templates",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if BUCHIDA_API_KEY env is set)",
			},
			limit: {
				type: "number",
				description: "Number of templates to return (default: 20)",
			},
			offset: {
				type: "number",
				description: "Pagination offset (default: 0)",
			},
		},
	},
};

export async function handleListTemplates(client: ApiClient, args: Record<string, unknown>) {
	const params = new URLSearchParams();
	if (args.limit) params.set("limit", String(args.limit));
	if (args.offset) params.set("offset", String(args.offset));

	const query = params.toString();
	const path = `/v1/templates${query ? `?${query}` : ""}`;
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

export const sendWithTemplateTool = {
	name: "send_with_template",
	description: "Send an email using a saved template with variable substitution",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if BUCHIDA_API_KEY env is set)",
			},
			template_id: {
				type: "string",
				description: "Template ID to use",
			},
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
				description: "Email subject (overrides template subject if provided)",
			},
			variables: {
				type: "object",
				additionalProperties: { type: "string" },
				description: 'Template variables to substitute (e.g. { name: "Alice" })',
			},
		},
		required: ["template_id", "from", "to"],
	},
};

export async function handleSendWithTemplate(client: ApiClient, args: Record<string, unknown>) {
	const { api_key: _, ...payload } = args;
	const response = await client.post("/v1/emails/template", payload);

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
