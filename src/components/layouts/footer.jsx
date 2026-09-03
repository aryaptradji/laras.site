"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Footer() {
    const container = useRef(null);

    useGSAP(() => {
        gsap.set(container.current, { opacity: 0, y: 40 });
        gsap.to(container.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                toggleActions: "play none none reverse",
            }
        });
    }, []);

    return (
        <section
            ref={container}
            className="font-serif w-full text-[11rem] leading-[0.5] pt-8 font-medium text-center"
            style={{
                maskImage: 'linear-gradient(to bottom, var(--primary) 0%, var(--primary) 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, var(--primary) 0%, var(--primary) 60%, transparent 100%)'
            }}
        >
            Larasati Maharani
        </section>
    );
}