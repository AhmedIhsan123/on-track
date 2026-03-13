// src/services/authService.js
// Handles all calls to /api/auth — login and register

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Register a new user.
 * @param {string} full_name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ userId: number, message: string }>}
 */
export async function registerUser(full_name, email, password) {
	const res = await fetch(`${API_BASE}/api/auth/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ full_name, email, password }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Registration failed.");
	}

	return data;
}

/**
 * Log in an existing user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string }>}
 */
export async function loginUser(email, password) {
	const res = await fetch(`${API_BASE}/api/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Login failed.");
	}

	return data;
}
