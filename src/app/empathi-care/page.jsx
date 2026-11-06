"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { LuHeartHandshake, LuWrench } from "react-icons/lu";

export default function EmpathiCare() {
    const container = useRef(null);

    useGSAP(() => {
        const media = gsap.matchMedia();

        media.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo("[data-reveal]",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );
        });

        return () => media.revert();
    }, { scope: container });

    return (
        <main ref={container} className="relative isolate flex min-h-dvh flex-col justify-center px-6 pt-24 pb-12 sm:px-12 [&+#contact]:pt-6">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 mx-auto flex max-w-5xl justify-between px-6 sm:px-12">
                    {[0, 1, 2, 3].map((line) => (
                        <div key={line} className="w-px bg-linear-to-b from-neutral-200/80 via-neutral-200/40 to-transparent" />
                    ))}
                </div>
                <div className="absolute top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/8 blur-3xl sm:h-96 sm:w-96" />
            </div>

            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <p data-reveal className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200 bg-secondary/80 px-4 py-2 font-mono text-xs text-blur">
                    <span aria-hidden="true" className="relative block size-2.5 aspect-square shrink-0">
                        <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" />
                        <span className="absolute inset-0 rounded-full bg-accent" />
                    </span>
                    A LITTLE WORK IN PROGRESS
                </p>

                <div data-reveal aria-hidden="true" className="relative my-[clamp(0.75rem,2.5svh,1.5rem)]">
                    <div className="flex size-[clamp(4rem,12svh,6rem)] -rotate-6 items-center justify-center rounded-3xl border border-neutral-200 bg-secondary shadow-[0_12px_32px_rgba(46,65,80,0.06)]">
                        <LuHeartHandshake className="size-10 text-foreground sm:size-12" strokeWidth={1.25} />
                    </div>
                    <div className="absolute -right-3 -bottom-2 flex size-10 rotate-12 items-center justify-center rounded-2xl border-4 border-primary bg-accent text-white">
                        <LuWrench size={20} strokeWidth={1.5} />
                    </div>
                </div>

                <div data-reveal>
                    <p className="mb-2 text-sm font-medium text-blur sm:text-base">EmpathiCare · Mental Health Care Platform</p>
                    <h1 className="text-4xl font-medium leading-[1.1] tracking-tighter sm:text-5xl lg:text-6xl">
                        Coming <span className="font-serif italic text-accent">Soon.</span>
                    </h1>
                </div>

                <p data-reveal className="mt-[clamp(0.75rem,2svh,1.25rem)] max-w-lg text-sm leading-relaxed text-blur sm:text-base">
                    I&apos;m putting together the story of testing a mental
                    health care platform, with care in every detail.
                    The full case study will be here soon.
                </p>

                <div data-reveal className="mt-[clamp(1rem,3svh,1.5rem)] flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base">
                    <Link
                        href="/"
                        onClick={() => window.dispatchEvent(new CustomEvent("showNavbar"))}
                        className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-accent px-5 py-3 font-medium text-white shadow-[0_4px_14px_rgba(255,96,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(255,96,0,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transform-none motion-reduce:transition-none sm:px-7"
                    >
                        <span aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-0.5 h-1/2 rounded-full bg-linear-to-b from-white/40 via-white/10 to-transparent" />
                        <FiArrowLeft aria-hidden="true" className="relative" />
                        <span className="relative">Back to home</span>
                    </Link>
                    <Link
                        href="mailto:larasatimaharanii@gmail.com"
                        className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-secondary px-5 py-3 font-medium transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none sm:px-7"
                    >
                        Let&apos;s talk
                        <FiArrowUpRight aria-hidden="true" />
                    </Link>
                </div>

                <p data-reveal className="mt-[clamp(1rem,3svh,1.5rem)] font-serif text-xl italic text-blur">
                    A little patience, a lot of care.
                </p>
            </div>
        </main>
    );
}
