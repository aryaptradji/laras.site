import Contact from "@/components/layouts/contact";
import Footer from "@/components/layouts/footer";
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
      <Footer />
    </section>
  );
}
