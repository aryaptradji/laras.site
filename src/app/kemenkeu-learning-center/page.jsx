"use client";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { FiArrowLeft } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
    FiArrowLeft,
    FiX,
    FiZoomIn,
    FiZoomOut,
    FiRotateCcw
} from "react-icons/fi";
import { createPortal } from "react-dom";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const sections = [
    { id: "tldr", label: "TL;DR" },
    { id: "role", label: "Role & Scope" },
    { id: "requirements", label: "Requirements" },
    { id: "process-design", label: "Design Before & After" },
    { id: "results", label: "Results" },
];

const FIGURES = {
    cover: { src: "/assets/klc/cover.png", alt: "KLC cover image" },
};

const META = [
    { label: "Role", value: "System Analyst & UI/UX Designer" },
    { label: "Project", value: "Re-engineering KLC" },
    { label: "Year", value: "2026" },
];

const STATS = [
    { value: "1,709", label: "Survey respondents" },
    { value: "7", label: "Modules in scope" },
    { value: "96", label: "Functional requirements" },
];

const RESPONSIBILITIES = [
    "Business Requirements Document (BRD): problem analysis, functional and non-functional requirements, business rules, and constraints",
    "Business process mapping with BPMN, use case diagrams, and flowcharts for each module",
    "Information architecture, user flows, wireframes, and an interactive Figma prototype",
];

const SCOPE = {
    inScope: [
        "Web platform only (desktop)",
        "Login & profile, Training (LMS), Knowledge Center (KMS), Kemenkeupedia, Help & Kemenkeu PRIME, KLC Assistant, Quiz",
        "Navigation, information architecture, cross-module flows, visual consistency, and accessibility enhancements",
    ],
    outOfScope: [
        "Mobile apps (Android/iOS)",
        "Organizational policy changes",
        "Modules documented separately (e.g. Community of Practice)",
    ],
};

const PROBLEMS = [
    {
        title: "User experience",
        desc: "Navigation did not reflect user goals, and dense screens made content hard to find, especially in KMS and Kemenkeupedia.",
    },
    {
        title: "Adoption & engagement",
        desc: "Usage centered on mandatory training, while non-training modules had low adoption and few engagement triggers.",
    },
    {
        title: "Reliability",
        desc: "Unstable login, errors, and buffering caused lost learning progress and manual certificate handling.",
    },
    {
        title: "Fit with work context",
        desc: "Content was not tailored to job roles, and formats did not fit limited working time.",
    },
];

const REQUIREMENT_AREAS = [
    {
        title: "Access & onboarding",
        items: [
            "SSO login for Kemenkeu employees, manual login for external users",
            "Registration, verification, and password reset",
            "Clear first-time guidance",
        ],
    },
    {
        title: "Finding & choosing content",
        items: [
            "Search and filters by category and unit",
            "Contextual recommendations based on role and activity",
            "Playlists (KMS) and bookmarks (LMS)",
        ],
    },
    {
        title: "Learning & progress",
        items: [
            "Flexible, downloadable materials",
            "Clear progress, quizzes, and evaluation",
            "Certificates integrated with HRIS and LinkedIn",
        ],
    },
    {
        title: "Collaboration & support",
        items: [
            "KLC Assistant chatbot and navigation help",
            "FAQ and Kemenkeu PRIME help tickets",
            "Discussions and chat with training PIC",
        ],
    },
];

const NON_FUNCTIONAL =
    "Non-functional requirements cover role-based access with SSO, a 30-minute session timeout, pages loading within 3 seconds, stable performance under peak load, HRIS integration, and audit support.";

const DESIGN_CHANGES = [
    {
        title: "Login Screen",
        before: { src: "/assets/klc/loginKlc.png", alt: "Login screen before the redesign" },
        after: { src: "/assets/klc/loginEksternal.png", alt: "Login screen after the redesign" },
        points: [
            "Redesigned the login interface with a cleaner layout and fewer visual distractions to simplify the sign-in experience.",
            "Separated authentication flows for internal employees using SSO and external users using manual login, with clearer error messages and guidance.",
        ],
    },
    {
        title: "Homepage",
        before: { src: "/assets/klc/homepageBefore.png", alt: "Homepage before the redesign" },
        after: { src: "/assets/klc/homepageAfter.png", alt: "Homepage after the redesign" },
        points: [
            "Redesigned the homepage with a cleaner layout, reducing visual clutter from excessive banners, decorative backgrounds, and dense content sections.",
            "Simplified the navigation and organized key services into four accessible categories: Training, Knowledge Center, Community of Practice (CoP), and Kemenkeupedia.",
            "Improved content discoverability by grouping training courses and knowledge resources into dedicated sections with clearer cards, labels, and filtering options.",
            "Introduced quick-access information, including platform statistics, upcoming events, social media updates, and FAQs, to make the homepage more informative and easier to explore.",
            "Refined the visual hierarchy with consistent spacing, modern card components, and a cohesive blue-and-white color palette that maintains Kemenkeu's visual identity."
        ],
    },

    {
        title: "Training List",
        before: [
            {
                src: "/assets/klc/daftarPelatihanBefore.png",
                alt: "Training list before the redesign"
            },
            {
                src: "/assets/klc/detailPelatihanBefore.png",
                alt: "Training detail before the redesign"
            }
        ],
        after: [
            {
                src: "/assets/klc/daftarPelatihanAfter.png",
                alt: "Training list after the redesign"
            },
            {
                src: "/assets/klc/detailPelatihanAfter.png",
                alt: "Training detail after the redesign"
            }
        ],

        points: [
            "Redesigned the training catalog with a cleaner card layout, consistent spacing, and clearer course information for easier browsing.",
            "Introduced a dedicated filter sidebar with categories, enrollment types, learning formats, and training providers, along with sorting and pagination options.",
            "Restructured the training detail page into a two-column layout, separating course descriptions and learning materials from registration details and key information.",
            "Added a prominent registration button, bookmark option, enrollment deadline, and course details to help users make informed decisions.",
            "Improved content discovery with organized learning modules, a more visual review section, and related training recommendations."
        ],

    },
    {
        title: "Learning & Microlearning",
        before: { src: "/assets/klc/microlearningBefore.png", alt: "Learning page before the redesign" },
        after: { src: "/assets/klc/microlearningAfter.png", alt: "Learning page after the redesign" },
        points: [
            "Redesigned the learning experience around shorter, 3–5 minute video sessions to better accommodate busy work schedules.",
            "Improved access to learning materials by allowing users to download PDFs without completing quizzes first.",
            "Enhanced video player usability with playback speed, quality controls, and clearer learning progress indicators.",
        ],
    },
    {
        title: "AI Assistant (New Feature)",
        intro: "The KLC AI Assistant is designed to help users access training information, navigate the platform, and check their learning progress through a simple, conversational interface.",
        before: null,
        after: {
            src: "/assets/klc/aiAssistant.png",
            alt: "KLC AI Assistant showing welcome messages, quick-access topics, chat interactions, and learning progress updates",
        },
        points: [
            "Introduced a chatbot interface with a welcome message and clear guidance on available assistance.",
            "Added quick-access topics for platform guides, tax information, and available training programs.",
            "Designed a conversational interface where users can ask questions and receive responses about training and platform services.",
            "Included personalized learning progress updates to help users track completed modules and stay motivated.",
        ],
    },
    {
        title: "Quiz - Host View (New Feature)",
        intro: "Accessible directly from the KLC homepage through the Quiz menu, this new Kahoot-inspired feature allows users to create or join interactive quizzes. Hosts can customize questions, manage live sessions, and monitor participant performance, while participants can join using a game PIN, personalize their avatars, and compete on leaderboards. The feature aims to encourage active participation, improve learning engagement, and make knowledge assessments more enjoyable.",
        before: null,
        after: {
            src: "/assets/klc/kuisHost.png",
            alt: "Quiz host interface showing quiz creation, live answer monitoring, leaderboard, and confirmation dialog",
        },
        points: [
            "Hosts can create and customize quizzes by adding questions, answer options, time limits, and scores.",
            "A real-time dashboard displays participants' answers, response distribution, and quiz performance.",
            "A live scoreboard ranks participants based on their performance throughout the quiz.",
            "Hosts can navigate between questions and end the quiz with a confirmation dialog to prevent accidental actions.",
        ],
    },
    {
        title: "Quiz - Participant View",
        before: null,
        after: {
            src: "/assets/klc/kuisPeserta.png",
            alt: "Quiz participant interface showing PIN entry, avatar customization, interactive questions, and final leaderboard",
        },
        points: [
            "Participants can join a quiz using a game PIN without going through a complicated registration process.",
            "Participants can customize their avatars before entering the quiz, creating a more personalized experience.",
            "Interactive multiple-choice questions feature colorful answer options and a countdown timer.",
            "A final leaderboard highlights the top three participants with their personalized avatars, encouraging friendly competition.",
        ],
    },

    {
        title: "Accessibility Features (New Feature)",
        intro: "Designed a dedicated accessibility menu with customizable display settings, contrast adjustments, color saturation options, and reading aids to accommodate different visual needs and create a more inclusive learning experience.",
        before: null,
        after: {
            src: "/assets/klc/accessibility.png",
            alt: "Accessibility settings featuring dark mode and color adjustments",
        },
        points: [
            "Added light and dark mode options to provide a more comfortable viewing experience.",
            "Introduced high, light, and dark contrast settings to improve text and interface visibility.",
            "Included monochrome, low saturation, and high saturation options to accommodate different visual preferences.",
            "Designed accessibility tools such as a larger cursor, reading guide, and reading mask to support easier navigation and reading.",
            "Added a reset settings button and an Accessibility Statement for easier control and transparency.",
        ],
    },
];

const RESULTS = [
    "BRD v1.0 documenting 96 core functional requirements, non-functional requirements, and business rules within the main KLC scope.",
    "Developed internal BPMN models, use case diagrams, and flowcharts to document current and proposed business processes.",
    "User flows, wireframes, and interactive Figma prototypes based on user research and stakeholder feedback.",
    "A three-phase roadmap focused on infrastructure stability, UI modernization, personalization, and long-term user engagement.",
];

function ImageLightbox({ src, alt, onClose }) {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });

    const zoomIn = () => {
        setScale((prev) => Math.min(prev + 0.25, 4));
    };

    const zoomOut = () => {
        setScale((prev) => {
            const next = Math.max(prev - 0.25, 1);

            if (next === 1) {
                setPosition({ x: 0, y: 0 });
            }

            return next;
        });
    };

    const resetZoom = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleWheel = (e) => {
        if (e.deltaY < 0) zoomIn();
        else zoomOut();
    };

    const handlePointerDown = (e) => {
        if (scale <= 1) return;

        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);

        dragStart.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    const handlePointerMove = (e) => {
        if (!dragging) return;

        setPosition({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y,
        });
    };

    const handlePointerUp = () => {
        setDragging(false);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose]);

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/80 flex flex-col items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                aria-label="Close image"
                className="absolute top-5 right-5 z-20 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white cursor-pointer"
            >
                <FiX size={26} />
            </button>

            {/* Image container */}
            <div
                className="relative w-full max-w-6xl h-[75vh] flex items-center justify-center overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                onWheel={handleWheel}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                style={{
                    cursor: scale > 1
                        ? dragging ? "grabbing" : "grab"
                        : "zoom-in",
                    touchAction: "none",
                }}
            >
                <Image
                    src={src}
                    alt={alt || "Preview image"}
                    width={1600}
                    height={1200}
                    unoptimized
                    draggable={false}
                    className="block w-auto h-auto max-w-full max-h-full object-contain select-none"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transition: dragging ? "none" : "transform 0.15s ease",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!dragging) zoomIn();
                    }}
                />
            </div>

            {/* Zoom controls */}
            <div
                className="flex items-center gap-3 mt-4 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 text-white"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={zoomOut}
                    aria-label="Zoom out"
                    className="hover:text-gray-300 cursor-pointer"
                >
                    <FiZoomOut size={20} />
                </button>

                <span className="text-sm min-w-12 text-center">
                    {Math.round(scale * 100)}%
                </span>

                <button
                    onClick={zoomIn}
                    aria-label="Zoom in"
                    className="hover:text-gray-300 cursor-pointer"
                >
                    <FiZoomIn size={20} />
                </button>

                <button
                    onClick={resetZoom}
                    aria-label="Reset zoom"
                    className="ml-2 hover:text-gray-300 cursor-pointer"
                >
                    <FiRotateCcw size={18} />
                </button>
            </div>

            {/* Image caption */}
            <p className="mt-3 text-sm text-white/80 text-center">
                {alt}
            </p>

            <p className="mt-1 text-xs text-white/50 text-center">
                Click image to zoom · Scroll to zoom · Drag to pan · ESC to close
            </p>
        </div>,
        document.body
    );
}

function Figure({
    src,
    alt,
    className = "h-80",
    contain = false
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className={`
                    relative w-full
                    rounded-2xl
                    overflow-hidden
                    bg-[#EDF2F5]
                    flex items-center justify-center
                    ${className}
                    ${src ? "cursor-zoom-in group" : ""}
                `}
                onClick={() => src && setIsOpen(true)}
                role={src ? "button" : undefined}
                tabIndex={src ? 0 : undefined}
                onKeyDown={(e) => {
                    if (
                        src &&
                        (e.key === "Enter" || e.key === " ")
                    ) {
                        e.preventDefault();
                        setIsOpen(true);
                    }
                }}
            >
                {src ? (
                    <>
                        <div className="relative w-full h-full flex items-center justify-center p-5">
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                sizes="(min-width: 1024px) 768px, 90vw"
                                className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                        </div>

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                            <FiZoomIn
                                size={28}
                                className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex h-full items-center justify-center px-6 text-center text-sm text-[#2e4150]">
                        {alt}
                    </div>
                )}
            </div>

            {isOpen && src && (
                <ImageLightbox
                    src={src}
                    alt={alt}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}


function BulletList({ items }) {
    return (
        <ul className="list-disc pl-6 text-[#2e4150] leading-relaxed space-y-2">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

function BeforeAfter({ item, index }) {
    const beforeImages = item.before
        ? Array.isArray(item.before)
            ? item.before
            : [item.before]
        : [];

    const afterImages = Array.isArray(item.after)
        ? item.after
        : [item.after];

    return (
        <div className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-4">
                {index + 1}. {item.title}
            </h3>
            {item.intro && (
                <p className="text-[#2e4150] leading-relaxed mb-6">
                    {item.intro}
                </p>
            )}

            <div className={`grid gap-3 mb-5 ${beforeImages.length > 0
                ? "sm:grid-cols-2"
                : "grid-cols-1"
                }`}>

                {afterImages.map((after, i) => (
                    <Fragment key={i}>
                        {beforeImages[i] && (
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-[#2e4150] mb-2">
                                    Before
                                </p>
                                <Figure
                                    {...beforeImages[i]}
                                    className="h-80"
                                    contain
                                />
                            </div>
                        )}

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-accent mb-2">
                                {beforeImages[i] ? "After" : "New"}
                            </p>
                            <Figure
                                {...after}
                                className={beforeImages.length > 0 ? "h-80" : "h-96"}
                                contain
                            />
                        </div>
                    </Fragment>
                ))}
            </div>

            <BulletList items={item.points} />
        </div>
    );
}


export default function ProjectDetail() {
    const [activeId, setActiveId] = useState(sections[0].id);
    const bookmarks = useRef(null);
    const content = useRef(null);
    const title = useRef(null);
    const subtitle = useRef(null);
    const img = useRef(null);

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
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            ScrollTrigger.create({
                trigger: content.current,
                start: "top 12%",
                end: () => `+=${content.current.offsetHeight - bookmarks.current.offsetHeight}`,
                pin: bookmarks.current,
                pinSpacing: false,
            });
        });

        gsap.timeline({ defaults: { ease: "power2.out" } })
            .fromTo(bookmarks.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })
            .fromTo(title.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0)
            .fromTo(subtitle.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0)
            .fromTo(img.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "<0.2");

        return () => mm.revert();
    }, []);

    const scrollToSection = (id) => {
        const smoother = ScrollSmoother.get();
        const el = document.getElementById(id);

        if (smoother && el) {
            smoother.scrollTo(el, true, "top 6%");
        } else if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const backToHome = () => window.dispatchEvent(new CustomEvent("showNavbar"));

    return (
        <div className="flex items-start gap-10 px-6 sm:px-[8%] lg:px-[14%] pt-28 lg:pt-[12%] pb-24">
            <div className="hidden lg:block w-56 shrink-0">
                <aside ref={bookmarks} className="h-fit">
                    <Link
                        href="/"
                        onClick={backToHome}
                        className="flex items-center gap-2 text-[#2e4150] hover:text-accent transition-colors duration-300 mb-4"
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
                                        ? "border-accent text-[#2e4150] font-medium"
                                        : "border-neutral-200 text-[#9CA3AF] hover:text-[#2e4150] hover:border-neutral-400"
                                        }`}

                                >
                                    {section.label}
                                </button>
                            );
                        })}
                    </nav>
                </aside>
            </div>

            <main ref={content} className="w-full max-w-3xl">
                <Link
                    href="/"
                    onClick={backToHome}
                    className="lg:hidden flex items-center gap-2 text-[#2e4150] hover:text-accent transition-colors duration-300 mb-6"
                >
                    <FiArrowLeft size={18} />
                    Back
                </Link>

                <h1 ref={title} className="text-3xl font-semibold text-foreground mb-2">
                    Re-engineering Kemenkeu Learning Center
                </h1>

                <p ref={subtitle} className="text-lg text-[#2e4150] mb-8">
                    System Analyst & UI/UX Designer - Kementerian Keuangan (BPPK)
                </p>

                <div ref={img} className="mb-14">
                    <div className="relative w-full h-72 sm:h-96 overflow-hidden rounded-2xl">
                        <Image
                            src={FIGURES.cover.src}
                            alt={FIGURES.cover.alt}
                            fill
                            priority
                            sizes="(min-width: 1024px) 768px, 90vw"
                            className="object-cover"
                        />
                    </div>
                </div>

                <section id="tldr" className="mb-14">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">TL;DR</h2>

                    <p className="text-[#2e4150] leading-relaxed mb-4">
                        Kemenkeu Learning Center (KLC) is the Ministry of Finance&apos;s platform that
                        brings together training (LMS), a knowledge center (KMS), and knowledge sharing.
                        A survey of 1,709 users showed friction in navigation, content search, and
                        reliability, and low adoption beyond mandatory training.
                    </p>

                    <p className="text-[#2e4150] leading-relaxed mb-6">
                        I translated these findings into a BRD, mapped current and proposed business processes, and designed a more intuitive and accessible web experience. Key improvements included streamlined navigation, microlearning, an AI assistant, and a Kahoot-inspired quiz to support user engagement.
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {STATS.map((s) => (
                            <div
                                key={s.label}
                                className="rounded-2xl border border-neutral-200 bg-secondary px-3 py-5 text-center"
                            >
                                <p className="text-2xl sm:text-3xl font-medium text-accent">{s.value}</p>
                                <p className="text-xs sm:text-sm text-[#2e4150] mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-neutral-100 rounded-xl p-5 text-sm text-[#2e4150] leading-relaxed">
                        Note on confidentiality: this case study is shown at a high level. Internal
                        details, datasets, and organizational processes are simplified or omitted.
                    </div>
                </section>

                <section id="role" className="mb-14">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Role & Scope</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                        {META.map((m) => (
                            <div key={m.label} className="rounded-2xl border border-neutral-200 bg-secondary p-4">
                                <p className="text-xs text-[#2e4150]">{m.label}</p>
                                <p className="text-foreground font-medium mt-1">{m.value}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-[#2e4150] leading-relaxed mb-4">
                        I worked with stakeholders, business representatives, designers, and developers
                        to align business requirements with technical implementation. My work covered:
                    </p>

                    <div className="mb-8">
                        <BulletList items={RESPONSIBILITIES} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-neutral-200 bg-secondary p-5">
                            <h3 className="text-foreground font-medium mb-3">In scope</h3>
                            <BulletList items={SCOPE.inScope} />
                        </div>
                        <div className="rounded-2xl border border-neutral-200 bg-secondary p-5">
                            <h3 className="text-foreground font-medium mb-3">Out of scope</h3>
                            <BulletList items={SCOPE.outOfScope} />
                        </div>
                    </div>
                </section>

                <section id="requirements" className="mb-14">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Requirements</h2>

                    <p className="text-[#2e4150] leading-relaxed mb-4">
                        I started with a survey of <strong>1,709 respondents</strong> (1,467 internal and
                        242 external users) to understand pain points and expectations. Four problem
                        areas emerged:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {PROBLEMS.map((p) => (
                            <div key={p.title} className="rounded-2xl border border-neutral-200 bg-secondary p-5">
                                <h3 className="text-foreground font-medium mb-2">{p.title}</h3>
                                <p className="text-sm text-[#2e4150] leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-[#2e4150] leading-relaxed mb-6">
                        Usability and system speed ranked as the top priorities for both internal and
                        external users. Internal users also asked for an AI assistant and better search,
                        while external users needed easier login and usage guides. These findings became{" "}
                        <strong>96 functional requirements</strong> grouped into four areas:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {REQUIREMENT_AREAS.map((area) => (
                            <div key={area.title} className="rounded-2xl border border-neutral-200 bg-secondary p-5">
                                <h3 className="text-foreground font-medium mb-3">{area.title}</h3>
                                <BulletList items={area.items} />
                            </div>
                        ))}
                    </div>

                    <p className="text-[#2e4150] leading-relaxed">{NON_FUNCTIONAL}</p>
                </section>

                <section id="process-design" className="mb-14">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        Design: Before & After
                    </h2>

                    <p className="text-[#2e4150] leading-relaxed mb-10">
                        Once the flows were mapped, I turned them into a simpler, friendlier web
                        experience. Here are the key screens side by side, with the reasoning behind
                        each change.
                    </p>

                    {DESIGN_CHANGES.map((item, i) => (
                        <BeforeAfter key={item.title} item={item} index={i} />
                    ))}

                    {/* <p className="text-[#2e4150] leading-relaxed">
                        Beyond individual screens, I also added accessibility options like dark mode
                        and color adjustments, so the platform works for more kinds of users.
                        Stakeholder feedback along the way helped refine the information architecture,
                        user flows, and components.
                    </p> */}
                </section>


                <section id="results">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        Results
                    </h2>

                    <p className="text-[#2e4150] leading-relaxed mb-4">
                        The project delivered a structured set of business
                        requirements, process models, and interactive design
                        prototypes to guide the re-engineering of KLC.
                        These deliverables established a foundation for improving
                        platform usability, content discoverability,
                        accessibility, and user engagement.
                    </p>

                    <div className="mb-8">
                        <BulletList items={RESULTS} />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                        Key Takeaway
                    </h3>

                    <p className="text-[#2e4150] leading-relaxed">
                        This project strengthened my ability to bridge business
                        analysis and UI/UX design, translating user research and
                        organizational requirements into practical, user-centered
                        solutions. Through business process mapping, interactive
                        prototyping, and accessibility-focused design, I gained
                        a deeper understanding of how to balance user needs,
                        technical considerations, and business goals.
                    </p>
                </section>

            </main>
        </div>
    );
}