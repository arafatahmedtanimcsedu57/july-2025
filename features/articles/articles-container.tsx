import MediaCoverage from "./components/press-section";
import SlideInSection from "@/shared/ui/slide-in-section";

function ArticlesContainer() {
  return (
    <div>
      <SlideInSection direction="up">
        <MediaCoverage />
      </SlideInSection>
    </div>
  );
}

export default ArticlesContainer;
