"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { FiArrowDownRight } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const journeys = [
    {
        period: "Dec 2025 - Jun 2026",
        company: "Kementerian Keuangan - Sekretariat BPPK",
        role: "System Analyst & UI/UX Designer Intern",
        highlights: [
            "Analyzed user requirements, business processes, and feedback from 1,709 respondents for the re-engineering of Kemenkeu Learning Center (KLC) and Room Management System (RMS) V2, and documented findings in BRD and BPMN.",
            "Designed KLC user flows, wireframes, and interactive Figma prototypes, including a new interactive quiz feature.",
            "Designed 10+ dashboard pages for BPPK Dalam Angka using Canva.",
            "Led on-site execution of Be a Champion (BAC) and Kemenkeu Learning Festival (KLF) 2026 mini games, coordinating 5+ performers and game MCs.",
        ],
    },
    {
        period: "Sep 2024 - Jan 2025",
        company: "PT Levi Strauss Indonesia",
        role: "IT Business Analyst Intern",
        highlights: [
            "Developed interactive Power BI KPI dashboards and sell-through reports supporting sales performance analysis across 5 Southeast Asian markets: Indonesia, Malaysia, Singapore, Thailand, and the Philippines.",
            "Validated and analyzed 30,000+ sales records from SQL, SAP, and internal sources for automated reporting on revenue growth, sales trends, and product performance.",
            "Built data models using SQL, DAX, and Power Query, and designed 25+ dashboard templates in Figma based on business requirements.",
        ],
    },
    {
        period: "Jun 2024 - Aug 2024",
        company: "Bank DKI",
        role: "Back-End Developer Intern",
        highlights: [
            "Developed backend features for the JakLoan application using Spring Boot and PostgreSQL, integrating application logic with the database through REST APIs.",
            "Executed 100+ API test cases using Postman, covering request and response validation, status codes, and error handling, and reported functional issues to the development team.",
            "Authored Technical System Documentation (TSD) covering API specifications and system workflows as a reference for the development team.",
        ],
    },
    {
        period: "Sep 2019 - Nov 2019",
        company: "PT Marga Nusantara Jaya",
        role: "Data Entry Intern",
        highlights: [
            "Maintained and validated purchasing invoices and product records to ensure data accuracy, reporting consistency, and documentation integrity.",
            "Managed employee attendance records using internal systems and Microsoft Excel to support payroll administration and reporting.",
        ],
    },
];

export default function Journey() {
    const [openIndex, setOpenIndex] = useState(null);
    const containerRef = useRef(null);
    const headingRef = useRef(null);
    const rowRefs = useRef([]);

    const toggle = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    useGSAP(() => {
        const targets = [headingRef.current, ...rowRefs.current];
        gsap.set(targets, { opacity: 0, y: 40 });
        gsap.to(
            targets,
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <section ref={containerRef} className="relative z-3 w-[74%] mx-auto px-4 py-28" id="journey">
            <h2 ref={headingRef} className="text-xl font-medium text-foreground mb-8">
                My Journey
            </h2>

            <div className="border-t border-neutral-200">
                {journeys.map((journey, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            ref={(el) => (rowRefs.current[index] = el)}
                            className="border-b border-neutral-200"
                        >
                            <div
                                onClick={() => toggle(index)}
                                className="group flex items-center gap-6 py-6 cursor-pointer transition-colors duration-300 hover:bg-accent/5"
                            >
                                <span className="w-[24%] shrink-0 text-neutral-400 font-mono text-md">
                                    {journey.period}
                                </span>
                                <span className="flex-1 text-2xl font-medium text-foreground">
                                    {journey.company}
                                </span>
                                <span className="text-2xl font-medium text-foreground">
                                    {journey.role}
                                </span>
                                <FiArrowDownRight
                                    className={`text-2xl text-foreground shrink-0 transition-transform duration-300 ${isOpen ? "-rotate-90" : "group-hover:translate-x-1 group-hover:translate-y-1"
                                        }`}
                                />
                            </div>

                            <div
                                className="grid transition-all duration-500 ease-in-out"
                                style={{
                                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                                }}
                            >
                                <div className="overflow-hidden">
                                    <ul className="pb-8 pr-16 space-y-2">
                                        {journey.highlights.map((point, i) => (
                                            <li
                                                key={i}
                                                className="flex gap-3 text-neutral-500 text-base leading-relaxed"
                                            >
                                                <span className="mt-2.5 w-1 h-1 rounded-full bg-foreground-2 shrink-0" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end pt-6">
                <Link
                    href="#"
                    target="_blank"
                    className="underline underline-offset-4 text-foreground hover:text-accent transition-colors duration-300"
                >
                    More on my resume
                </Link>
            </div>
        </section>
    );
}