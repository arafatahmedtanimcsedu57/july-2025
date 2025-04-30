import AboutSection from './components/about-section';
import HeroSection from './components/hero-section';
import ImportantSection from './components/important-section';
import MediaCoverage from './components/press-section';
import SlideInSection from '../../shared/ui/slide-in-section';

function LandingContainer() {
	return (
		<div>
			<SlideInSection direction="up">
				<HeroSection />
			</SlideInSection>

			<div className="container m-auto">
				<SlideInSection direction="up">
					<AboutSection />
				</SlideInSection>

				<SlideInSection direction="up">
					<ImportantSection />
				</SlideInSection>
			</div>
			<SlideInSection direction="up">
				<MediaCoverage />
			</SlideInSection>
		</div>
	);
}

export default LandingContainer;
