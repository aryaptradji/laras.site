"use client";
import React, { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
    { title: "UI/ UX Design" },
    { title: "Web Design" },
    { title: "Landing Page" },
    { title: "Mobile App" },
    { title: "Dashboard" },
    { title: "Branding" },
    { title: "Health App" },
    { title: "Product Design" },
    { title: "Development" },
];

const ITEMS_PER_PAGE = 3;

export default function Project() {
    const [activePage, setActivePage] = useState(0);
    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

    const visibleProjects = useMemo(() =>
        projects.slice(
            activePage * ITEMS_PER_PAGE,
            activePage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        ), [activePage]
    );

    return (
        <section className="relative h-screen overflow-hidden bg-foreground py-16 px-4 sm:px-16 sm:py-24 rounded-t-4xl">
            <Image
                src="/assets/projectbg.webp"
                alt="Project preview"
                fill
                className="object-fill z-0"
            />

            {/* Header */}
            <div className="relative z-1 mb-20 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                    My <span className="text-orange-500">Projects</span>
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-neutral-400">
                    A selection of projects I&apos;ve designed and shipped, from concept to final product.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {visibleProjects.map((project) => (
                    <div
                        key={project.title}
                        className="relative z-1 rounded-2xl bg-blur/20 p-6 backdrop-blur-xs"
                        style={{
                            boxShadow: "inset 0.5px 0.5px 3px rgba(255,255,255,1)"
                        }}
                    >
                        <h3 className="mb-4 text-xl font-semibold text-white">
                            {project.title}
                        </h3>

                        {/* Mockup placeholder */}
                        <div className="relative h-56 overflow-hidden rounded-xl bg-neutral-200">
                            <div className="flex h-full w-full items-center justify-center text-sm font-medium text-neutral-400">
                                preview image
                            </div>
                        </div>

                        {/* Arrow button */}
                        <button
                            aria-label={`View ${project.title}`}
                            className="absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-white shadow-md transition-transform hover:scale-110 duration-300"
                        >
                            <ArrowUpRight size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Carousel dots */}
            <div className="relative z-1 mt-14 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Go to page ${i + 1}`}
                        onClick={() => setActivePage(i)}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${activePage === i
                            ? "w-6 bg-orange-500"
                            : "w-2.5 bg-neutral-600 hover:bg-neutral-400"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}