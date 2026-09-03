"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { FiArrowDownRight } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const journeys = [
    {
        period: "Dec 2025 - Jun 2026",
        company: "Kementerian Keuangan",
        role: "System Analyst",
        highlights: [
            "Owned the design of Alodokter's flagship products across five squads — Core, Chat, Aloshop, Aloproteksi, and Alomedika — serving over 30 million monthly users and 80,000+ doctors.",
            "Built and maintained a comprehensive design system and token architecture, increasing library accessibility by 400% and accelerating design-to-development handover by 3x.",
            "Partnered with the CEO and leadership team to define product problems, set design direction, and uphold product quality standards.",
            "Led cross-functional collaboration with product, engineering, and QA to align business objectives with user-centered design outcomes.",
            "Redesigned key user flows and interfaces based on usability testing and data analysis, leading to improved retention and increased task success rates.",
            "Established new design principles and implemented them across AlodokterAI and AlomedikaAI, creating a more welcoming and user-friendly product experience.",
            "Helped define OKRs and product strategy in partnership with PMs and stakeholders, ensuring design efforts aligned with business objectives.",
        ],
    },
    {
        period: "2023 - 2025",
        company: "InKanteen",
        role: "Lead Designer",
        highlights: [
            "Led and conducted user research, A/B testing, and click tracking which reduced bounce rate by 61%, boosted conversion rate by 35%, and increased transaction rate by 16%, driving measurable impact in a short time frame.",
            "Developed and maintained a robust design system, boosting design delivery speed by 500% and improving library accessibility by up to 3x.",
            "Built, optimized, and sustained the company’s product sets, consisting of 14 different products simultaneously.",
            "Took care of the company’s product ecosystem, including the ordering system, supply-chain management, catering, and FMCG products.",
            "Led and managed a high-performing design team, providing mentorship, guidance, and constructive feedback to foster professional growth and skill development.",
            "Defined and communicated design visions, ensuring alignment with company goals and objectives across multiple projects and initiatives.",
        ],
    },
    {
        period: "2021 - 2023",
        company: "InKanteen",
        role: "Product Designer",
        highlights: [
            "Designed the first 2 initial products for ordering and merchants within 3 weeks.",
            "Collaborated closely with business owners, the product manager, and developers to design the ordering system and merchant app from the ground up.",
            "Helped the company score more than 50 clients in the first year by providing resources for product operations and campaigns.",
            "Defined the core user flow and navigation structures that guide users through the product.",
            "Created design specifications, style guides, and design documentation to guide developers during implementation.",
            "Generated creative ideas and concepts for new products and features.",
        ],
    },
    {
        period: "2021 - 2023",
        company: "REDEK",
        role: "UI/UX Designer",
        highlights: [
            "Designed an ODR (Online Dispute Resolution) banking platform from the ground up in less than a month.",
            "Designed a product set for 6 different types of users, including the Customer, Advocate, Bank Lawyers, Moderator, Arbitrator, and Customer Support.",
            "Built a sitemap and information architecture that interchanges across multiple products.",
            "Worked closely with product business owners, the product manager, and developers to turn a complex vision into a real product, helping the company kickstart their business.",
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
        <div ref={containerRef} className="relative z-3 w-[74%] mx-auto px-4 py-28">
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
                                    <ul className="pb-8 pr-16 space-y-4">
                                        {journey.highlights.map((point, i) => (
                                            <li
                                                key={i}
                                                className="flex gap-3 text-foreground-2 text-base leading-relaxed"
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
        </div>
    );
}