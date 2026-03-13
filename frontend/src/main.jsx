import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Authpage from "./pages/Authpage.jsx";
import Users from "./pages/Users.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Authpage />
	</StrictMode>,
);
