import { railLinks } from "@/lib/data";

export default function SectionRail() {
  return (
    <nav className="rail" aria-label="Section navigation">
      {railLinks.map((link) => (
        <a key={link.id} href={`#${link.id}`} data-rail={link.id} className="rail__link">
          <span>{link.label}</span>
          <span className="rail__tick" />
        </a>
      ))}
    </nav>
  );
}
