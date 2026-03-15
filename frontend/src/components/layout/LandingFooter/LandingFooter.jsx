import Logo from "../../ui/Logo/Logo";
import "./LandingFooter.css";

export default function LandingFooter() {
	return (
		<footer className="landing-footer">
			<div className="footer-inner">
				<Logo variant="light" size="sm" />
				<p className="footer-copy">
					© {new Date().getFullYear()} on-track. Built to help you land the job.
				</p>
			</div>
		</footer>
	);
}
