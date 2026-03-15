import { useNavigate } from "react-router-dom";
import "./Logo.css";

/**
 * Logo component
 *
 * Props:
 *   variant  — "default" (dark mark on light bg, used in nav)
 *              "light"   (white mark on transparent, used in footer/auth panel)
 *   size     — "sm" | "md" (default "md")
 *   clickable — bool, whether clicking navigates to "/" (default true)
 */
export default function Logo({
	variant = "default",
	size = "md",
	clickable = true,
}) {
	const navigate = useNavigate();

	const iconSize = size === "sm" ? 14 : 18;

	const content = (
		<>
			<div className="logo-mark">
				<svg
					width={iconSize}
					height={iconSize}
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
		</>
	);

	if (!clickable) {
		return (
			<div className={`logo logo--${variant} logo--${size}`}>{content}</div>
		);
	}

	return (
		<button
			className={`logo logo--${variant} logo--${size}`}
			onClick={() => navigate("/")}
		>
			{content}
		</button>
	);
}
