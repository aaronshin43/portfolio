import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Research } from "@/components/sections/Research";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Honors } from "@/components/sections/Honors";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <main id="main-content">
        <section id="hero" className="scroll-mt-20">
          <Hero />
        </section>
        <section id="about" className="scroll-mt-20">
          <About />
        </section>
        <section id="research" className="scroll-mt-20">
          <Research />
        </section>
        <section id="projects" className="scroll-mt-20">
          <Projects />
        </section>
        <section id="experience" className="scroll-mt-20">
          <Experience />
        </section>
        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>
        <section id="honors" className="scroll-mt-20">
          <Honors />
        </section>
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}
