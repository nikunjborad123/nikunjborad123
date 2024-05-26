import About from '@/components/about';
import Experience from '@/components/experience';
import Contact from '@/components/contact';
import Projects from '@/components/projects/projects';
import SectionDivider from '@/components/section-divider';
import Skills from '@/components/skills';
import dynamic from 'next/dynamic';

const Intro = dynamic(() => import('@/components/intro'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
