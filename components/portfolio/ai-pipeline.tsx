import { aiPipelineData } from "@/lib/data";

export default function AiPipeline() {
  return (
    <section id="ai" className="section section--clip">
      <div className="ai-blur" aria-hidden="true" data-anim="drift" data-reveal="entry 0% exit 100%" />
      <div className="section-inner" style={{ position: "relative" }}>
        <p className="section-eyebrow">06 — AI-augmented engineering</p>
        <div className="section-head">
          <h2 style={{ maxWidth: "22ch" }} data-anim="riseIn" data-reveal="entry 4% cover 26%">
            AI is in the toolchain, <em style={{ fontStyle: "italic", color: "var(--acc)" }}>not</em> the shortcut
          </h2>
          <p>
            Specification → implementation plan → generated scaffold → human review → tests, so generated code meets the
            same bar as hand-written code. ~40% more feature throughput, same review gates.
          </p>
        </div>

        <ol data-pipeline className="pipeline">
          {aiPipelineData.map((step, i) => (
            <li key={step.title} data-step="true" className="pipeline__item">
              <button type="button" data-step-toggle="true" aria-expanded={i === 0} data-magnetic="true" className="pipeline__toggle">
                <span className="pipeline__step-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pipeline__step-title">{step.title}</span>
                <span data-step-icon="true" aria-hidden="true" className="pipeline__icon" data-open={i === 0}>
                  +
                </span>
              </button>
              <div data-step-body="true" className="pipeline__body">
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
