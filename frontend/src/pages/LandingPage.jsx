import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle.jsx";
import "../styles/base.css";
import "../styles/landing.css";

const NAV_LINKS = ["Features", "How it Works", "Pricing"];

const FEATURES = [
	{
		icon: (
			<svg
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="2" y="3" width="20" height="14" rx="2" />
				<line x1="8" y1="21" x2="16" y2="21" />
				<line x1="12" y1="17" x2="12" y2="21" />
			</svg>
		),
		label: "Track Applications",
		desc: "Log every job you apply to with status, notes, salary, and company details — all in one clean dashboard.",
	},
	{
		icon: (
			<svg
				width="22"
				height="22"
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
		label: "Interview Scheduling",
		desc: "Track every interview round, record feedback, and never lose the thread of a multi-stage process.",
	},
	{
		icon: (
			<svg
				width="22"
				height="22"
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
		label: "Follow-up Reminders",
		desc: "Set reminders so you always follow up at the right time. No more wondering if you should have heard back by now.",
	},
	{
		icon: (
			<svg
				width="22"
				height="22"
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
		label: "Analytics Dashboard",
		desc: "Visualize your pipeline — response rates, interview conversion, and where in the funnel you're losing momentum.",
	},
	{
		icon: (
			<svg
				width="22"
				height="22"
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
		label: "Resume Management",
		desc: "Attach different resume versions to each application so you always know exactly what you sent.",
	},
	{
		icon: (
			<svg
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
				<path d="M7 11V7a5 5 0 0 1 10 0v4" />
			</svg>
		),
		label: "Secure & Private",
		desc: "Your job search is personal. Everything is encrypted and tied to your account — no one else sees your data.",
	},
];

const STEPS = [
	{
		num: "01",
		title: "Add your applications",
		desc: "Start logging roles as you apply. Takes 30 seconds per application.",
	},
	{
		num: "02",
		title: "Track every touchpoint",
		desc: "Record interviews, emails, and feedback as your process moves forward.",
	},
	{
		num: "03",
		title: "Stay on top of follow-ups",
		desc: "Get reminded when it's time to follow up or move on.",
	},
	{
		num: "04",
		title: "Land the job",
		desc: "Use your analytics to refine your approach and improve over time.",
	},
];

export default function LandingPage() {
	const navigate = useNavigate();
	const heroRef = useRef(null);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const els = heroRef.current?.querySelectorAll(".hero-animate");
		els?.forEach((el, i) => {
			el.style.animationDelay = `${i * 0.12}s`;
		});
	}, []);

	return (
		<div className="landing">
			{/* ── NAV ── */}
			<nav className={`landing-nav ${scrolled ? "nav-scrolled" : ""}`}>
				<div className="nav-inner">
					<button
						className="nav-logo"
						onClick={() => navigate("/")}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							padding: 0,
						}}
					>
						<div className="nav-logo-mark">
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
							</svg>
						</div>
						<span className="nav-logo-name">on-track</span>
					</button>
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
						<button className="nav-signin" onClick={() => navigate("/login")}>
							Sign in
						</button>
						<button
							className="nav-getstarted"
							onClick={() => navigate("/login")}
						>
							Get started free
						</button>
					</div>
				</div>
			</nav>

			{/* ── HERO ── */}
			<section className="hero" ref={heroRef}>
				<div className="hero-bg-grid" />
				<div className="hero-bg-blob blob-1" />
				<div className="hero-bg-blob blob-2" />

				<div className="hero-inner">
					<div className="hero-badge hero-animate">
						<span className="badge-dot" />
						Free to use · No credit card required
					</div>
					<h1 className="hero-heading hero-animate">
						Your job search,
						<br />
						<em>finally organized.</em>
					</h1>
					<p className="hero-subhead hero-animate">
						on-track centralizes every application, interview, and follow-up in
						one place.
						<br />
						Stop losing opportunities to a messy spreadsheet.
					</p>
					<div className="hero-actions hero-animate">
						<button className="btn-primary" onClick={() => navigate("/login")}>
							Start tracking for free
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="5" y1="12" x2="19" y2="12" />
								<polyline points="12 5 19 12 12 19" />
							</svg>
						</button>
						<button
							className="btn-ghost"
							onClick={() =>
								document
									.getElementById("how-it-works")
									?.scrollIntoView({ behavior: "smooth" })
							}
						>
							See how it works
						</button>
					</div>
					<div className="hero-stats hero-animate">
						<div className="hero-stat">
							<span className="stat-val">100%</span>
							<span className="stat-lbl">Free</span>
						</div>
						<div className="hero-stat-divider" />
						<div className="hero-stat">
							<span className="stat-val">∞</span>
							<span className="stat-lbl">Applications</span>
						</div>
						<div className="hero-stat-divider" />
						<div className="hero-stat">
							<span className="stat-val">1</span>
							<span className="stat-lbl">Place for everything</span>
						</div>
					</div>
				</div>

				<div className="hero-preview hero-animate">
					<div className="preview-card">
						<div className="preview-header">
							<div className="preview-dots">
								<span />
								<span />
								<span />
							</div>
							<span className="preview-title">My Applications</span>
						</div>
						<div className="preview-body">
							{[
								{
									role: "Product Designer",
									co: "Linear",
									status: "Interview",
									color: "#3b82f6",
								},
								{
									role: "UX Lead",
									co: "Notion",
									status: "Applied",
									color: "#6b7280",
								},
								{
									role: "Design Engineer",
									co: "Vercel",
									status: "Offer",
									color: "#16a34a",
								},
								{
									role: "Senior Designer",
									co: "Figma",
									status: "Applied",
									color: "#6b7280",
								},
								{
									role: "Product Designer",
									co: "Stripe",
									status: "Rejected",
									color: "#dc2626",
								},
							].map((row, i) => (
								<div
									className="preview-row"
									key={i}
									style={{ animationDelay: `${0.6 + i * 0.08}s` }}
								>
									<div className="preview-co-avatar">{row.co[0]}</div>
									<div className="preview-row-info">
										<span className="preview-role">{row.role}</span>
										<span className="preview-co">{row.co}</span>
									</div>
									<span
										className="preview-status"
										style={{ color: row.color, background: row.color + "22" }}
									>
										{row.status}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── FEATURES ── */}
			<section className="features-section" id="features">
				<div className="section-inner">
					<div className="section-label">Features</div>
					<h2 className="section-heading">
						Everything you need to stay on top
					</h2>
					<p className="section-subhead">
						Built for job seekers who are serious about their search — not just
						going through the motions.
					</p>
					<div className="features-grid">
						{FEATURES.map((f, i) => (
							<div className="feature-card" key={i}>
								<div className="feature-icon">{f.icon}</div>
								<h3 className="feature-title">{f.label}</h3>
								<p className="feature-desc">{f.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── HOW IT WORKS ── */}
			<section className="how-section" id="how-it-works">
				<div className="section-inner">
					<div className="section-label">How it Works</div>
					<h2 className="section-heading">Simple by design</h2>
					<p className="section-subhead">
						No bloated setup. No learning curve. Just a clear system for
						managing your job search.
					</p>
					<div className="steps-list">
						{STEPS.map((s, i) => (
							<div className="step" key={i}>
								<div className="step-num">{s.num}</div>
								<div className="step-content">
									<h3 className="step-title">{s.title}</h3>
									<p className="step-desc">{s.desc}</p>
								</div>
								{i < STEPS.length - 1 && <div className="step-connector" />}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── CTA ── */}
			<section className="cta-section">
				<div className="cta-inner">
					<h2 className="cta-heading">Ready to take control of your search?</h2>
					<p className="cta-subhead">
						Free forever. No credit card. Start in 30 seconds.
					</p>
					<button
						className="btn-primary btn-large"
						onClick={() => navigate("/login")}
					>
						Create your free account
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="5" y1="12" x2="19" y2="12" />
							<polyline points="12 5 19 12 12 19" />
						</svg>
					</button>
				</div>
			</section>

			{/* ── FOOTER ── */}
			<footer className="landing-footer">
				<div className="footer-inner">
					<div className="footer-logo">
						<div className="nav-logo-mark">
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
							</svg>
						</div>
						<span className="nav-logo-name">on-track</span>
					</div>
					<p className="footer-copy">
						© {new Date().getFullYear()} on-track. Built to help you land the
						job.
					</p>
				</div>
			</footer>
		</div>
	);
}
