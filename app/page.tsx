import PortfolioInteractions from "@/components/portfolio/portfolio-interactions";
import SiteHeader from "@/components/portfolio/site-header";
import SectionRail from "@/components/portfolio/section-rail";
import Hero from "@/components/portfolio/hero";
import TechMarquee from "@/components/portfolio/tech-marquee";
import WorkSection from "@/components/portfolio/work-section";
import PerformanceLab from "@/components/portfolio/performance-lab";
import ExperienceTimeline from "@/components/portfolio/experience-timeline";
import StackSection from "@/components/portfolio/stack-section";
import AiPipeline from "@/components/portfolio/ai-pipeline";
import AboutSection from "@/components/portfolio/about-section";
import ContactSection from "@/components/portfolio/contact-section";
import SiteFooter from "@/components/portfolio/site-footer";

export default function Home() {
  return (
    <PortfolioInteractions>
      <SiteHeader />
      <SectionRail />
      <main>
        <Hero />
        <TechMarquee />
        <WorkSection />
        <PerformanceLab />
        <ExperienceTimeline />
        <StackSection />
        <AiPipeline />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </PortfolioInteractions>
  );
}
