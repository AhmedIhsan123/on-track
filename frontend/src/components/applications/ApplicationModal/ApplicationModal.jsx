import { useState, useEffect } from "react";
import "./ApplicationModal.css";

const EMPTY = {
	company_name: "",
	job_title: "",
	status: "saved",
	location: "",
	salary_range: "",
	applied_date: "",
	job_link: "",
};

const STATUSES = ["saved", "applied", "interview", "offer", "rejected"];

export default function ApplicationModal({ application, onSave, onClose }) {
	const [form, setForm] = useState(EMPTY);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (application) {
			setForm({
				company_name: application.company_name || "",
				job_title: application.job_title || "",
				status: application.status || "saved",
				location: application.location || "",
				salary_range: application.salary_range || "",
				applied_date: application.applied_date ? application.applied_date.split("T")[0] : "",
				job_link: application.job_link || "",
			});
		} else {
			setForm(EMPTY);
		}
	}, [application]);

	const handleChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.company_name.trim() || !form.job_title.trim()) {
			setError("Company name and job title are required.");
			return;
		}
		setLoading(true);
		try {
			await onSave(form);
			onClose();
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="modal-backdrop" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<h2 className="modal-title">
						{application ? "Edit Application" : "Add Application"}
					</h2>
					<button className="modal-close" onClick={onClose} aria-label="Close">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>

				{error && <div className="modal-error">⚠ {error}</div>}

				<form className="modal-form" onSubmit={handleSubmit}>
					<div className="modal-row">
						<div className="modal-field">
							<label>Company Name *</label>
							<input name="company_name" value={form.company_name} onChange={handleChange} placeholder="e.g. Acme Corp" autoFocus />
						</div>
						<div className="modal-field">
							<label>Job Title *</label>
							<input name="job_title" value={form.job_title} onChange={handleChange} placeholder="e.g. Software Engineer" />
						</div>
					</div>

					<div className="modal-row">
						<div className="modal-field">
							<label>Status</label>
							<select name="status" value={form.status} onChange={handleChange}>
								{STATUSES.map((s) => (
									<option key={s} value={s}>
										{s.charAt(0).toUpperCase() + s.slice(1)}
									</option>
								))}
							</select>
						</div>
						<div className="modal-field">
							<label>Applied Date</label>
							<input name="applied_date" type="date" value={form.applied_date} onChange={handleChange} />
						</div>
					</div>

					<div className="modal-row">
						<div className="modal-field">
							<label>Location</label>
							<input name="location" value={form.location} onChange={handleChange} placeholder="e.g. London, Remote" />
						</div>
						<div className="modal-field">
							<label>Salary Range</label>
							<input name="salary_range" value={form.salary_range} onChange={handleChange} placeholder="e.g. £50k–£70k" />
						</div>
					</div>

					<div className="modal-field">
						<label>Job Link</label>
						<input name="job_link" value={form.job_link} onChange={handleChange} placeholder="https://..." />
					</div>

					<div className="modal-actions">
						<button type="button" className="modal-btn-cancel" onClick={onClose}>Cancel</button>
						<button type="submit" className="modal-btn-save" disabled={loading}>
							{loading ? "Saving..." : application ? "Save Changes" : "Add Application"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
