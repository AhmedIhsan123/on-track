import pool from "../config/database.js";

export const getApplications = async (req, res) => {
	try {
		const [rows] = await pool.query(
			"SELECT * FROM applications WHERE user_id = ? ORDER BY created_at DESC",
			[req.user.id],
		);
		res.json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};

export const createApplication = async (req, res) => {
	try {
		const { company_name, job_title, status, job_link, location, salary_range, applied_date } = req.body;

		if (!company_name || !job_title) {
			return res.status(400).json({ message: "Company name and job title are required" });
		}

		const [result] = await pool.query(
			`INSERT INTO applications (user_id, company_name, job_title, status, job_link, location, salary_range, applied_date)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			[req.user.id, company_name, job_title, status || "saved", job_link || null, location || null, salary_range || null, applied_date || null],
		);

		const [rows] = await pool.query("SELECT * FROM applications WHERE id = ?", [result.insertId]);
		res.status(201).json(rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};

export const updateApplication = async (req, res) => {
	try {
		const { id } = req.params;
		const { company_name, job_title, status, job_link, location, salary_range, applied_date } = req.body;

		const [existing] = await pool.query(
			"SELECT id FROM applications WHERE id = ? AND user_id = ?",
			[id, req.user.id],
		);
		if (!existing[0]) {
			return res.status(404).json({ message: "Application not found" });
		}

		await pool.query(
			`UPDATE applications SET company_name=?, job_title=?, status=?, job_link=?, location=?, salary_range=?, applied_date=?
			 WHERE id = ? AND user_id = ?`,
			[company_name, job_title, status, job_link || null, location || null, salary_range || null, applied_date || null, id, req.user.id],
		);

		const [rows] = await pool.query("SELECT * FROM applications WHERE id = ?", [id]);
		res.json(rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};

export const deleteApplication = async (req, res) => {
	try {
		const { id } = req.params;

		const [existing] = await pool.query(
			"SELECT id FROM applications WHERE id = ? AND user_id = ?",
			[id, req.user.id],
		);
		if (!existing[0]) {
			return res.status(404).json({ message: "Application not found" });
		}

		await pool.query("DELETE FROM applications WHERE id = ? AND user_id = ?", [id, req.user.id]);
		res.json({ message: "Deleted" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};
