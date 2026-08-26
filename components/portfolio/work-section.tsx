import { projectsData } from "@/lib/data";
import ImageSlotPlaceholder from "./image-slot-placeholder";

export default function WorkSection() {
  return (
    <section id="work" className="section">
      <div className="section-inner">
        <div className="section-head" data-anim="riseIn" data-reveal="entry 4% cover 26%">
          <h2>Selected work</h2>
          <p>Two platforms where I owned the frontend architecture end to end — from data-fetching strategy to the last hover state.</p>
        </div>

        {projectsData.map((project, i) => (
          <article key={project.slotId} className={`work-article${i % 2 === 1 ? " work-article--reverse" : ""}`}>
            <div className="work-visual" data-anim="wipeIn" data-reveal="entry 6% cover 34%">
              <ImageSlotPlaceholder label={project.placeholder} />
            </div>
            <div className="work-copy">
              <p className="work-eyebrow">{project.eyebrow}</p>
              <h3 className="work-title">{project.title}</h3>
              <p className="work-role">{project.role}</p>
              <p className="work-desc">{project.description}</p>
              <ul className="work-bullets">
                {project.bullets.map((bullet, j) => (
                  <li key={j}>
                    <span className="work-bullet-arrow" aria-hidden="true">
                      →
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <ul className="work-tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
