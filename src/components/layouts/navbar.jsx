"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Navbar() {
    const container = useRef(null);
    const lastScrollY = useRef(0);
    const hidden = useRef(false);

    useGSAP(() => {
        lastScrollY.current = window.scrollY;

        const onScroll = () => {
            const y = window.scrollY;
            const diff = y - lastScrollY.current;

            if (y < 20) {
                if (hidden.current) {
                    hidden.current = false;
                    gsap.to(container.current, {
                        y: 0,
                        scale: 0.6,
                        duration: 0.5,
                        ease: "power2.out",
                    });
                }
                lastScrollY.current = y;
                return;
            }

            if (diff > 5 && !hidden.current) {
                hidden.current = true;
                gsap.to(container.current, {
                    y: "-150%",
                    scale: 0.6,
                    duration: 0.5,
                    ease: "power2.out",
                });
            } else if (diff < -5 && hidden.current) {
                hidden.current = false;
                gsap.to(container.current, {
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out",
                });
            }

            lastScrollY.current = y;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
    }, []);

    return (
        <nav ref={container} className="fixed z-20 left-1/2 top-6 -translate-x-1/2 w-[90vw] flex items-center justify-between rounded-full font-semibold px-3 py-3 text-sm text-foreground sm:px-6">
            <div className="flex items-center gap-2.5 border-gray-400">
                <span className="rounded-full bg-primary w-9 h-9 flex items-center justify-center text-lg ps-0.5">
                    L
                </span>
                <span className="px-4 py-2.5 uppercase text-[11px] font-mono border border-gray-200 rounded-full tracking-wider bg-background/40 backdrop-blur-sm">
                    Laras / Portfolio
                </span>
            </div>
            <div className="flex gap-2 px-4 py-2.5 rounded-full border border-gray-200 text-[11px] font-mono uppercase bg-background/40 backdrop-blur-sm">
                <span className="tracking-wider">Menu</span>
                <div className="relative w-3.5 h-3.5">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2.5px] bg-foreground rounded-full rotate-90"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2.5px] bg-foreground rounded-full"></div>
                </div>
            </div>
        </nav>
    );
}