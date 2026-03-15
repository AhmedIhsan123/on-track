import LandingNav from "../../components/layout/LandingNav/LandingNav.jsx";
import LandingFooter from "../../components/layout/LandingFooter/LandingFooter.jsx";
import Hero from "../../components/landing/Hero/Hero.jsx";
import FeaturesGrid from "../../components/landing/FeaturesGrid/FeaturesGrid.jsx";
import HowItWorks from "../../components/landing/HowItWorks/HowItWorks.jsx";
import CTASection from "../../components/landing/CTASection/CTASection.jsx";
import "../../styles/base.css";

export default function LandingPage() {
	return (
		<div className="landing">
			<LandingNav />
			<Hero />
			<FeaturesGrid />
			<HowItWorks />
			<CTASection />
			<LandingFooter />
		</div>
	);
}
