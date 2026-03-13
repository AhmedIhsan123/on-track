import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Users from "./pages/Users.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Users />
	</StrictMode>,
);
