/**
 * HTTP client for the buchida API.
 * Handles authentication and request formatting.
 */

export interface ApiClientOptions {
	baseUrl: string;
	apiKey: string;
}

export interface ApiResponse<T = unknown> {
	ok: boolean;
	status: number;
	data?: T;
	error?: string;
}

export class ApiClient {
	private baseUrl: string;
	private apiKey: string;

	constructor(options: ApiClientOptions) {
		this.baseUrl = options.baseUrl.replace(/\/$/, "");
		this.apiKey = options.apiKey;
	}

	async request<T = unknown>(
		method: string,
		path: string,
		body?: unknown,
	): Promise<ApiResponse<T>> {
		const url = `${this.baseUrl}${path}`;
		const headers: Record<string, string> = {
			Authorization: `Bearer ${this.apiKey}`,
			"Content-Type": "application/json",
			Accept: "application/json",
		};

		try {
			const response = await fetch(url, {
				method,
				headers,
				body: body ? JSON.stringify(body) : undefined,
			});

			const text = await response.text();
			let data: T | undefined;

			try {
				data = JSON.parse(text) as T;
			} catch {
				// Response is not JSON
			}

			if (!response.ok) {
				const errorMessage =
					(data as Record<string, unknown>)?.message ??
					(data as Record<string, unknown>)?.error ??
					`HTTP ${response.status}: ${response.statusText}`;
				return {
					ok: false,
					status: response.status,
					error: String(errorMessage),
				};
			}

			return { ok: true, status: response.status, data };
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unknown error";
			return { ok: false, status: 0, error: `Request failed: ${message}` };
		}
	}

	get<T = unknown>(path: string): Promise<ApiResponse<T>> {
		return this.request<T>("GET", path);
	}

	post<T = unknown>(path: string, body?: unknown): Promise<ApiResponse<T>> {
		return this.request<T>("POST", path, body);
	}

	delete<T = unknown>(path: string): Promise<ApiResponse<T>> {
		return this.request<T>("DELETE", path);
	}
}
