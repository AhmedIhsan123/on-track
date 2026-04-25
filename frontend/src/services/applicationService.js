const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const authHeaders = () => ({
	"Content-Type": "application/json",
	Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export async function getApplications() {
	const res = await fetch(`${API_BASE}/api/applications`, { headers: authHeaders() });
	const data = await res.json();
	if (!res.ok) throw new Error(data.message || "Failed to fetch applications");
	return data;
}

export async function createApplication(payload) {
	const res = await fetch(`${API_BASE}/api/applications`, {
		method: "POST",
		headers: authHeaders(),
		body: JSON.stringify(payload),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.message || "Failed to create application");
	return data;
}

export async function updateApplication(id, payload) {
	const res = await fetch(`${API_BASE}/api/applications/${id}`, {
		method: "PUT",
		headers: authHeaders(),
		body: JSON.stringify(payload),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.message || "Failed to update application");
	return data;
}

export async function deleteApplication(id) {
	const res = await fetch(`${API_BASE}/api/applications/${id}`, {
		method: "DELETE",
		headers: authHeaders(),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.message || "Failed to delete application");
	return data;
}
