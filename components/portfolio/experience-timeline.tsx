import { experiencesData } from "@/lib/data";

export default function ExperienceTimeline() {
  return (
    <section id="path" className="section">
      <div className="section-inner">
        <p className="section-eyebrow">04 — Experience</p>
        <h2 className="timeline-heading" data-anim="riseIn" data-reveal="entry 4% cover 26%">
          Four years, four rooms
        </h2>

        <div className="timeline">
          <div className="timeline__spine" aria-hidden="true" />
          <div className="timeline__spine-fill" aria-hidden="true" data-anim="growY" data-reveal="entry 30% exit 40%" />

          <ol className="timeline__list">
            {experiencesData.map((job) => (
              <li key={job.title + job.date} className="timeline__item" data-anim="riseIn" data-reveal="entry 8% cover 30%">
                <span className="timeline__dot" aria-hidden="true" />
                <div className="timeline__grid">
                  <div>
                    <p className="timeline__date">{job.date}</p>
                    <h3 className="timeline__role">{job.title}</h3>
                    <p className="timeline__company">{job.company}</p>
                  </div>
                  <ul className="timeline__bullets">
                    {job.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
