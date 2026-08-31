import React from "react";

export default function Hero() {
    return (
        <section className="min-h-screen bg-primary mt-[8%] px-4 pt-6 sm:px-8" id="hero">
            <p className="flex gap-2.5 justify-center items-center text-md text-foreground-2 font-medium mb-6">
                <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-green-400"></span>
                </span>
                <span>1+ Years of Experience</span>
            </p>
            <div className="font-serif text-center text-5xl px-[26%] leading-snug tracking-tighter mb-6">
                <span>Hi! I&apos;m <span className="text-accent">Laras</span>. I bridge <span className="underline">business needs</span> and technical systems.</span>
                <span className="text-foreground-2"> Currently open to new opportunities as System Analyst.</span>
            </div>
            <div className="flex gap-4 justify-center text-lg">
                <span>
                    LinkedIn
                </span>
                <span>
                    GitHub
                </span>
                <span>
                    Email
                </span>
            </div>
        </section>
    );
}