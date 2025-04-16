import AboutSection from "./components/about-section";
import ArchiveSection from "./components/archive-section";
import HeroSection from "./components/hero-section";
import ImportantSection from "./components/important-section";
import ProjectNumberSection from "./components/project-number-section";
import SlideInSection from "./components/slide-in-section";

function LandingContainer() {
  return (
    <div>
      <SlideInSection direction="up">
        <HeroSection />
      </SlideInSection>

      <SlideInSection direction="up">
        <ProjectNumberSection />
      </SlideInSection>

      <SlideInSection direction="up">
        <AboutSection />
      </SlideInSection>

      <SlideInSection direction="up">
        <ImportantSection />
      </SlideInSection>

      <SlideInSection direction="up">
        <ArchiveSection />
      </SlideInSection>
    </div>
  );
}

export default LandingContainer;
