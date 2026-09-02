import Contact from "@/components/layouts/contact";
import Hero from "@/components/layouts/hero";
import Journey from "@/components/layouts/journey";
import Projects from "@/components/layouts/projects";

export default function Home() {
  return (
    <section className="h-full">
      <Hero />
      <Projects />
      <Journey />
      <Contact />
    </section>
  );
}
