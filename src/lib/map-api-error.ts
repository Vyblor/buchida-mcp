/**
 * Maps structured API error codes to actionable, LLM-friendly error messages.
 * LLMs handle translation to the user's language; plain English is correct here.
 */

export function mapApiError(error: { code?: string; message?: string }): string {
	const code = error.code;
	const msg = error.message ?? "An error occurred";
	switch (code) {
		case "domain_not_registered":
			return `${msg}\n\nHint: Ask the user to add and verify this domain at https://buchida.com/dashboard/domains before retrying. You can list their verified domains by calling the list_domains tool (if available) or asking them to run 'buchida domains list' in their terminal.`;
		case "domain_not_verified":
			return `${msg}\n\nHint: The domain exists but DNS verification is incomplete. Direct the user to https://buchida.com/dashboard/domains to complete the SPF/DKIM/DMARC DNS records setup before retrying.`;
		default:
			return msg;
	}
}
