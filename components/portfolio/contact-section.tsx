import { contactData } from "@/lib/data";

export default function ContactSection() {
  return (
    <section id="contact" className="section section--clip contact-section">
      <div className="section-inner">
        <p className="section-eyebrow">08 — Contact</p>
        <h2 className="contact-heading" data-anim="riseIn" data-reveal="entry 2% cover 24%">
          Let&rsquo;s build something <em>fast</em>
        </h2>

        <div className="contact-grid">
          <div>
            <p className="contact-col__label">Email</p>
            <a href={`mailto:${contactData.email}`} data-magnetic="true" className="contact-link">
              {contactData.email}
            </a>
          </div>
          <div>
            <p className="contact-col__label">Phone</p>
            <a href={`tel:${contactData.phoneHref}`} data-magnetic="true" className="contact-link">
              {contactData.phone}
            </a>
          </div>
          <div>
            <p className="contact-col__label">Elsewhere</p>
            <ul className="contact-list">
              <li>
                <a href={contactData.github} target="_blank" rel="noopener noreferrer" data-magnetic="true">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" data-magnetic="true">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={contactData.site} target="_blank" rel="noopener noreferrer" data-magnetic="true">
                  nikunjborad123.vercel.app ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="contact-col__label">Résumé</p>
            <a href={contactData.resumeHref} download="Nikunj-Borad-Resume.pdf" data-magnetic="true" className="contact-resume-btn">
              Download PDF ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
