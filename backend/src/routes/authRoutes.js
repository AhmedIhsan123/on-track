import express from "express";
import passport from "../config/passport.js";
import { register, login, oauthCallback } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
router.get("/google/callback",
	passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth`, session: false }),
	oauthCallback,
);

// GitHub OAuth
router.get("/github", passport.authenticate("github", { scope: ["user:email"], session: false }));
router.get("/github/callback",
	passport.authenticate("github", { failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth`, session: false }),
	oauthCallback,
);

export default router;
