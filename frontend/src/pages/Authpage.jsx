import { useState } from "react";
import { loginUser, registerUser } from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import "../styles/base.css";
import "../styles/auth.css";

const AUTH_MODES = { LOGIN: "login", REGISTER: "register" };

export default function AuthPage() {
	const [mode, setMode] = useState(AUTH_MODES.LOGIN);
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirm: "",
	});
	const [errors, setErrors] = useState({});
	const [apiError, setApiError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const isLogin = mode === AUTH_MODES.LOGIN;

	const handleChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
		setApiError("");
	};

	const validate = () => {
		const newErrors = {};
		if (!isLogin && !form.name.trim())
			newErrors.name = "Full name is required.";
		if (!form.email.trim()) newErrors.email = "Email is required.";
		else if (!/\S+@\S+\.\S+/.test(form.email))
			newErrors.email = "Enter a valid email.";
		if (!form.password) newErrors.password = "Password is required.";
		else if (form.password.length < 8)
			newErrors.password = "At least 8 characters required.";
		if (!isLogin && form.password !== form.confirm)
			newErrors.confirm = "Passwords do not match.";
		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setApiError("");

		const validationErrors = validate();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setLoading(true);
		try {
			if (isLogin) {
				const { token } = await loginUser(form.email, form.password);
				localStorage.setItem("token", token);
				navigate("/users");
			} else {
				await registerUser(form.name, form.email, form.password);
				// Auto-switch to login after successful register
				switchMode();
				setApiError(""); // clear any stale errors
			}
		} catch (err) {
			setApiError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const switchMode = () => {
		setMode(isLogin ? AUTH_MODES.REGISTER : AUTH_MODES.LOGIN);
		setForm({ name: "", email: "", password: "", confirm: "" });
		setErrors({});
		setApiError("");
		setShowPassword(false);
	};

	return (
		<div className="auth-wrapper">
			{/* LEFT DECORATIVE PANEL */}
			<div className="auth-panel">
				<div className="panel-logo">
					<div className="logo-mark">
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
						</svg>
					</div>
					<span className="logo-name">on-track</span>
				</div>

				<div className="panel-content">
					<h2 className="panel-tagline">
						Your job search,
						<br />
						<em>finally organized.</em>
					</h2>
					<p className="panel-desc">
						Track every application, interview, and follow-up in one place. Stay
						ahead with reminders and analytics that actually help.
					</p>
				</div>

				<div className="panel-stats">
					<div className="stat">
						<span className="stat-value">100%</span>
						<span className="stat-label">Free to use</span>
					</div>
					<div className="stat">
						<span className="stat-value">∞</span>
						<span className="stat-label">Applications</span>
					</div>
					<div className="stat">
						<span className="stat-value">1 place</span>
						<span className="stat-label">Everything</span>
					</div>
				</div>
			</div>

			{/* RIGHT FORM PANEL */}
			<div className="auth-form-section">
				<div className="auth-card">
					<div className="auth-header">
						<h1 className="auth-title">
							{isLogin ? "Welcome back" : "Create your account"}
						</h1>
						<p className="auth-subtitle">
							{isLogin
								? "Sign in to continue to on-track."
								: "Start tracking your job search today."}
						</p>
					</div>

					{/* MODE TOGGLE */}
					<div className="mode-toggle">
						<button
							className={`toggle-btn ${isLogin ? "active" : ""}`}
							onClick={() => {
								if (!isLogin) switchMode();
							}}
						>
							Sign In
						</button>
						<button
							className={`toggle-btn ${!isLogin ? "active" : ""}`}
							onClick={() => {
								if (isLogin) switchMode();
							}}
						>
							Register
						</button>
					</div>

					{/* API ERROR BANNER */}
					{apiError && <div className="api-error-banner">⚠ {apiError}</div>}

					{/* FORM */}
					<form
						className="form form-appear"
						key={mode}
						onSubmit={handleSubmit}
						noValidate
					>
						{!isLogin && (
							<div className="field">
								<label className="field-label">Full Name</label>
								<input
									className={`field-input ${errors.name ? "has-error" : ""}`}
									type="text"
									name="name"
									placeholder="Jane Smith"
									value={form.name}
									onChange={handleChange}
									autoComplete="name"
								/>
								{errors.name && (
									<span className="field-error">⚠ {errors.name}</span>
								)}
							</div>
						)}

						<div className="field">
							<label className="field-label">Email Address</label>
							<input
								className={`field-input ${errors.email ? "has-error" : ""}`}
								type="email"
								name="email"
								placeholder="jane@email.com"
								value={form.email}
								onChange={handleChange}
								autoComplete="email"
							/>
							{errors.email && (
								<span className="field-error">⚠ {errors.email}</span>
							)}
						</div>

						<div className="field">
							<label className="field-label">Password</label>
							<div className="field-input-wrap">
								<input
									className={`field-input has-suffix ${errors.password ? "has-error" : ""}`}
									type={showPassword ? "text" : "password"}
									name="password"
									placeholder="Min. 8 characters"
									value={form.password}
									onChange={handleChange}
									autoComplete={isLogin ? "current-password" : "new-password"}
								/>
								<button
									type="button"
									className="suffix-btn"
									onClick={() => setShowPassword((v) => !v)}
									aria-label="Toggle password"
								>
									{showPassword ? (
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
											<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
											<line x1="1" y1="1" x2="23" y2="23" />
										</svg>
									) : (
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
											<circle cx="12" cy="12" r="3" />
										</svg>
									)}
								</button>
							</div>
							{errors.password && (
								<span className="field-error">⚠ {errors.password}</span>
							)}
						</div>

						{!isLogin && (
							<div className="field">
								<label className="field-label">Confirm Password</label>
								<input
									className={`field-input ${errors.confirm ? "has-error" : ""}`}
									type={showPassword ? "text" : "password"}
									name="confirm"
									placeholder="Re-enter your password"
									value={form.confirm}
									onChange={handleChange}
									autoComplete="new-password"
								/>
								{errors.confirm && (
									<span className="field-error">⚠ {errors.confirm}</span>
								)}
							</div>
						)}

						{isLogin && (
							<div className="forgot-row">
								<a href="#" className="forgot-link">
									Forgot password?
								</a>
							</div>
						)}

						<button type="submit" className="submit-btn" disabled={loading}>
							{loading ? (
								<>
									<div className="spinner" />{" "}
									{isLogin ? "Signing in..." : "Creating account..."}
								</>
							) : isLogin ? (
								"Sign In →"
							) : (
								"Create Account →"
							)}
						</button>

						<div className="divider">
							<div className="divider-line" />
							<span className="divider-text">or continue with</span>
							<div className="divider-line" />
						</div>

						<button type="button" className="oauth-btn">
							<svg width="18" height="18" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							Continue with Google
						</button>
					</form>

					<p className="switch-text">
						{isLogin ? "Don't have an account? " : "Already have an account? "}
						<button className="switch-link" onClick={switchMode}>
							{isLogin ? "Register" : "Sign in"}
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}
