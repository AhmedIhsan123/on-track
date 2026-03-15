import { useNavigate } from "react-router-dom";
import "./CTASection.css";

export default function CTASection() {
	const navigate = useNavigate();

	return (
		<section className="cta-section">
			<div className="cta-inner">
				<h2 className="cta-heading">Ready to take control of your search?</h2>
				<p className="cta-subhead">
					Free forever. No credit card. Start in 30 seconds.
				</p>
				<button
					className="btn-primary btn-large"
					onClick={() => navigate("/login")}
				>
					Create your free account
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" />
					</svg>
				</button>
			</div>
		</section>
	);
}
