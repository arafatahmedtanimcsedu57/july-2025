import { projectStats } from "../data";

function ProjectNumberSection() {
  return (
    <section className="py-16 bg-foreground dark:text-white text-slate-700">
      <div className="container mx-auto px-10">
        <h2 className="text-2xl font-bold uppercase mb-12">
          {projectStats.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectStats.blocks.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <span className={`text-5xl font-bold mb-2 ${item.color || ""}`}>
                {item.number}
              </span>
              <span className="text-sm uppercase">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {projectStats.blocks.slice(3).map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <span className={`text-5xl font-bold mb-2 ${item.color || ""}`}>
                {item.number}
              </span>
              <span className="text-sm uppercase">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectNumberSection;
