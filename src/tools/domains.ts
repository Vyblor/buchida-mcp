import type { ApiClient } from "../api-client.js";

export const listDomainsTool = {
	name: "list_domains",
	description: "List all verified and pending domains for your account",
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

export async function handleListDomains(client: ApiClient, _args: Record<string, unknown>) {
	const response = await client.get("/v1/domains");

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

export const addDomainTool = {
	name: "add_domain",
	description: "Add a new sending domain to your account",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if NSEND_API_KEY env is set)",
			},
			domain: {
				type: "string",
				description: "Domain name to add (e.g. example.com)",
			},
		},
		required: ["domain"],
	},
};

export async function handleAddDomain(client: ApiClient, args: Record<string, unknown>) {
	const response = await client.post("/v1/domains", { domain: args.domain });

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

export const verifyDomainTool = {
	name: "verify_domain",
	description: "Verify domain DNS records (SPF, DKIM, DMARC)",
	inputSchema: {
		type: "object" as const,
		properties: {
			api_key: {
				type: "string",
				description: "buchida API key (optional if NSEND_API_KEY env is set)",
			},
			domain_id: {
				type: "string",
				description: "Domain ID to verify",
			},
		},
		required: ["domain_id"],
	},
};

export async function handleVerifyDomain(client: ApiClient, args: Record<string, unknown>) {
	const response = await client.post(`/v1/domains/${args.domain_id}/verify`);

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
