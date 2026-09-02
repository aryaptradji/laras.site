"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { LuMail } from "react-icons/lu";
import { PiLinkedinLogo } from "react-icons/pi";
import LogoLoop from "../elements/logoLoop";

export default function Hero() {
    const line1 = useRef(null);
    const line2 = useRef(null);
    const line3 = useRef(null);
    const line4 = useRef(null);
    const yoe = useRef(null);
    const intro = useRef(null);
    const links = useRef(null);
    const buttons = useRef(null);
    const gallery = useRef(null);
    const about = useRef(null);
    const [logoSize, setLogoSize] = useState({ height: 60, gap: 80 });

    const techLogos = [
        { node: <Image title="Postman" src="/assets/icons/postman.svg" width={100} height={100} alt="Postman" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://postman.com" },
        { node: <Image title="Katalon" src="/assets/icons/katalon.svg" width={100} height={100} alt="Katalon" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://katalon.com" },
        { node: <Image title="Power BI" src="/assets/icons/powerbi.svg" width={100} height={100} alt="Power BI" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://powerbi.microsoft.com" },
        { node: <Image title="Excel" src="/assets/icons/excel.svg" width={100} height={100} alt="Excel" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://office.microsoft.com/excel" },
        { node: <Image title="Cucumber" src="/assets/icons/cucumber.svg" width={100} height={100} alt="Cucumber" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://cucumber.io" },
        { node: <Image title="Trello" src="/assets/icons/trello.svg" width={100} height={100} alt="Trello" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://trello.com" },
        { node: <Image title="Git" src="/assets/icons/git.svg" width={100} height={100} alt="Git" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://git-scm.com" },
        { node: <Image title="GitHub" src="/assets/icons/github.svg" width={100} height={100} alt="GitHub" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://github.com" },
        { node: <Image title="Figma" src="/assets/icons/figma.svg" width={100} height={100} alt="Figma" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://figma.com" },
        { node: <Image title="Canva" src="/assets/icons/canva.svg" width={100} height={100} alt="Canva" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://canva.com" },
        { node: <Image title="MySQL" src="/assets/icons/mysql.svg" width={100} height={100} alt="MySQL" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://mysql.com" },
        { node: <Image title="PostgreSQL" src="/assets/icons/postgresql.svg" width={100} height={100} alt="PostgreSQL" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://postgresql.org" },
        { node: <Image title="Python" src="/assets/icons/python.svg" width={100} height={100} alt="Python" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://python.org" },
        { node: <Image title="PHP" src="/assets/icons/php.svg" width={100} height={100} alt="PHP" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://php.net" },
        { node: <Image title="HTML5" src="/assets/icons/html5.svg" width={100} height={100} alt="HTML5" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://html.spec.whatwg.org/" },
        { node: <Image title="CSS" src="/assets/icons/css.svg" width={100} height={100} alt="CSS" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://www.w3.org/Style/CSS/" },
        { node: <Image title="JavaScript" src="/assets/icons/javascript.svg" width={100} height={100} alt="JavaScript" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { node: <Image title="Laravel" src="/assets/icons/laravel.svg" width={100} height={100} alt="Laravel" style={{ height: logoSize.height, width: 'auto' }} />, href: "https://laravel.com" },
    ];

    useGSAP(() => {
        const lineTl = gsap.timeline({ defaults: { ease: "none" } });
        lineTl.fromTo(line1.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 2 })
            .fromTo(line2.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 2 }, "<0.3")
            .fromTo(line3.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 2 }, "<0.3")
            .fromTo(line4.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 2 }, "<0.3");

        const galleries = gsap.utils.toArray(gallery.current.children);
        const translateTl = gsap.timeline({ defaults: { ease: "power2.out" } });
        translateTl.fromTo(yoe.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.5 })
            .fromTo(intro.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "<0.1")
            .fromTo(links.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "<0.1")
            .fromTo(buttons.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "<0.1")
            .fromTo(galleries, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: "power4.out" }, "<0.1");

        gsap.fromTo(about.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                scrollTrigger: {
                    trigger: about.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                }
            }
        );
    }, []);

    return (
        <section className="flex flex-col items-center relative bg-primary px-4 sm:px-20" id="hero">
            <div
                className="absolute inset-0 z-2"
                style={{
                    backgroundImage: "url('/assets/hero-shadow.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% auto",
                    backgroundPosition: "80% 0%",
                }}
            ></div>

            <div className="relative border border-transparent">
                <div className="flex justify-center gap-[20%] absolute inset-0 z-1">
                    <div ref={line1} className="w-px h-full bg-neutral-300" style={{ transform: "translateZ(0)", willChange: "clip-path" }}></div>
                    <div ref={line2} className="w-px h-full bg-neutral-300" style={{ transform: "translateZ(0)", willChange: "clip-path" }}></div>
                    <div ref={line3} className="w-px h-full bg-neutral-300" style={{ transform: "translateZ(0)", willChange: "clip-path" }}></div>
                    <div ref={line4} className="w-px h-full bg-neutral-200/70" style={{ transform: "translateZ(0)", willChange: "clip-path" }}></div>
                </div>

                <div className="mt-[10%]">
                    <p ref={yoe} className="relative z-3 flex gap-2.5 justify-center items-center text-md text-foreground-2 font-medium mb-6">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-green-400"></span>
                        </span>
                        <span>1+ Years of Experience</span>
                    </p>
                    <div ref={intro} className="relative z-3 text-center text-4xl px-[26%] leading-snug tracking-tighter mb-8">
                        <span>Hi! I&apos;m <span className="text-accent">Laras</span>. I bridge <span className="underline">business needs</span> and technical systems.</span>
                        <span className="text-foreground-2"> Currently open to new opportunities as System Analyst.</span>
                    </div>
                    <div ref={links} className="relative z-3 flex gap-6 justify-center text-lg text-foreground-2 font-medium tracking-tighter">
                        <Link href="https://www.linkedin.com/in/laras-maharani" className="hover:text-foreground transition-colors duration-500" target="_blank">
                            <span className="flex items-center gap-1.5">
                                <PiLinkedinLogo size={26} />
                                LinkedIn
                            </span>
                        </Link>
                        <Link href="https://github.com/larasmaharani" className="hover:text-foreground transition-colors duration-500" target="_blank">
                            <span className="flex items-center gap-1.5">
                                <FiGithub size={22} />
                                GitHub
                            </span>
                        </Link>
                        <Link href="mailto:larasatimaharanii@gmail.com" className="hover:text-foreground transition-colors duration-500">
                            <span className="flex items-center gap-2">
                                <LuMail size={22} />
                                Email
                            </span>
                        </Link>
                    </div>
                    <div ref={buttons} className="relative z-3 flex justify-center gap-4 mt-8">
                        <button className="group relative overflow-hidden inline-flex items-center gap-2.5 px-8 py-3 rounded-full bg-accent text-white font-medium text-lg shadow-[0_4px_14px_rgba(255,96,0,0.4)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(255,96,0,0.65)] hover:brightness-105 active:translate-y-0 active:scale-95 active:shadow-[0_4px_14px_rgba(255,96,0,0.4)]">
                            <span className="pointer-events-none absolute inset-x-2 top-0.5 h-[50%] rounded-full bg-linear-to-b from-white/40 via-white/10 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                            <span className="relative z-10 flex items-center gap-2 tracking-wide drop-shadow-xs">
                                Contact
                                <FiArrowUpRight className="text-xl stroke-[2.5]" />
                            </span>
                        </button>
                        <button className="bg-neutral-200 rounded-full font-medium text-lg text-foreground px-8 py-3 border-2 border-transparent hover:border-accent hover:text-accent transition-all duration-500">View Resume</button>
                    </div>
                    <div ref={gallery} className="relative z-3 flex justify-center gap-6 mt-24">
                        <div className="relative w-[24%] aspect-square rounded-2xl overflow-hidden shadow-2xl">
                            <Image src="/assets/heroimg4.jpeg" alt="" fill className="object-cover" priority />
                        </div>
                        <div className="relative w-[24%] aspect-square rounded-2xl overflow-hidden shadow-2xl">
                            <Image src="/assets/hero-profile.jpg" alt="" fill className="object-cover" priority />
                        </div>
                        <div className="relative w-[24%] aspect-square rounded-2xl overflow-hidden shadow-2xl">
                            <Image src="/assets/heroimg3.jpeg" alt="" fill className="object-cover" priority />
                        </div>
                    </div>
                </div>
            </div>
            <div ref={about} className="relative z-3 text-2xl font-medium w-[50%] py-28 mb-4">
                <span>System Analyst focused on requirement gathering, process mapping, and bridging stakeholders with development teams.</span>
                <span className="text-foreground-2">Outside of documentation and flowcharts, you&apos;ll find me binge-watching Netflix.</span>
            </div>
            <LogoLoop
                logos={techLogos}
                speed={80}
                direction="left"
                logoHeight={logoSize.height}
                gap={logoSize.gap}
                hoverSpeed={0}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="var(--primary)"
                className="relative z-3"
            />
        </section>
    );
}