"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sections = [
    { id: "tldr", label: "TL;DR" },
    { id: "about", label: "About Alodokter" },
    { id: "role-team", label: "Role & Team" },
    { id: "requirements", label: "1: Requirements" },
    { id: "initial-design", label: "2. Initial Design" },
    { id: "testing", label: "3: Testing and Iterations" },
    { id: "results", label: "4: Results" },
];

export default function ProjectDetail() {
    const [activeId, setActiveId] = useState(sections[0].id);
    const bookmarks = useRef(null);
    const content = useRef(null);
    const container = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: content.current,
            start: "top 12%",
            end: () => {
                const contentHeight = content.current.offsetHeight;
                const bookmarkHeight = bookmarks.current.offsetHeight;

                return `+=${contentHeight - bookmarkHeight}`;
            },
            pin: bookmarks.current,
            pinSpacing: false,
            markers: true,
        });
    }, []);

    const scrollToSection = (id) => {
        const smoother = ScrollSmoother.get();
        const el = document.getElementById(id);
        if (smoother && el) {
            smoother.scrollTo(el, true, "top 15%");
        } else if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div ref={container} className="flex items-start gap-10 px-[14%] pt-[12%]">
            {/* Bookmarks */}
            <div className="w-56">
                <aside ref={bookmarks} className="h-fit">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-foreground-2 hover:text-accent transition-colors duration-300 mb-4"
                    >
                        <FiArrowLeft size={18} />
                        Back
                    </Link>
                
                    <nav className="flex flex-col">
                        {sections.map((section) => {
                            const isActive = activeId === section.id;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`text-left py-2 pl-4 border-l-2 transition-all duration-300 cursor-pointer ${isActive
                                        ? "border-accent text-foreground font-medium"
                                        : "border-neutral-200 text-foreground-2 hover:text-foreground hover:border-neutral-300"
                                        }`}
                                >
                                    {section.label}
                                </button>
                            );
                        })}
                    </nav>
                </aside>
            </div>

            {/* Content */}
            <main ref={content} className="max-w-3xl">
                <h1 className="text-4xl font-semibold text-foreground mb-2">
                    Modernizing Medical Intake with Interactive AI Workflows
                </h1>
                <p className="text-lg text-foreground-2 mb-10">
                    Product Design Case Study - Alodokter
                </p>

                <div className="rounded-2xl overflow-hidden mb-16 bg-blue-500 h-96" />

                <section id="tldr" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">TL;DR</h2>
                    <p className="text-foreground-2 leading-relaxed mb-4">
                        In Alodokter&apos;s online consultations, doctors were spending half their
                        consultation time asking basic, repetitive questions (&quot;How long have
                        you felt like this?&quot;, &quot;Is it sharp or dull?&quot;) because our
                        existing pre-chat system was just a rigid decision tree with broad LLM
                        questions.
                    </p>
                    <p className="text-foreground-2 leading-relaxed">
                        Instead, we brought in an Adaptive AI Assistant. Doctors join the chat
                        right away, but while (for example) they&apos;re handling other patients,
                        the AI does the heavy lifting: asking dynamic follow-ups with quick buttons
                        and text fields. The doctor just watches the live thread and jumps in fully
                        once the AI hands off a structured summary.
                    </p>
                </section>

                <section id="about" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">About Alodokter</h2>
                    <p className="text-foreground-2 leading-relaxed mb-4">
                        As the biggest health-tech app in Indonesia, Alodokter is connecting tens
                        of thousands of registered doctors and medical facilities with over 30
                        million monthly active users. The platform offers online doctor
                        consultations, appointment booking for hospitals and clinics, prescription
                        drug delivery through AloShop, health insurance integration via
                        AloProtection, and a specialized platform for medical professionals called
                        Alomedika.
                    </p>
                    <div className="bg-neutral-100 rounded-xl p-6 text-sm text-foreground-2 leading-relaxed">
                        Note on Confidentiality: To honor non-disclosure agreements, I will not
                        mention specific technologies, model frameworks, and proprietary business
                        metrics. All visual assets have been sanitized and translated to English
                        for public presentation.
                    </div>
                </section>

                <section id="role-team" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Role & Team</h2>
                    <p className="text-foreground-2 leading-relaxed">
                        Konten role & team di sini...
                    </p>
                </section>

                <section id="requirements" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">1: Requirements</h2>
                    <p className="text-foreground-2 leading-relaxed">
                        Konten requirements di sini...
                    </p>
                </section>

                <section id="initial-design" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">2. Initial Design</h2>
                    <p className="text-foreground-2 leading-relaxed">
                        Konten initial design di sini...
                    </p>
                </section>

                <section id="testing" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        3: Testing and Iterations
                    </h2>
                    <p className="text-foreground-2 leading-relaxed">
                        Konten testing di sini...
                    </p>
                </section>

                <section id="results">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">4: Results</h2>
                    <p className="text-foreground-2 leading-relaxed">
                        Konten results di sini...
                    </p>
                </section>
            </main>
        </div>
    );
}