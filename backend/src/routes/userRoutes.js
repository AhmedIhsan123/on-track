import express from "express";
import pool from "../config/database.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
	try {
		const [rows] = await pool.query(
			"SELECT id, full_name, email, created_at FROM users",
		);
		res.json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
