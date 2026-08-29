"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const container = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            if (!scrolled && y > 20) {
                setScrolled(true);
            } else if (scrolled && y < 5) {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrolled]);

    useEffect(() => {
        if (scrolled) {
            gsap.to(container.current, {
                width: "70vw",
                top: "0.75rem",
                backgroundColor: "rgba(186, 186, 186, 0.2)",
                boxShadow: "inset 1px 0.5px 3px rgba(255,255,255,1)",
                backdropFilter: "blur(6px)",
                duration: 0.7,
                ease: "power2.out",
            });
        } else {
            gsap.to(container.current, {
                width: "90vw",
                top: "1.5rem",
                backgroundColor: "rgba(23,23,23,1)",
                backdropFilter: "none",
                boxShadow: "none",
                duration: 0.7,
                ease: "power2.out",
            });
        }
    }, [scrolled]);

    return (
        <nav ref={container} className="fixed z-20 left-1/2 top-6 -translate-x-1/2 w-[90vw] flex items-center justify-between rounded-full bg-neutral-900 font-semibold px-3 py-3 text-sm text-white sm:px-6">
            <div className="flex items-center gap-1">
                <span className="rounded-full bg-primary px-5 py-2 font-medium">
                    Home
                </span>
                <span className="hidden px-4 py-2 text-primary hover:text-white sm:inline">
                    About
                </span>
                <span className="hidden px-4 py-2 text-primary hover:text-white sm:inline">
                    Certificate
                </span>
            </div>

            <div className="flex items-center gap-2 font-semibold tracking-wide">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs">
                    JC
                </span>
                JCREA
            </div>

            <div className="hidden items-center gap-1 sm:flex">
                <span className="px-4 py-2 text-primary hover:text-white">
                    Resume
                </span>
                <span className="px-4 py-2 text-primary hover:text-white">
                    Project
                </span>
                <span className="px-4 py-2 text-primary hover:text-white">
                    Contact
                </span>
            </div>
        </nav>
    );
}