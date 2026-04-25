import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo/Logo";
import ThemeToggle from "../../ui/ThemeToggle/ThemeToggle";
import "./LandingNav.css";

const NAV_LINKS = ["Features", "How it Works", "Pricing"];

function isLoggedIn() {
	const token = localStorage.getItem("token");
	if (!token) return false;
	try {
		const { exp } = JSON.parse(atob(token.split(".")[1]));
		return exp * 1000 > Date.now();
	} catch {
		return false;
	}
}

export default function LandingNav() {
	const navigate = useNavigate();
	const [scrolled, setScrolled] = useState(false);
	const loggedIn = isLoggedIn();

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<nav className={`landing-nav ${scrolled ? "nav-scrolled" : ""}`}>
			<div className="nav-inner">
				<Logo variant="default" size="md" />

				<div className="nav-links">
					{NAV_LINKS.map((l) => (
						<a
							key={l}
							href={`#${l.toLowerCase().replace(/ /g, "-")}`}
							className="nav-link"
						>
							{l}
						</a>
					))}
				</div>

				<div className="nav-ctas">
					<ThemeToggle />
					{loggedIn ? (
						<>
							<button className="nav-signin" onClick={handleLogout}>
								Log out
							</button>
							<button className="nav-getstarted" onClick={() => navigate("/dashboard")}>
								View Dashboard
							</button>
						</>
					) : (
						<>
							<button className="nav-signin" onClick={() => navigate("/login")}>
								Sign in
							</button>
							<button className="nav-getstarted" onClick={() => navigate("/login")}>
								Get started free
							</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
