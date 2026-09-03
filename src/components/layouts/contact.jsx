"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiCopy, FiCheck } from "react-icons/fi";
import { PiLinkedinLogo } from "react-icons/pi";
import { LuMail } from "react-icons/lu";
import { FiGithub } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { scrollToSection } from "@/lib/scroll";

const socials = [
    { name: "Linkedin", icon: PiLinkedinLogo, href: "https://www.linkedin.com/in/laras-maharani" },
    { name: "GitHub", icon: FiGithub, href: "https://github.com/larasmaharani" },
    { name: "Email", icon: LuMail, href: "mailto:larasatimaharanii@gmail.com" },
];

const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Projects", id: "projects" },
    { label: "Journey", id: "journey" },
    { label: "Sertificate", id: "sertificate" },
];

export default function Contact() {
    const container = useRef(null);
    const title = useRef(null);
    const buttons = useRef(null);
    const footer = useRef(null);
    const footerLinks = useRef(null);
    const [copied, setCopied] = useState(false);
    const email = "larasatimaharanii@gmail.com";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useGSAP(() => {
        const targets = [container.current, title.current, buttons.current, footer.current, footerLinks.current];
        gsap.set(targets, { opacity: 0, y: 40 });
        gsap.to(
            targets,
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse",
                }
            }
        );
    }, []);

    return (
        <section className="relative z-3 w-[73%] mx-auto pb-20" id="contact">
            <div
                ref={container}
                className="w-full relative overflow-hidden rounded-[2.5rem] flex flex-col items-center text-center py-14 px-6"
                style={{
                    background:
                        "linear-gradient(180deg, rgb(246, 246, 246) 0%, rgba(252, 191, 145, 0.49) 100%)",
                }}
            >
                <h2 ref={title} className="text-4xl font-medium text-foreground max-w-3xl leading-tight tracking-tighter">
                    I love digging into problems, mapping out systems, and figuring out what actually works. Let&apos;s talk!
                </h2>

                <div ref={buttons} className="flex flex-wrap justify-center gap-4 mt-10 text-xl font-medium">
                    <Link href="mailto:larasatimaharanii@gmail.com" className="group relative overflow-hidden inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-accent text-white font-medium shadow-[0_4px_14px_rgba(255,96,0,0.4)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(255,96,0,0.65)] hover:brightness-105 active:translate-y-0 active:scale-95 active:shadow-[0_4px_14px_rgba(255,96,0,0.4)]">
                        <span className="pointer-events-none absolute inset-x-2 top-0.5 h-[50%] rounded-full bg-linear-to-b from-white/40 via-white/10 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                        <span className="relative z-10 flex items-center gap-2 tracking-wide drop-shadow-xs">
                            Get In Touch
                            <FiArrowUpRight size={20} />
                        </span>
                    </Link>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 bg-white text-foreground font-medium px-8 py-4 rounded-full border border-neutral-200 hover:border-accent hover:text-accent transition-all duration-500"
                    >
                        {copied ? "Copied!" : "Copy Email"}
                        {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
                    </button>
                </div>
            </div>

            <div ref={footer} className="flex flex-col md:flex-row justify-between gap-2 mt-12 text-foreground-2">
                <div>
                    <p>Design & Built by Larasati Maharani</p>
                    <p>Copyright ©2026. All Rights Reserved.</p>
                </div>
                <div className="md:text-right">
                    <p>Bekasi, Indonesia</p>
                    <p>{email}</p>
                </div>
            </div>

            <div ref={footerLinks} className="border-t border-neutral-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex flex-wrap gap-4">
                    {socials.map((social) => (
                        <Link
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-foreground hover:text-accent transition-colors duration-300"
                        >
                            <span className="flex items-center justify-center w-7 h-7">
                                <social.icon size={22} />
                            </span>
                            {social.name}
                        </Link>
                    ))}
                </div>

                <div className="flex gap-6 text-foreground">
                    {navLinks.map((link, index) => (
                        <button
                            type="button"
                            key={index}
                            onClick={() => scrollToSection(link.id)}
                            className="hover:text-accent transition-colors duration-300 cursor-pointer"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            </div >
        </section>
    );
}