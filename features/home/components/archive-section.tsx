import { archiveData } from "../data";

function ArchiveSection() {
  return (
    <section className="py-16 dark:text-white text-slate-700">
      <div className="container mx-auto px-10">
        <h2 className="text-2xl font-bold uppercase mb-8">
          {archiveData.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            {archiveData.leftSection.map((item, idx) => (
              <p key={idx} className="mb-4">
                <strong>{item.heading}</strong> {item.content}
              </p>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">
              {archiveData.rightSection.heading}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {archiveData.rightSection.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArchiveSection;
