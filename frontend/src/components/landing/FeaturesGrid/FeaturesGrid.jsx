import "./FeaturesGrid.css";

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

export default function FeaturesGrid() {
	return (
		<section className="features-section" id="features">
			<div className="section-inner">
				<div className="section-label">Features</div>
				<h2 className="section-heading">Everything you need to stay on top</h2>
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
	);
}
