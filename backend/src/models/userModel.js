import pool from "../config/database.js";

export const createUser = async (email, hashedPassword, fullName) => {
	const [result] = await pool.query(
		"INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)",
		[fullName, email, hashedPassword],
	);
	return result;
};

export const findUserByEmail = async (email) => {
	const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
		email,
	]);
	return rows[0];
};
