import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../ui/Logo/Logo";
import ThemeToggle from "../../ui/ThemeToggle/ThemeToggle";
import "./DashboardLayout.css";

const NAV_ITEMS = [
	{
		group: "Overview",
		items: [
			{
				key: "dashboard",
				label: "Dashboard",
				path: "/dashboard",
				icon: (
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<rect x="3" y="3" width="7" height="7" />
						<rect x="14" y="3" width="7" height="7" />
						<rect x="14" y="14" width="7" height="7" />
						<rect x="3" y="14" width="7" height="7" />
					</svg>
				),
			},
			{
				key: "applications",
				label: "Applications",
				path: "/applications",
				badge: null,
				icon: (
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
						<polyline points="14 2 14 8 20 8" />
					</svg>
				),
			},
			{
				key: "interviews",
				label: "Interviews",
				path: "/interviews",
				badge: null,
				badgeColor: "green",
				icon: (
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
						<line x1="16" y1="2" x2="16" y2="6" />
						<line x1="8" y1="2" x2="8" y2="6" />
						<line x1="3" y1="10" x2="21" y2="10" />
					</svg>
				),
			},
			{
				key: "reminders",
				label: "Reminders",
				path: "/reminders",
				icon: (
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
						<path d="M13.73 21a2 2 0 0 1-3.46 0" />
					</svg>
				),
			},
		],
	},
	{
		group: "Insights",
		items: [
			{
				key: "analytics",
				label: "Analytics",
				path: "/analytics",
				icon: (
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="18" y1="20" x2="18" y2="10" />
						<line x1="12" y1="20" x2="12" y2="4" />
						<line x1="6" y1="20" x2="6" y2="14" />
					</svg>
				),
			},
			{
				key: "resumes",
				label: "Resumes",
				path: "/resumes",
				icon: (
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
						<polyline points="17 8 12 3 7 8" />
						<line x1="12" y1="3" x2="12" y2="15" />
					</svg>
				),
			},
		],
	},
	{
		group: "Account",
		items: [
			{
				key: "settings",
				label: "Settings",
				path: "/settings",
				icon: (
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<circle cx="12" cy="12" r="3" />
						<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
					</svg>
				),
			},
		],
	},
];

function SidebarContent({ onNavigate }) {
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	const getUserName = () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return { initials: "?", name: "User" };
			const payload = JSON.parse(atob(token.split(".")[1]));
			const name = payload.full_name || payload.email || "User";
			const initials = name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.slice(0, 2)
				.toUpperCase();
			return { initials, name };
		} catch {
			return { initials: "?", name: "User" };
		}
	};

	const { initials, name } = getUserName();

	const handleNav = (path) => {
		navigate(path);
		onNavigate?.();
	};

	return (
		<>
			<div className="sidebar-logo">
				<Logo variant="default" size="md" />
			</div>

			<nav className="sidebar-nav">
				{NAV_ITEMS.map(({ group, items }) => (
					<div key={group}>
						<div className="nav-group-label">{group}</div>
						{items.map((item) => {
							const isActive = location.pathname === item.path;
							return (
								<button
									key={item.key}
									className={`nav-item ${isActive ? "active" : ""}`}
									onClick={() => handleNav(item.path)}
								>
									{item.icon}
									{item.label}
									{item.badge != null && (
										<span className={`nav-badge ${item.badgeColor || ""}`}>
											{item.badge}
										</span>
									)}
								</button>
							);
						})}
					</div>
				))}
			</nav>

			<div className="sidebar-user">
				<div className="user-avatar">{initials}</div>
				<div className="user-info">
					<div className="user-name">{name}</div>
					<div className="user-plan">Free plan</div>
				</div>
				<button className="sidebar-logout" onClick={handleLogout} aria-label="Log out">
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
						<polyline points="16 17 21 12 16 7" />
						<line x1="21" y1="12" x2="9" y2="12" />
					</svg>
				</button>
			</div>
		</>
	);
}

export default function DashboardLayout({ children, title, actions }) {
	const [menuOpen, setMenuOpen] = useState(false);

	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) return "Good morning";
		if (hour < 17) return "Good afternoon";
		return "Good evening";
	};

	const getUserFirstName = () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return "there";
			const payload = JSON.parse(atob(token.split(".")[1]));
			const name = payload.full_name || payload.email || "";
			return name.split(" ")[0] || "there";
		} catch {
			return "there";
		}
	};

	return (
		<div className="dashboard-shell">
			{/* ── SIDEBAR (desktop) ── */}
			<aside className="dash-sidebar">
				<SidebarContent />
			</aside>

			{/* ── DRAWER OVERLAY (mobile) ── */}
			{menuOpen && (
				<div className="drawer-overlay" onClick={() => setMenuOpen(false)} />
			)}
			<aside className={`drawer-sidebar ${menuOpen ? "open" : ""}`}>
				<SidebarContent onNavigate={() => setMenuOpen(false)} />
			</aside>

			{/* ── MAIN ── */}
			<div className="dash-main">
				<header className="dash-topbar">
					{/* Hamburger — only visible on small screens */}
					<button
						className="hamburger"
						onClick={() => setMenuOpen(true)}
						aria-label="Open menu"
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="3" y1="6" x2="21" y2="6" />
							<line x1="3" y1="12" x2="21" y2="12" />
							<line x1="3" y1="18" x2="21" y2="18" />
						</svg>
					</button>

					<div className="topbar-left">
						<h1 className="topbar-title">{title}</h1>
						<span className="topbar-greeting">
							{getGreeting()}, {getUserFirstName()} 👋
						</span>
					</div>

					<div className="topbar-right">
						<div className="search-box" role="search">
							<svg
								width="13"
								height="13"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="11" cy="11" r="8" />
								<line x1="21" y1="21" x2="16.65" y2="16.65" />
							</svg>
							<span>Search applications...</span>
						</div>
						<ThemeToggle />
						{actions}
					</div>
				</header>

				<div className="dash-content">{children}</div>
			</div>
		</div>
	);
}
