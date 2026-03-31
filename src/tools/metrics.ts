import type { ApiClient } from "../api-client.js";

export const getMetricsTool = {
	name: "get_metrics",
	description: "Get email sending metrics (sent, delivered, bounced, opened, clicked)",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if NSEND_API_KEY env is set)",
			},
			from: {
				type: "string",
				description: "Start date in ISO 8601 format (e.g. 2026-03-01)",
			},
			to: {
				type: "string",
				description: "End date in ISO 8601 format (e.g. 2026-03-31)",
			},
			domain: {
				type: "string",
				description: "Filter metrics by domain (optional)",
			},
		},
	},
};

export async function handleGetMetrics(client: ApiClient, args: Record<string, unknown>) {
	const params = new URLSearchParams();
	if (args.from) params.set("from", String(args.from));
	if (args.to) params.set("to", String(args.to));
	if (args.domain) params.set("domain", String(args.domain));

	const query = params.toString();
	const path = `/v1/metrics${query ? `?${query}` : ""}`;
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
