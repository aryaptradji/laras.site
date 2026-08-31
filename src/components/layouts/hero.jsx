import React from "react";

export default function Hero() {
    return (
        <section className="min-h-screen bg-primary mt-[8%] px-4 pt-6 sm:px-8" id="hero">
            <p className="flex gap-2 items-center text-sm text-neutral-400 mb-4">
                <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                </span>
                <span className="font-medium">1+ Years of Experience</span>
            </p>
        </section>
    );
}