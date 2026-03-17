import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import "../../styles/base.css";
import "./DashboardPage.css";

/* ── Static placeholder data ─────────────────────────────────
   Replace with real API calls once the backend routes exist.
──────────────────────────────────────────────────────────── */
const STATS = [
	{
		label: "Total Applied",
		value: "—",
		sub: "No applications yet",
		subColor: null,
	},
	{
		label: "In Progress",
		value: "—",
		sub: "Active pipeline",
		subColor: "blue",
	},
	{
		label: "Response Rate",
		value: "—",
		sub: "Responses / Applied",
		subColor: null,
	},
	{
		label: "Interviews",
		value: "—",
		sub: "Upcoming",
		subColor: "green",
	},
];

const RECENT_APPLICATIONS = [
	// Will be populated from GET /api/applications
];

const WEEKLY_COUNTS = [0, 0, 0, 0, 0, 0, 0]; // Sun–Sat placeholder
const WEEK_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PIPELINE_STAGES = [
	{ label: "Applied", count: 0, color: "#94a3b8", max: 1 },
	{ label: "Interview", count: 0, color: "var(--accent)", max: 1 },
	{ label: "Offer", count: 0, color: "var(--success)", max: 1 },
	{ label: "Rejected", count: 0, color: "var(--error)", max: 1 },
];

const REMINDERS = [
	// Will be populated from GET /api/reminders
];

/* ── Status pill config ─────────────────────────────────── */
const STATUS_CONFIG = {
	Applied: { className: "status-applied", dot: "#94a3b8" },
	Interview: { className: "status-interview", dot: "var(--accent)" },
	Offer: { className: "status-offer", dot: "var(--success)" },
	Rejected: { className: "status-rejected", dot: "var(--error)" },
	Withdrawn: { className: "status-withdrawn", dot: "var(--warn)" },
};

function StatusPill({ status }) {
	const config = STATUS_CONFIG[status] || STATUS_CONFIG["Applied"];
	return (
		<span className={`status-pill ${config.className}`}>
			<span className="status-dot" style={{ background: config.dot }} />
			{status}
		</span>
	);
}

function StatCard({ label, value, sub, subColor }) {
	return (
		<div className="stat-card">
			<div className="stat-label">{label}</div>
			<div className="stat-value">{value}</div>
			<div className={`stat-sub ${subColor ? `stat-sub--${subColor}` : ""}`}>
				{sub}
			</div>
		</div>
	);
}

function WeeklyChart({ counts, labels }) {
	const max = Math.max(...counts, 1);
	const today = new Date().getDay();

	return (
		<div className="weekly-chart">
			<div className="weekly-bars">
				{counts.map((count, i) => (
					<div key={i} className="bar-col">
						<span className="bar-count">{count > 0 ? count : ""}</span>
						<div
							className={`bar-fill ${i === today ? "bar-fill--today" : ""}`}
							style={{ height: `${Math.max((count / max) * 100, 6)}%` }}
						/>
					</div>
				))}
			</div>
			<div className="weekly-labels">
				{labels.map((l, i) => (
					<span
						key={i}
						className={`bar-label ${i === today ? "bar-label--today" : ""}`}
					>
						{l}
					</span>
				))}
			</div>
		</div>
	);
}

function PipelineBar({ label, count, color, max }) {
	const pct = max > 0 ? (count / max) * 100 : 0;
	return (
		<div className="pipeline-row">
			<span className="pipeline-label">{label}</span>
			<div className="pipeline-track">
				<div
					className="pipeline-fill"
					style={{
						width: `${Math.max(pct, count > 0 ? 4 : 0)}%`,
						background: color,
					}}
				/>
			</div>
			<span className="pipeline-count">{count}</span>
		</div>
	);
}

export default function DashboardPage() {
	const navigate = useNavigate();

	const addApplicationAction = (
		<button
			className="btn-primary"
			onClick={() => navigate("/applications/new")}
		>
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
				<line x1="12" y1="5" x2="12" y2="19" />
				<line x1="5" y1="12" x2="19" y2="12" />
			</svg>
			Add Application
		</button>
	);

	return (
		<DashboardLayout title="Dashboard" actions={addApplicationAction}>
			<div className="dashboard-page">
				{/* ── STAT CARDS ── */}
				<div className="stats-grid">
					{STATS.map((s) => (
						<StatCard key={s.label} {...s} />
					))}
				</div>

				{/* ── MAIN ROW ── */}
				<div className="dashboard-main-row">
					{/* ── LEFT: recent applications table ── */}
					<section className="dashboard-section">
						<div className="section-header">
							<h2 className="section-title">Recent Applications</h2>
							<button
								className="section-link"
								onClick={() => navigate("/applications")}
							>
								View all →
							</button>
						</div>

						<div className="table-card">
							{/* Filter chips */}
							<div className="table-filters">
								{["All", "Applied", "Interview", "Offer", "Rejected"].map(
									(f) => (
										<button
											key={f}
											className={`filter-chip ${f === "All" ? "active" : ""}`}
										>
											{f}
										</button>
									),
								)}
							</div>

							{RECENT_APPLICATIONS.length === 0 ? (
								<div className="table-scroll">
									<div className="table-empty">
										<div className="empty-icon">
											<svg
												width="32"
												height="32"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
												<polyline points="14 2 14 8 20 8" />
											</svg>
										</div>
										<p className="empty-title">No applications yet</p>
										<p className="empty-sub">
											Add your first application to start tracking your job
											search.
										</p>
										<button
											className="btn-primary"
											onClick={() => navigate("/applications/new")}
										>
											Add your first application
										</button>
									</div>
								</div>
							) : (
								<div className="table-scroll">
									<table className="app-table">
										<thead>
											<tr>
												<th>Company / Role</th>
												<th>Status</th>
												<th>Applied</th>
												<th>Salary</th>
												<th />
											</tr>
										</thead>
										<tbody>
											{RECENT_APPLICATIONS.map((app) => (
												<tr
													key={app.id}
													className="table-row"
													onClick={() => navigate(`/applications/${app.id}`)}
												>
													<td>
														<div className="co-name">{app.company}</div>
														<div className="co-role">{app.role}</div>
													</td>
													<td>
														<StatusPill status={app.status} />
													</td>
													<td className="cell-muted">{app.appliedDate}</td>
													<td className="cell-muted">{app.salary || "—"}</td>
													<td>
														<button
															className="row-action"
															onClick={(e) => {
																e.stopPropagation();
																/* open context menu */
															}}
														>
															···
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</section>

					{/* ── RIGHT: sidebar panels ── */}
					<div className="dashboard-side-col">
						{/* Pipeline */}
						<div className="panel-card">
							<div className="panel-header">
								<h3 className="panel-title">Pipeline</h3>
								<span className="panel-sub">0 total</span>
							</div>
							<div className="pipeline-bars">
								{PIPELINE_STAGES.map((stage) => (
									<PipelineBar key={stage.label} {...stage} />
								))}
							</div>
						</div>

						{/* Weekly activity */}
						<div className="panel-card">
							<div className="panel-header">
								<h3 className="panel-title">This Week</h3>
								<span className="panel-sub">Applications sent</span>
							</div>
							<WeeklyChart counts={WEEKLY_COUNTS} labels={WEEK_LABELS} />
						</div>

						{/* Reminders */}
						<div className="panel-card">
							<div className="panel-header">
								<h3 className="panel-title">Upcoming</h3>
								<button
									className="section-link"
									onClick={() => navigate("/reminders")}
								>
									+ Add
								</button>
							</div>

							{REMINDERS.length === 0 ? (
								<div className="reminders-empty">
									<p>No reminders set.</p>
									<button
										className="btn-ghost-sm"
										onClick={() => navigate("/reminders")}
									>
										Set a reminder
									</button>
								</div>
							) : (
								<div className="reminder-list">
									{REMINDERS.map((r) => (
										<div key={r.id} className="reminder-item">
											<div className={`reminder-icon reminder-icon--${r.type}`}>
												{r.icon}
											</div>
											<div>
												<div className="reminder-co">
													{r.company} — {r.title}
												</div>
												<div className="reminder-desc">{r.desc}</div>
												<div className="reminder-time">{r.time}</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
