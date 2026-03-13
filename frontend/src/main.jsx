import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authpage from "./pages/Authpage.jsx";
import Users from "./pages/Users.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/login" replace />} />
				<Route path="/login" element={<Authpage />} />
				<Route path="/users" element={<Users />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
