"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { LuMail, LuCheck, LuCopy } from "react-icons/lu";

export default function Navbar() {
    const container = useRef(null);
    const lastScrollY = useRef(0);
    const hidden = useRef(false);

    const [copied, setCopied] = useState(false);
    const [hovered, setHovered] = useState(false);
    const email = "larasatimaharanii@gmail.com";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useGSAP(() => {
        lastScrollY.current = window.scrollY;

        gsap.fromTo(container.current, {
            y: "-150%",
            scale: 0.6,
        }, {
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });

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
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav ref={container} className="fixed z-20 left-1/2 top-6 -translate-x-1/2 flex items-center justify-between gap-6 bg-secondary/40 border border-gray-200 backdrop-blur-sm rounded-full font-semibold px-4 py-2 text-sm">
            <div className="flex justify-center items-center font-serif font-medium pe-0.5 bg-accent text-white text-lg italic w-8 h-8 rounded-full">L</div>
            <p>Projects</p>
            <p>Journey</p>
            <p>Sertificate</p>
            <p>Contact</p>
            <div className="w-px h-3 bg-gray-400"></div>
            <button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleCopy}
                className={`group flex items-center gap-1 bg-gray-200 py-2.5 ps-3 ${hovered ? "pe-3" : "pe-2"} rounded-full border border-transparent hover:border-accent hover:text-accent transition-all duration-500 ease-in-out`}
            >
                {copied ? <LuCheck size={16} /> : hovered ? <LuCopy size={14} /> : <LuMail size={16} />}
                <span
                    className="grid overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                        gridTemplateColumns: hovered ? "1fr" : "0fr",
                    }}
                >
                    <span className="overflow-hidden whitespace-nowrap">
                        <span className="pl-1">{copied ? "Copied!" : "Copy Email"}</span>
                    </span>
                </span>
            </button>
        </nav>
    );
}