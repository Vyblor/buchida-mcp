/**
 * Tool registry — exports all tool definitions and handlers.
 */

export { sendEmailTool, handleSendEmail } from "./send-email.js";
export { listEmailsTool, handleListEmails } from "./list-emails.js";
export { getEmailTool, handleGetEmail } from "./get-email.js";
export {
	listDomainsTool,
	handleListDomains,
	addDomainTool,
	handleAddDomain,
	verifyDomainTool,
	handleVerifyDomain,
} from "./domains.js";
export { listApiKeysTool, handleListApiKeys, createApiKeyTool, handleCreateApiKey } from "./api-keys.js";
export { getMetricsTool, handleGetMetrics } from "./metrics.js";
export { sendBatchTool, handleSendBatch } from "./send-batch.js";
export {
	listTemplatesTool,
	handleListTemplates,
	sendWithTemplateTool,
	handleSendWithTemplate,
} from "./templates.js";

import type { ApiClient } from "../api-client.js";

import { sendEmailTool, handleSendEmail } from "./send-email.js";
import { listEmailsTool, handleListEmails } from "./list-emails.js";
import { getEmailTool, handleGetEmail } from "./get-email.js";
import {
	listDomainsTool,
	handleListDomains,
	addDomainTool,
	handleAddDomain,
	verifyDomainTool,
	handleVerifyDomain,
} from "./domains.js";
import { listApiKeysTool, handleListApiKeys, createApiKeyTool, handleCreateApiKey } from "./api-keys.js";
import { getMetricsTool, handleGetMetrics } from "./metrics.js";
import { sendBatchTool, handleSendBatch } from "./send-batch.js";
import {
	listTemplatesTool,
	handleListTemplates,
	sendWithTemplateTool,
	handleSendWithTemplate,
} from "./templates.js";

export interface ToolDefinition {
	name: string;
	description: string;
	inputSchema: Record<string, unknown>;
}

export type ToolHandler = (
	client: ApiClient,
	args: Record<string, unknown>,
) => Promise<{ content: Array<{ type: "text"; text: string }>; isError?: boolean }>;

export const allTools: ToolDefinition[] = [
	sendEmailTool,
	listEmailsTool,
	getEmailTool,
	listDomainsTool,
	addDomainTool,
	verifyDomainTool,
	listApiKeysTool,
	createApiKeyTool,
	getMetricsTool,
	sendBatchTool,
	listTemplatesTool,
	sendWithTemplateTool,
];

export const toolHandlers: Record<string, ToolHandler> = {
	send_email: handleSendEmail,
	list_emails: handleListEmails,
	get_email: handleGetEmail,
	list_domains: handleListDomains,
	add_domain: handleAddDomain,
	verify_domain: handleVerifyDomain,
	list_api_keys: handleListApiKeys,
	create_api_key: handleCreateApiKey,
	get_metrics: handleGetMetrics,
	send_batch: handleSendBatch,
	list_templates: handleListTemplates,
	send_with_template: handleSendWithTemplate,
};
