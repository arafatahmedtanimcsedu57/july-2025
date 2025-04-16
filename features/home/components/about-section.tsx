import { aboutData } from "../data";

function AboutSection() {
  return (
    <section id="about" className="py-16 dark:text-white text-slate-700">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {aboutData.map((section, idx) => (
            <div key={idx} className={`${idx / 2 !== 0 ? "text-primary" : ""}`}>
              <h2 className="text-2xl font-bold uppercase mb-8">
                {section.heading}
              </h2>
              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="mb-4">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
