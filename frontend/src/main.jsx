import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Authpage from "./pages/Authpage.jsx";
import Users from "./pages/Users.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<Authpage />} />
					<Route path="/users" element={<Users />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>,
);
