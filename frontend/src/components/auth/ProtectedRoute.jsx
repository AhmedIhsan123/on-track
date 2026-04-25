import { Navigate } from "react-router-dom";

function getTokenExpiry(token) {
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return payload.exp ?? 0;
	} catch {
		return 0;
	}
}

export default function ProtectedRoute({ children }) {
	const token = localStorage.getItem("token");
	const isValid = token && getTokenExpiry(token) * 1000 > Date.now();

	if (!isValid) {
		localStorage.removeItem("token");
		return <Navigate to="/login" replace />;
	}

	return children;
}
