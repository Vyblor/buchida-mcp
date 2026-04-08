import type { ApiClient } from "../api-client.js";

// ── list_templates — list user-saved templates ──
export const listTemplatesTool = {
	name: "list_templates",
	description: "List user-saved email templates in your buchida account",
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

// ── send_with_template — send email using a user-saved template ──
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
	// Use the standard send endpoint with template_id field
	const response = await client.post("/v1/emails", payload);

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

// ── email_template_list — list available built-in templates ──
export const emailTemplateListTool = {
	name: "email_template_list",
	description:
		"List all available built-in buchida email templates (welcome, verify-email, password-reset, invoice, etc.) with supported locales and required props",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if BUCHIDA_API_KEY env is set)",
			},
		},
	},
};

export async function handleEmailTemplateList(client: ApiClient, _args: Record<string, unknown>) {
	const response = await client.get("/v1/render/templates");

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

// ── email_template_render — render a built-in template to HTML+text ──
export const emailTemplateRenderTool = {
	name: "email_template_render",
	description:
		"Render a built-in buchida email template to HTML and plain text. Use email_template_list to discover available templates and their required props.",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if BUCHIDA_API_KEY env is set)",
			},
			template: {
				type: "string",
				description:
					'Built-in template slug (e.g. "welcome", "verify-email", "password-reset", "invoice")',
			},
			locale: {
				type: "string",
				description: 'Locale for the rendered content (e.g. "en", "ko", "ja", "zh"). Default: "en"',
			},
			props: {
				type: "object",
				description:
					"Template-specific props (e.g. { name: 'Alice', verifyUrl: 'https://...' }). See email_template_list for required props per template.",
			},
		},
		required: ["template"],
	},
};

export async function handleEmailTemplateRender(client: ApiClient, args: Record<string, unknown>) {
	const { api_key: _, template, locale, props } = args;

	const response = await client.post("/v1/render", {
		template,
		locale: locale ?? "en",
		props: props ?? {},
	});

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

// ── email_template_preview — render and return a summary for review ──
export const emailTemplatePreviewTool = {
	name: "email_template_preview",
	description:
		"Preview a built-in buchida email template. Returns the rendered HTML and plain text so you can review the email content before sending. Useful for checking localization and prop substitution.",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if BUCHIDA_API_KEY env is set)",
			},
			template: {
				type: "string",
				description: 'Built-in template slug (e.g. "welcome", "verify-email", "password-reset")',
			},
			locale: {
				type: "string",
				description: 'Locale (e.g. "en", "ko", "ja", "zh"). Default: "en"',
			},
			props: {
				type: "object",
				description: "Template props to fill in for the preview",
			},
		},
		required: ["template"],
	},
};

export async function handleEmailTemplatePreview(client: ApiClient, args: Record<string, unknown>) {
	const { api_key: _, template, locale, props } = args;

	const response = await client.post("/v1/render", {
		template,
		locale: locale ?? "en",
		props: props ?? {},
	});

	if (!response.ok) {
		return {
			content: [{ type: "text" as const, text: `Error: ${response.error}` }],
			isError: true,
		};
	}

	const data = response.data as Record<string, unknown>;
	const inner = (data as { data?: Record<string, unknown> }).data ?? data;

	// Return a concise preview summary (text excerpt + HTML length) to avoid flooding context
	const html = (inner.html as string) ?? "";
	const text = (inner.text as string) ?? "";
	const previewText = text.slice(0, 500) + (text.length > 500 ? "..." : "");

	const summary = {
		template: inner.template,
		locale: inner.locale,
		html_length: html.length,
		text_preview: previewText,
		preview_url: `data:text/html;charset=utf-8,${encodeURIComponent(html.slice(0, 1000))}`,
	};

	return {
		content: [
			{
				type: "text" as const,
				text: `Template preview for "${template}" (${locale ?? "en"}):\n\n${JSON.stringify(summary, null, 2)}\n\nFull HTML available via email_template_render.`,
			},
		],
	};
}
