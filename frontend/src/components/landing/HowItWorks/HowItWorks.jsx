import "./HowItWorks.css";

const STEPS = [
	{
		num: "01",
		title: "Add your applications",
		desc: "Start logging roles as you apply. Takes 30 seconds per application.",
	},
	{
		num: "02",
		title: "Track every touchpoint",
		desc: "Record interviews, emails, and feedback as your process moves forward.",
	},
	{
		num: "03",
		title: "Stay on top of follow-ups",
		desc: "Get reminded when it's time to follow up or move on.",
	},
	{
		num: "04",
		title: "Land the job",
		desc: "Use your analytics to refine your approach and improve over time.",
	},
];

export default function HowItWorks() {
	return (
		<section className="how-section" id="how-it-works">
			<div className="section-inner">
				<div className="section-label">How it Works</div>
				<h2 className="section-heading">Simple by design</h2>
				<p className="section-subhead">
					No bloated setup. No learning curve. Just a clear system for managing
					your job search.
				</p>
				<div className="steps-list">
					{STEPS.map((s, i) => (
						<div className="step" key={i}>
							<div className="step-num">{s.num}</div>
							<div className="step-content">
								<h3 className="step-title">{s.title}</h3>
								<p className="step-desc">{s.desc}</p>
							</div>
							{i < STEPS.length - 1 && <div className="step-connector" />}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
