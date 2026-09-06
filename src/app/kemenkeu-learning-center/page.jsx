"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sections = [
    { id: "tldr", label: "TL;DR" },
    { id: "about", label: "About KLC" },
    { id: "role-team", label: "Role & Team" },
    { id: "requirements", label: "1. Requirements" },
    { id: "process-analysis", label: "2. Process Analysis" },
    { id: "initial-design", label: "3. Initial Design" },
    { id: "testing", label: "4. Testing & Iterations" },
    { id: "results", label: "5. Results" },
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
            el.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div
            ref={container}
            className="flex items-start gap-10 px-[14%] pt-[12%]"
        >
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
                                    onClick={() =>
                                        scrollToSection(section.id)
                                    }
                                    className={`text-left py-2 pl-4 border-l-2 transition-all duration-300 cursor-pointer ${
                                        isActive
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
                    Re-engineering Kemenkeu Learning Center
                </h1>

                <p className="text-lg text-foreground-2 mb-10">
                    System Analysis & UI/UX Case Study - Kementerian Keuangan
                </p>

                {/* Hero Image */}
                <div className="rounded-2xl overflow-hidden mb-16 bg-neutral-100 h-96">
                    {/* Insert project cover image here */}
                </div>

                {/* TL;DR */}
                <section id="tldr" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        TL;DR
                    </h2>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        Kemenkeu Learning Center (KLC) is an internal learning
                        platform used to support training and professional
                        development within the Ministry of Finance. During the
                        re-engineering project, I contributed to analyzing the
                        existing system, identifying user and business
                        requirements, mapping current and proposed processes,
                        and translating the findings into structured system
                        requirements and interface designs.
                    </p>

                    <p className="text-foreground-2 leading-relaxed">
                        The project focused on improving the learning
                        experience through a more structured learning flow,
                        microlearning content, quizzes, personalization, and
                        integration with existing internal systems such as
                        HRIS, SSO, and SharePoint.
                    </p>
                </section>

                {/* About KLC */}
                <section id="about" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        About KLC
                    </h2>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        Kemenkeu Learning Center (KLC) is a learning platform
                        developed to support learning, training, and knowledge
                        development for employees within the Ministry of
                        Finance.
                    </p>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        As part of the re-engineering initiative, the existing
                        platform was reviewed to identify opportunities for
                        improving usability, learning flows, content
                        organization, and system capabilities.
                    </p>

                    <div className="bg-neutral-100 rounded-xl p-6 text-sm text-foreground-2 leading-relaxed">
                        Note on Confidentiality: This case study presents the
                        project at a high level. Certain internal information,
                        system details, datasets, and organizational processes
                        have been simplified or omitted for confidentiality.
                    </div>
                </section>

                {/* Role & Team */}
                <section id="role-team" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        Role & Team
                    </h2>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        <strong>Role:</strong> System Analyst & UI/UX Designer
                    </p>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        <strong>Project:</strong> Re-engineering Kemenkeu
                        Learning Center (KLC)
                    </p>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        My responsibilities covered requirements analysis,
                        business process mapping, documentation, and interface
                        design. I worked on translating stakeholder and user
                        needs into structured requirements and proposed system
                        solutions.
                    </p>

                    <p className="text-foreground-2 leading-relaxed">
                        The project involved collaboration with stakeholders,
                        business representatives, designers, and development
                        teams to align business requirements with technical
                        implementation.
                    </p>
                </section>

                {/* Requirements */}
                <section id="requirements" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        1. Requirements
                    </h2>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        The project started with gathering and analyzing
                        requirements from users and stakeholders. User research
                        involved{" "}
                        <strong>1,709 respondents</strong>, providing insights
                        into existing learning experiences, pain points, and
                        expectations toward the future platform.
                    </p>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        The findings were translated into functional and
                        business requirements covering key areas of the
                        learning platform.
                    </p>

                    <ul className="list-disc pl-6 text-foreground-2 leading-relaxed space-y-2">
                        <li>
                            Learning content and course management
                        </li>
                        <li>
                            Microlearning content with shorter learning
                            sessions
                        </li>
                        <li>
                            Quiz and assessment functionality
                        </li>
                        <li>
                            Personalized learning experience
                        </li>
                        <li>
                            User authentication and SSO integration
                        </li>
                        <li>
                            Integration with HRIS and SharePoint
                        </li>
                    </ul>
                </section>

                {/* Process Analysis */}
                <section id="process-analysis" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        2. Process Analysis
                    </h2>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        After identifying the requirements, I analyzed the
                        existing business and system processes to understand
                        how users interacted with the current KLC platform.
                    </p>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        Current-state processes were mapped to identify
                        bottlenecks, unnecessary steps, and opportunities for
                        improvement. The proposed processes were then
                        structured into clearer user flows and system
                        interactions.
                    </p>

                    <div className="rounded-xl overflow-hidden bg-neutral-100 h-80 mb-6">
                        {/* Insert BPMN / process flow image here */}
                    </div>

                    <p className="text-foreground-2 leading-relaxed">
                        The analysis helped establish a clearer relationship
                        between user activities, business rules, system
                        processes, and the required system functionality.
                    </p>
                </section>

                {/* Initial Design */}
                <section id="initial-design" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        3. Initial Design
                    </h2>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        Based on the requirements and process analysis, I
                        translated the proposed system flows into interface
                        designs and user journeys.
                    </p>

                    <p className="text-foreground-2 leading-relaxed mb-6">
                        The redesign explored a more structured learning
                        experience, including course discovery, learning
                        activities, microlearning, quizzes, and personalized
                        learning content.
                    </p>

                    <div className="rounded-xl overflow-hidden bg-neutral-100 h-80 mb-6">
                        {/* Insert UI/UX design image here */}
                    </div>

                    <div className="rounded-xl overflow-hidden bg-neutral-100 h-80">
                        {/* Insert additional UI/UX image here */}
                    </div>
                </section>

                {/* Testing */}
                <section id="testing" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        4. Testing & Iterations
                    </h2>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        The proposed designs and system flows were reviewed
                        against the identified requirements and user needs.
                        Feedback from stakeholders was used to refine the
                        information architecture, user flows, and interface
                        components.
                    </p>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        Iterations focused on improving clarity, reducing
                        unnecessary steps, and ensuring that the proposed
                        interface supported the intended business processes.
                    </p>

                    <div className="rounded-xl overflow-hidden bg-neutral-100 h-80 mb-6">
                        {/* Insert iteration / feedback image here */}
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                        Key Design Considerations
                    </h3>

                    <ul className="list-disc pl-6 text-foreground-2 leading-relaxed space-y-2">
                        <li>
                            Simplifying learning navigation and user flows
                        </li>
                        <li>
                            Making learning progress easier to understand
                        </li>
                        <li>
                            Structuring microlearning content into shorter
                            learning experiences
                        </li>
                        <li>
                            Improving quiz and assessment interactions
                        </li>
                        <li>
                            Aligning UI components with the proposed system
                            requirements
                        </li>
                    </ul>
                </section>

                {/* Results */}
                <section id="results" className="mb-16">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        5. Results
                    </h2>

                    <p className="text-foreground-2 leading-relaxed mb-4">
                        The analysis and design work resulted in a structured
                        set of system requirements, business process models,
                        user flows, and interface designs that could be used
                        as a reference for the re-engineering of KLC.
                    </p>

                    <ul className="list-disc pl-6 text-foreground-2 leading-relaxed space-y-2 mb-6">
                        <li>
                            Documented and structured functional requirements
                            for the proposed KLC system
                        </li>
                        <li>
                            Mapped current and proposed business processes
                        </li>
                        <li>
                            Translated user research findings into system and
                            interface requirements
                        </li>
                        <li>
                            Designed proposed user flows and UI/UX solutions
                        </li>
                        <li>
                            Established requirements for integrations with
                            HRIS, SSO, and SharePoint
                        </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                        Key Takeaways
                    </h3>

                    <p className="text-foreground-2 leading-relaxed">
                        This project strengthened my experience in bridging
                        user needs, business processes, and system
                        requirements. It also allowed me to work across both
                        analysis and UI/UX activities, ensuring that proposed
                        solutions were not only visually usable but also
                        aligned with the underlying business and system
                        processes.
                    </p>
                </section>
            </main>
        </div>
    );
}
