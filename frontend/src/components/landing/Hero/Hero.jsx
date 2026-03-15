import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const PREVIEW_ROWS = [
	{
		role: "Product Designer",
		co: "Linear",
		status: "Interview",
		color: "#3b82f6",
	},
	{ role: "UX Lead", co: "Notion", status: "Applied", color: "#6b7280" },
	{ role: "Design Engineer", co: "Vercel", status: "Offer", color: "#16a34a" },
	{ role: "Senior Designer", co: "Figma", status: "Applied", color: "#6b7280" },
	{
		role: "Product Designer",
		co: "Stripe",
		status: "Rejected",
		color: "#dc2626",
	},
];

export default function Hero() {
	const navigate = useNavigate();
	const heroRef = useRef(null);

	useEffect(() => {
		const els = heroRef.current?.querySelectorAll(".hero-animate");
		els?.forEach((el, i) => {
			el.style.animationDelay = `${i * 0.12}s`;
		});
	}, []);

	return (
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

			{/* Preview card */}
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
						{PREVIEW_ROWS.map((row, i) => (
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
	);
}
