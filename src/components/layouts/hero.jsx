"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiDownload, FiGithub } from "react-icons/fi";
import {
    LuClipboardCheck,
    LuClipboardList,
    LuCode,
    LuMail,
    LuSearch,
    LuServer,
    LuZap,
} from "react-icons/lu";
import { PiLinkedinLogo } from "react-icons/pi";
import LogoLoop from "../elements/logoLoop";
import { scrollToSection } from "@/lib/scroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TECH = [
    { name: "Postman", file: "postman", href: "https://postman.com" },
    { name: "Katalon", file: "katalon", href: "https://katalon.com" },
    { name: "Cucumber", file: "cucumber", href: "https://cucumber.io" },
    { name: "Git", file: "git", href: "https://git-scm.com" },
    { name: "GitHub", file: "github", href: "https://github.com" },
    { name: "Trello", file: "trello", href: "https://trello.com" },
    { name: "Excel", file: "excel", href: "https://office.microsoft.com/excel" },
    { name: "Power BI", file: "powerbi", href: "https://powerbi.microsoft.com" },
    { name: "MySQL", file: "mysql", href: "https://mysql.com" },
    { name: "PostgreSQL", file: "postgresql", href: "https://postgresql.org" },
    { name: "JavaScript", file: "javascript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "Python", file: "python", href: "https://python.org" },
    { name: "PHP", file: "php", href: "https://php.net" },
    { name: "Laravel", file: "laravel", href: "https://laravel.com" },
    { name: "HTML5", file: "html5", href: "https://html.spec.whatwg.org/" },
    { name: "CSS", file: "css", href: "https://www.w3.org/Style/CSS/" },
    { name: "Figma", file: "figma", href: "https://figma.com" },
    { name: "Canva", file: "canva", href: "https://canva.com" },
];

const QA_FOCUS = ["Manual Testing", "API Testing", "Test Automation", "Test Case Design", "Bug Reporting"];

const GALLERY = [
    { src: "/assets/heroimg4.jpeg", pos: "object-center" },
    { src: "/assets/hero-profile.png", pos: "object-[20%_35%]" },
    { src: "/assets/heroimg3.jpeg", pos: "object-center" },
];
const STATS = [
    { value: "999+", label: "Test Cases Executed" },
    { value: "4", label: "Testing Areas" },
    { value: "2", label: "QA Training Programs" },
    { value: "100+", label: "Defects Reported" },
];

const HIGHLIGHTS = [
    {
        icon: LuSearch,
        title: "QA Excellence",
        text: "Hands-on experience in manual and automation testing across web, API, and mobile applications.",
    },
    {
        icon: LuZap,
        title: "Automation Mindset",
        text: "Developing automation skills with Selenium WebDriver, REST Assured, Serenity BDD, and Appium.",
    },
    {
        icon: LuCode,
        title: "Dev & Analyst Perspective",
        text: "Background in system analysis, back-end development, and data helps me understand requirements and software behavior.",
    },
];

const SKILL_GROUPS = [
    {
        title: "QA Skills",
        items: [
            "Manual Testing",
            "Functional Testing",
            "Regression Testing",
            "Exploratory Testing",
            "Black Box Testing",
            "API Testing",
            "Test Case Design",
            "Test Plan",
            "UAT",
        ],
    },
    {
        title: "Automation & Tools",
        items: [
            "Selenium WebDriver",
            "Postman",
            "REST Assured",
            "Serenity BDD",
            "Cucumber",
            "Appium",
            "JMeter",
            "Git",
            "JIRA",
            "Trello",
        ],
    },
    {
        title: "Programming / Analysis",
        items: [
            "Java",
            "JavaScript",
            "Python",
            "SQL",
            "Laravel",
            "PHP",
            "Requirements Analysis",
            "BPMN",
            "Use Case",
        ],
    },
];

const EXPERTISE = [
    {
        icon: LuClipboardList,
        title: "Manual & Functional Testing",
        points: ["Test case and test plan creation", "Functional and integration testing", "Black box testing and UAT"],
    },
    {
        icon: LuServer,
        title: "API Testing",
        points: ["REST API testing with Postman", "API automation with REST Assured", "Request and response validation"],
    },
    {
        icon: LuZap,
        title: "Test Automation",
        points: ["Web UI automation with Katalon Studio", "BDD with Cucumber and Serenity BDD", "Mobile automation with Appium"],
    },
    {
        icon: LuClipboardCheck,
        title: "Test Management",
        points: ["Test documentation and reporting", "Test management and tracking", "Requirement-based test scenarios"],
    },
];

export default function Hero() {
    const line1 = useRef(null);
    const line2 = useRef(null);
    const line3 = useRef(null);
    const line4 = useRef(null);
    const yoe = useRef(null);
    const intro = useRef(null);
    const focus = useRef(null);
    const links = useRef(null);
    const buttons = useRef(null);
    const gallery = useRef(null);
    const [logoSize, setLogoSize] = useState({ height: 60, gap: 80 });

    useEffect(() => {
        const update = () =>
            setLogoSize(window.innerWidth < 640 ? { height: 36, gap: 48 } : { height: 60, gap: 80 });
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const techLogos = TECH.map((t) => ({
        node: (
            <Image
                title={t.name}
                src={`/assets/icons/${t.file}.svg`}
                width={100}
                height={100}
                alt={t.name}
                style={{ height: logoSize.height, width: "auto" }}
            />
        ),
        href: t.href,
    }));

    useGSAP(() => {
        const lineTl = gsap.timeline({ defaults: { ease: "none" } });
        [line1, line2, line3, line4].forEach((l, i) => {
            lineTl.fromTo(
                l.current,
                { clipPath: "inset(0 0 100% 0)" },
                { clipPath: "inset(0 0 0% 0)", duration: 2 },
                i === 0 ? undefined : "<0.3"
            );
        });

        const galleries = gsap.utils.toArray(gallery.current.children);
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.fromTo(yoe.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.5 })
            .fromTo(intro.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "<0.1")
            .fromTo(focus.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "<0.1")
            .fromTo(links.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "<0.1")
            .fromTo(buttons.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "<0.1")
            .fromTo(galleries, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: "power4.out" }, "<0.1");

        gsap.utils.toArray(".reveal").forEach((el) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, []);

    return (
        <section className="flex flex-col items-center relative bg-primary px-4 sm:px-10 lg:px-20" id="hero">
            <div
                className="absolute inset-0 z-2 pointer-events-none"
                style={{
                    backgroundImage: "url('/assets/hero-shadow.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% auto",
                    backgroundPosition: "80% 0%",
                }}
            ></div>

            <div className="relative w-full max-w-6xl border border-transparent">
                <div className="flex justify-center gap-[20%] absolute inset-0 z-1">
                    <div ref={line1} className="w-px h-full bg-neutral-300" style={{ transform: "translateZ(0)", willChange: "clip-path" }}></div>
                    <div ref={line2} className="w-px h-full bg-neutral-300" style={{ transform: "translateZ(0)", willChange: "clip-path" }}></div>
                    <div ref={line3} className="w-px h-full bg-neutral-300" style={{ transform: "translateZ(0)", willChange: "clip-path" }}></div>
                    <div ref={line4} className="w-px h-full bg-neutral-200/70" style={{ transform: "translateZ(0)", willChange: "clip-path" }}></div>
                </div>

                <div className="pt-28 sm:pt-36">
                    <p ref={yoe} className="relative z-3 flex flex-wrap gap-2.5 justify-center items-center text-base text-foreground-2 font-medium mb-6">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-green-400"></span>
                        </span>
                        <span>Open to work</span>
                        <span aria-hidden="true">·</span>
                        <span>Quality Assurance</span>
                        <span aria-hidden="true">·</span>
                        <span>1+ Years of Experience</span>
                    </p>

<div ref={intro} className="relative z-3 mx-auto max-w-3xl text-center text-xl sm:text-2xl leading-snug tracking-tight mb-6">                        <span>
                            Hi! I&apos;m <span className="text-accent">Laras</span>, a Quality Assurance Tester dedicated to ensuring the quality of software releases. I turn{" "}
                            <span className="underline decoration-accent underline-offset-4">requirements</span> into test cases, catch bugs before users do, and automate the repetitive checks.
                        </span>
                        <span className="text-foreground-2"> My system analyst background helps me spot gaps early, before testing even begins.</span>
                    </div>

                    <ul ref={focus} className="relative z-3 flex flex-wrap justify-center gap-2.5 mb-8 px-2">
                        {QA_FOCUS.map((item) => (
                            <li
                                key={item}
                                className="rounded-full border border-neutral-300 bg-white/60 backdrop-blur px-4 py-1.5 text-sm font-medium text-foreground-2"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div ref={links} className="relative z-3 flex gap-6 justify-center text-lg text-foreground-2 font-medium tracking-tight">
                        <Link href="https://www.linkedin.com/in/laras-maharani" className="hover:text-foreground transition-colors duration-500" target="_blank">
                            <span className="flex items-center gap-1.5">
                                <PiLinkedinLogo size={26} />
                                LinkedIn
                            </span>
                        </Link>
                        <Link href="https://github.com/larasmaharani" className="hover:text-foreground transition-colors duration-500" target="_blank">
                            <span className="flex items-center gap-1.5">
                                <FiGithub size={22} />
                                GitHub
                            </span>
                        </Link>
                        <Link href="mailto:larasatimaharanii@gmail.com" className="hover:text-foreground transition-colors duration-500">
                            <span className="flex items-center gap-2">
                                <LuMail size={22} />
                                Email
                            </span>
                        </Link>
                    </div>

                    <div ref={buttons} className="relative z-3 flex flex-wrap justify-center gap-4 mt-8">
                        <button
                            type="button"
                            className="group relative overflow-hidden inline-flex items-center gap-2.5 px-8 py-3 rounded-full bg-accent text-white font-medium text-lg shadow-[0_4px_14px_rgba(255,96,0,0.4)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(255,96,0,0.65)] hover:brightness-105 active:translate-y-0 active:scale-95 active:shadow-[0_4px_14px_rgba(255,96,0,0.4)] cursor-pointer"
                            onClick={() => scrollToSection("projects")}
                        >
                            <span className="pointer-events-none absolute inset-x-2 top-0.5 h-[50%] rounded-full bg-linear-to-b from-white/40 via-white/10 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                            <span className="relative z-10 flex items-center gap-2 tracking-wide drop-shadow-xs">
                                View Test Projects
                                <FiArrowUpRight className="text-xl stroke-[2.5]" />
                            </span>
                        </button>
                        <a
                            href="/cv-larasati-maharani-qa.pdf"
                            download
                            className="inline-flex items-center gap-2 bg-neutral-200 rounded-full font-medium text-lg text-foreground px-8 py-3 border-2 border-transparent hover:border-accent hover:text-accent transition-all duration-500 cursor-pointer"
                        >
                            <FiDownload className="text-xl" />
                            Download CV
                        </a>
                        <button
                            type="button"
                            className="rounded-full font-medium text-lg text-foreground px-8 py-3 border-2 border-neutral-300 hover:border-accent hover:text-accent transition-all duration-500 cursor-pointer"
                            onClick={() => scrollToSection("contact")}
                        >
                            Contact Me
                        </button>
                    </div>

                    <div ref={gallery} className="relative z-3 grid grid-cols-1 sm:grid-cols-3 justify-center gap-6 mt-20 sm:mt-24">
                        {GALLERY.map((g) => (
                            <div key={g.src} className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={g.src}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1152px) 360px, (min-width: 640px) 30vw, 90vw"
                                    className={`object-cover ${g.pos}`}
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div id="about" className="reveal relative z-3 w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12 pt-28 sm:pt-36">
                <div className="lg:w-[22%] shrink-0">
                    <h2 className="text-xl font-medium text-foreground text-nowrap">About Me</h2>
                    <p className="text-foreground-2 mt-1">QA with an analyst&apos;s eye</p>
                </div>
                <div className="flex-1">
                    <p className="text-xl sm:text-2xl font-medium leading-snug tracking-tight">
                        <span>Give me a new feature and I&apos;ll probably start hunting for the edge cases.</span>
                        <span className="text-foreground-2"> I like making software more reliable, one test case at a time, preferably with a good cup of coffee in hand.</span>
                    </p>
                    <p className="text-foreground-2 text-lg leading-relaxed mt-6 max-w-2xl">
                        I came into quality assurance from system analysis and back-end development. That path taught me to read requirements closely, ask what happens when things go wrong, and verify that what ships matches what was asked.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                        {STATS.map((s) => (
                            <div key={s.label} className="rounded-2xl border border-neutral-200 bg-secondary px-4 py-5 text-center">
                                <p className="text-3xl font-medium text-accent">{s.value}</p>
                                <p className="text-sm text-foreground-2 mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3 mt-3">
                        {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="flex gap-4 rounded-2xl border border-neutral-200 bg-secondary p-5">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">{title}</h3>
                                    <p className="text-foreground-2 mt-1">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div id="skills" className="reveal relative z-3 w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12 pt-28 sm:pt-36">
                <div className="lg:w-[22%] shrink-0">
                    <h2 className="text-xl font-medium text-foreground text-nowrap">Skills & Tools</h2>
                    <p className="text-foreground-2 mt-1">Tech Stack</p>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {SKILL_GROUPS.map((group) => (
                        <div key={group.title} className="rounded-3xl border border-neutral-200 bg-secondary p-6">
                            <h3 className="flex items-center gap-2.5 font-medium text-foreground">
                                <span className="size-2 rounded-full bg-accent"></span>
                                {group.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-5">
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-neutral-300 bg-neutral-100 px-3 py-1 text-xs text-black"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id="expertise" className="reveal relative z-3 w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12 pt-28 sm:pt-36 pb-20 sm:pb-28">
                <div className="lg:w-[22%] shrink-0">
                    <h2 className="text-xl font-medium text-foreground text-nowrap">QA Expertise</h2>
                    <p className="text-foreground-2 mt-1">Specialization</p>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {EXPERTISE.map(({ icon: Icon, title, points }) => (
                        <div key={title} className="rounded-3xl border border-neutral-200 bg-secondary p-6">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                <Icon size={22} />
                            </div>
                            <h3 className="font-medium text-foreground text-lg mt-5">{title}</h3>
                            <ul className="mt-4 flex flex-col gap-2.5">
                                {points.map((p) => (
                                    <li key={p} className="flex gap-2.5 text-foreground-2">
                                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"></span>
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <LogoLoop
                logos={techLogos}
                speed={80}
                direction="left"
                logoHeight={logoSize.height}
                gap={logoSize.gap}
                hoverSpeed={0}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="var(--primary)"
                className="relative z-3 mb-16"
            />
        </section>
    );
}