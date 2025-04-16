import { importantData } from "../data";

function ImportantSection() {
  return (
    <section className="py-16 dark:text-white text-slate-700">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {importantData.map((section, idx) => (
            <div
              key={idx}
              className={`${idx / 2 === 0 ? "text-green-800" : ""}`}
            >
              <h2 className="text-2xl font-bold uppercase mb-8">
                {section.heading}
              </h2>
              {section.type === "paragraphs" &&
                section.content.map((para, pIdx) => (
                  <p key={pIdx} className="mb-4">
                    {para}
                  </p>
                ))}
              {section.type === "list" && (
                <ul className="list-disc pl-5 space-y-4">
                  {section.content.map((item, lIdx) => (
                    <li key={lIdx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImportantSection;
