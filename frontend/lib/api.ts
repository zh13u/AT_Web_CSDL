const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

type FetchOptions = RequestInit & {
    params?: Record<string, any>;
};

function getCSRFToken(): string | null {
    if (typeof document === "undefined") return null;
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "XSRF-TOKEN") {
            return decodeURIComponent(value);
        }
    }
    return null;
}

export async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options;

    let url = `${API_BASE_URL}${endpoint}`;
    if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                searchParams.set(key, String(value));
            }
        });
        const queryString = searchParams.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
    }

    const headers: HeadersInit = {
        ...fetchOptions.headers,
    };

    // Add CSRF token for non-GET requests
    const csrfToken = getCSRFToken();
    if (csrfToken && fetchOptions.method && fetchOptions.method !== "GET") {
        headers["X-XSRF-TOKEN"] = csrfToken;
    }

    // Add Content-Type for JSON payloads
    if (fetchOptions.body && typeof fetchOptions.body === "string") {
        headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
        ...fetchOptions,
        headers,
        credentials: "include", // Important for cookies
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Network error" }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}

export const api = {
    get: <T>(endpoint: string, options?: FetchOptions) =>
        fetchAPI<T>(endpoint, { ...options, method: "GET" }),
    post: <T>(endpoint: string, data?: any, options?: FetchOptions) =>
        fetchAPI<T>(endpoint, {
            ...options,
            method: "POST",
            body: data ? JSON.stringify(data) : undefined,
        }),
    put: <T>(endpoint: string, data?: any, options?: FetchOptions) =>
        fetchAPI<T>(endpoint, {
            ...options,
            method: "PUT",
            body: data ? JSON.stringify(data) : undefined,
        }),
    delete: <T>(endpoint: string, options?: FetchOptions) =>
        fetchAPI<T>(endpoint, { ...options, method: "DELETE" }),
};
