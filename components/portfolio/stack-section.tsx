import { stackData } from "@/lib/data";

const FILTERS = [{ id: "all", label: "All" }, ...stackData.map((g) => ({ id: g.id, label: g.label }))];

export default function StackSection() {
  return (
    <section id="stack" className="section section--alt">
      <div className="section-inner">
        <p className="section-eyebrow">05 — Stack</p>
        <div className="section-head">
          <h2 data-anim="riseIn" data-reveal="entry 4% cover 26%">
            What I reach for
          </h2>
          <p>Filter by layer. Everything here has shipped to production.</p>
        </div>

        <div className="stack-filters" role="group" aria-label="Filter stack by layer">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              data-filter={filter.id}
              aria-pressed={filter.id === "all"}
              data-magnetic="true"
              className="stack-filter-btn"
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="stack-groups">
          {stackData.map((group, i) => (
            <div
              key={group.id}
              data-cat={group.id}
              className="stack-group"
              data-anim="riseIn"
              data-reveal={`entry ${4 + (i % 3) * 3}% cover ${24 + (i % 3) * 3}%`}
            >
              <h3 className="stack-group__title">{group.label}</h3>
              <ul className="stack-group__list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
