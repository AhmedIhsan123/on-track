import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
	try {
		const { full_name, email, password } = req.body;

		if (!full_name || !email || !password) {
			return res
				.status(400)
				.json({ message: "Full name, email and password required" });
		}

		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const result = await createUser(email, hashedPassword, full_name);

		res.status(201).json({ message: "User created", userId: result.insertId });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: "Email and password required" });
		}

		const user = await findUserByEmail(email);
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const match = await bcrypt.compare(password, user.password_hash);
		if (!match) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email, full_name: user.full_name },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" },
		);

		res.json({ token });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};
