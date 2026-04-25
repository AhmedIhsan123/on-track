const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function registerUser(full_name, email, password) {
	const res = await fetch(`${API_BASE}/api/auth/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ full_name, email, password }),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.message || "Registration failed.");
	return data;
}

export async function loginUser(email, password) {
	const res = await fetch(`${API_BASE}/api/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.message || "Login failed.");
	return data;
}

export function loginWithGoogle() {
	window.location.href = `${API_BASE}/api/auth/google`;
}

export function loginWithGitHub() {
	window.location.href = `${API_BASE}/api/auth/github`;
}
