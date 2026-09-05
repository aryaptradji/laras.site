"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { FiArrowDownRight } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const journeys = [
    {
        period: "Dec 2025 - Jun 2026",
        company: "Kementerian Keuangan",
        role: "System Analyst & UI/UX Intern",
        highlights: [
            "Analyzed business and user requirements for the re-engineering of Kemenkeu Learning Center (KLC), producing BRD, business process models, wireframes, and UI/UX designs.",
            "Defined system features and user flows for KLC based on requirement analysis and user needs.",
            "Contributed to the development of an educational game for Be A Champion (BAC) as an interactive learning medium for Kemenkeu Learning Festival.",
            "Designed monthly learning analytics reports and BPPK Dalam Angka dashboards to present learning data and statistics in a more informative and interactive format.",
            "Supported the preparation and execution of interactive mini games for Kemenkeu Learning Festival 2026, including visual concepts, game briefings, property coordination, and event ambience.",
            "Prepared the Business Requirement Document (BRD) for Room Management System (RMS) V2, defining business requirements, system needs, and process flows.",
            "Developed a user manual for KLC Office to support system usage and standardize system documentation."
        ],
    },
    {
        period: "Sep 2024 - Jan 2025",
        company: "PT Levi Strauss Indonesia",
        role: "IT Business Analyst Intern",
        highlights: [
            "Developed interactive Power BI KPI dashboards and sell-through reports supporting sales performance analysis across five Southeast Asian markets (Indonesia, Malaysia, Singapore, Thailand, and the Philippines). ",
            "Managed, validated, and analyzed 30,000+ sales records by querying SQL databases and integrating SAP and internal data sources into Power BI, enabling automated reporting and actionable insights into revenue growth, sales trends, and product performance.",
            "Designed Figma dashboard prototypes, translating business requirements into interactive reporting solutions.",
        ],
    },
    {
        period: "Jun 2024 - Aug 2024",
        company: "Bank DKI",
        role: "Back-End Developer Intern",
        highlights: [
            "Collaborated with developers to support REST API integration and validated 100 API test cases using Postman for the JakLoan application.",
            "Prepared Technical System Documentation (TSD) covering API specifications and system workflows.",
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