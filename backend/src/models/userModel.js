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

export const findOrCreateOAuthUser = async (provider, oauthId, email, fullName) => {
	// Return existing account for this OAuth identity
	const [byOAuth] = await pool.query(
		"SELECT * FROM users WHERE oauth_provider = ? AND oauth_id = ?",
		[provider, oauthId],
	);
	if (byOAuth[0]) return byOAuth[0];

	// Link to an existing email account if one exists
	const [byEmail] = await pool.query(
		"SELECT * FROM users WHERE email = ?",
		[email],
	);
	if (byEmail[0]) {
		await pool.query(
			"UPDATE users SET oauth_provider = ?, oauth_id = ? WHERE id = ?",
			[provider, oauthId, byEmail[0].id],
		);
		return { ...byEmail[0], oauth_provider: provider, oauth_id: oauthId };
	}

	// Create a brand-new OAuth user
	const [result] = await pool.query(
		"INSERT INTO users (full_name, email, oauth_provider, oauth_id) VALUES (?, ?, ?, ?)",
		[fullName, email, provider, oauthId],
	);
	const [newUser] = await pool.query("SELECT * FROM users WHERE id = ?", [result.insertId]);
	return newUser[0];
};
