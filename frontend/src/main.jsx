import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import Users from "./pages/Users/Users.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<AuthPage />} />
					<Route path="/users" element={<Users />} />
					<Route path="/dashboard" element={<DashboardPage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>,
);
