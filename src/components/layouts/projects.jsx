"use client";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

export default function Projects() {
    const projects = [
        {
            image: "/assets/heroimg2.jpg",
            title: "Modernizing Medical Intake with Interactive AI Workflows",
            role: "Alodokter — Sole Product Designer",
            productName: "Alodokter",
            productInitial: "A",
            year: "2026",
            tags: ["Healthtech", "AI Workflow", "Product Design"],
        },
        {
            image: "/assets/heroimg2.jpg",
            title: "Modernizing Medical Intake with Interactive AI Workflows",
            role: "Alodokter — Sole Product Designer",
            productName: "Alodokter",
            productInitial: "A",
            year: "2026",
            tags: ["Healthtech", "AI Workflow", "Product Design"],
        },
        {
            image: "/assets/heroimg2.jpg",
            title: "Modernizing Medical Intake with Interactive AI Workflows",
            role: "Alodokter — Sole Product Designer",
            productName: "Alodokter",
            productInitial: "A",
            year: "2026",
            tags: ["Healthtech", "AI Workflow", "Product Design"],
        },
    ];

    const labelRef = useRef(null);
    const containerRef = useRef(null);
    const cardRefs = useRef([]);

    useGSAP(() => {
        const cards = cardRefs.current;

        cards.forEach((card, i) => {
            if (i === cards.length - 1) return;

            ScrollTrigger.create({
                trigger: card,
                start: "top top+=100",
                endTrigger: cards[cards.length - 1],
                end: "top top+=100",
                pin: true,
                pinSpacing: false,
            });
        });

        ScrollTrigger.create({
            trigger: cards[0],
            start: "top top+=100",
            endTrigger: cards[cards.length - 1],
            end: "top top+=100",
            pin: labelRef.current,
            pinSpacing: false,
        });
    }, []);

    return (
        <div className="relative z-3 w-full mx-auto pt-40 pb-24">
            <div className="flex justify-center gap-8 md:gap-12 px-20">
                <div ref={labelRef}>
                    <h2 className="text-xl font-medium text-foreground">Selected Projects</h2>
                    <p className="text-foreground-2 mt-1">Case Studies</p>
                </div>

                <div ref={containerRef} className="flex flex-col gap-4 w-[66%] h-full">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            className="w-full h-100 max-h-100 bg-secondary border border-neutral-200 rounded-4xl p-4 flex flex-col md:flex-row gap-8"
                            style={{ zIndex: index + 1 }}
                        >
                            <div className="relative w-full md:w-[48%] h-full rounded-3xl overflow-hidden shrink-0">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-col justify-between py-2 pr-2 flex-1">
                                <div>
                                    <h3 className="text-2xl font-medium text-foreground leading-snug">
                                        {project.title}
                                    </h3>
                                    <p className="text-foreground-2 mt-2">{project.role}</p>

                                    <div className="h-px bg-neutral-200 my-6" />

                                    <div className="flex gap-16">
                                        <div>
                                            <p className="text-xs text-foreground-2">Product</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-semibold">
                                                    {project.productInitial}
                                                </span>
                                                <span className="text-foreground font-medium">{project.productName}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-foreground-2">Year</p>
                                            <p className="text-foreground font-medium mt-2">{project.year}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-8">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full border border-neutral-200 text-sm text-foreground-2"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}