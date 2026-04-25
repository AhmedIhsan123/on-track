import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout/DashboardLayout";
import ApplicationModal from "../../components/applications/ApplicationModal/ApplicationModal";
import { getApplications, createApplication, updateApplication, deleteApplication } from "../../services/applicationService";
import "../../styles/base.css";
import "./DashboardPage.css";

const STATUS_CONFIG = {
	saved:      { label: "Saved",     className: "status-saved",     dot: "#94a3b8" },
	applied:    { label: "Applied",   className: "status-applied",   dot: "#94a3b8" },
	interview:  { label: "Interview", className: "status-interview", dot: "var(--accent)" },
	offer:      { label: "Offer",     className: "status-offer",     dot: "var(--success)" },
	rejected:   { label: "Rejected",  className: "status-rejected",  dot: "var(--error)" },
};

const FILTERS = ["All", "saved", "applied", "interview", "offer", "rejected"];

function StatusPill({ status }) {
	const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.saved;
	return (
		<span className={`status-pill ${cfg.className}`}>
			<span className="status-dot" style={{ background: cfg.dot }} />
			{cfg.label}
		</span>
	);
}

function StatCard({ label, value, accent }) {
	return (
		<div className="stat-card">
			<div className="stat-label">{label}</div>
			<div className={`stat-value ${accent ? "stat-value--accent" : ""}`}>{value}</div>
		</div>
	);
}

export default function DashboardPage() {
	const [applications, setApplications] = useState([]);
	const [filter, setFilter] = useState("All");
	const [modalOpen, setModalOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchApplications();
	}, []);

	const fetchApplications = async () => {
		try {
			const data = await getApplications();
			setApplications(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSave = async (form) => {
		if (editing) {
			const updated = await updateApplication(editing.id, form);
			setApplications((prev) => prev.map((a) => (a.id === editing.id ? updated : a)));
		} else {
			const created = await createApplication(form);
			setApplications((prev) => [created, ...prev]);
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Delete this application?")) return;
		await deleteApplication(id);
		setApplications((prev) => prev.filter((a) => a.id !== id));
	};

	const openAdd = () => { setEditing(null); setModalOpen(true); };
	const openEdit = (app) => { setEditing(app); setModalOpen(true); };
	const closeModal = () => { setModalOpen(false); setEditing(null); };

	const filtered = filter === "All" ? applications : applications.filter((a) => a.status === filter);

	const stats = {
		total: applications.length,
		applied: applications.filter((a) => a.status === "applied").length,
		interview: applications.filter((a) => a.status === "interview").length,
		offer: applications.filter((a) => a.status === "offer").length,
	};

	const addBtn = (
		<button className="btn-primary" onClick={openAdd}>
			<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<line x1="12" y1="5" x2="12" y2="19" />
				<line x1="5" y1="12" x2="19" y2="12" />
			</svg>
			Add Application
		</button>
	);

	return (
		<DashboardLayout title="Dashboard" actions={addBtn}>
			<div className="dashboard-page">

				{/* ── STAT CARDS ── */}
				<div className="stats-grid">
					<StatCard label="Total" value={stats.total || "—"} />
					<StatCard label="Applied" value={stats.applied || "—"} />
					<StatCard label="Interviews" value={stats.interview || "—"} accent />
					<StatCard label="Offers" value={stats.offer || "—"} accent />
				</div>

				{/* ── APPLICATIONS TABLE ── */}
				<div className="dashboard-section">
					<div className="section-header">
						<h2 className="section-title">Applications</h2>
					</div>

					<div className="table-card">
						<div className="table-filters">
							{FILTERS.map((f) => (
								<button
									key={f}
									className={`filter-chip ${filter === f ? "active" : ""}`}
									onClick={() => setFilter(f)}
								>
									{f === "All" ? "All" : STATUS_CONFIG[f].label}
								</button>
							))}
						</div>

						{loading ? (
							<div className="table-empty"><p>Loading...</p></div>
						) : error ? (
							<div className="table-empty"><p className="empty-sub">{error}</p></div>
						) : filtered.length === 0 ? (
							<div className="table-empty">
								<div className="empty-icon">
									<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
										<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
										<polyline points="14 2 14 8 20 8" />
									</svg>
								</div>
								<p className="empty-title">
									{filter === "All" ? "No applications yet" : `No ${STATUS_CONFIG[filter]?.label.toLowerCase()} applications`}
								</p>
								<p className="empty-sub">
									{filter === "All" ? "Add your first application to start tracking." : "Try a different filter."}
								</p>
								{filter === "All" && (
									<button className="btn-primary" onClick={openAdd}>Add your first application</button>
								)}
							</div>
						) : (
							<div className="table-scroll">
								<table className="app-table">
									<thead>
										<tr>
											<th>Company / Role</th>
											<th>Status</th>
											<th>Applied</th>
											<th>Location</th>
											<th>Salary</th>
											<th />
										</tr>
									</thead>
									<tbody>
										{filtered.map((app) => (
											<tr key={app.id} className="table-row">
												<td>
													<div className="co-name">{app.company_name}</div>
													<div className="co-role">{app.job_title}</div>
												</td>
												<td><StatusPill status={app.status} /></td>
												<td className="cell-muted">
													{app.applied_date
														? new Date(app.applied_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
														: "—"}
												</td>
												<td className="cell-muted">{app.location || "—"}</td>
												<td className="cell-muted">{app.salary_range || "—"}</td>
												<td className="row-actions">
													{app.job_link && (
														<a href={app.job_link} target="_blank" rel="noreferrer" className="row-action-btn" title="Open job link">
															<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
																<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
																<polyline points="15 3 21 3 21 9" />
																<line x1="10" y1="14" x2="21" y2="3" />
															</svg>
														</a>
													)}
													<button className="row-action-btn" onClick={() => openEdit(app)} title="Edit">
														<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
															<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
															<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
														</svg>
													</button>
													<button className="row-action-btn row-action-btn--danger" onClick={() => handleDelete(app.id)} title="Delete">
														<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
															<polyline points="3 6 5 6 21 6" />
															<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
															<path d="M10 11v6M14 11v6" />
															<path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
														</svg>
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</div>

			{modalOpen && (
				<ApplicationModal
					application={editing}
					onSave={handleSave}
					onClose={closeModal}
				/>
			)}
		</DashboardLayout>
	);
}
