const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("naxivo_token");
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export interface CreateManagerPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface UpdateManagerPayload {
  name?: string;
  phone?: string;
  isActive?: boolean;
}

export interface ApiManagerResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  organizationId?: string;
  isActive: boolean;
  isDeleted?: boolean;
}

export async function fetchManagersApi(): Promise<ApiManagerResponse[]> {
  try {
    const res = await fetch(`${API_URL}/api/users`, {
      method: "GET",
      headers: authHeaders(),
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to fetch managers");
    return json.data;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error: Unable to reach server");
  }
}

export async function createManagerApi(data: CreateManagerPayload): Promise<ApiManagerResponse> {
  try {
    const res = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: authHeaders(),
      credentials: "include",
      body: JSON.stringify({ ...data, role: "OPERATIONS_MANAGER" }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to create manager");
    return json.user;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error: Unable to reach server");
  }
}

export async function updateManagerApi(id: string, data: UpdateManagerPayload): Promise<ApiManagerResponse> {
  try {
    const res = await fetch(`${API_URL}/api/users/${id}/update-user`, {
      method: "PATCH",
      headers: authHeaders(),
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to update manager");
    return json.data;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error: Unable to reach server");
  }
}

export async function toggleActiveManagerApi(id: string): Promise<{ isActive: boolean }> {
  try {
    const res = await fetch(`${API_URL}/api/users/${id}/toggle-active`, {
      method: "PATCH",
      headers: authHeaders(),
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || json.message || "Failed to toggle status");
    return json.data;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error: Unable to reach server");
  }
}

export async function softDeleteManagerApi(id: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/api/users/${id}/soft-delete`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${getToken()}` },
      credentials: "include",
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || json.message || "Failed to delete manager");
    }
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error: Unable to reach server");
  }
}
