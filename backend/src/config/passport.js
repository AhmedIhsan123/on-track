import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { findOrCreateOAuthUser } from "../models/userModel.js";

dotenv.config();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/api/auth/google/callback",
		},
		async (_accessToken, _refreshToken, profile, done) => {
			try {
				const email = profile.emails?.[0]?.value;
				const fullName = profile.displayName;
				const user = await findOrCreateOAuthUser("google", profile.id, email, fullName);
				done(null, user);
			} catch (err) {
				done(err, null);
			}
		},
	),
);

passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: "/api/auth/github/callback",
			scope: ["user:email"],
		},
		async (_accessToken, _refreshToken, profile, done) => {
			try {
				const email = profile.emails?.[0]?.value;
				const fullName = profile.displayName || profile.username;
				const user = await findOrCreateOAuthUser("github", profile.id, email, fullName);
				done(null, user);
			} catch (err) {
				done(err, null);
			}
		},
	),
);

export default passport;
