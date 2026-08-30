import React from "react";
import { ArrowUpRight, Star } from "lucide-react";

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col items-center bg-background px-4 pt-6 sm:px-8" id="hero">
            <div className="relative mt-auto grid w-[90%] grid-cols-1 items-center gap-8 sm:grid-cols-[1fr_auto_1fr]">
                {/* Testimonial */}
                <div className="order-2 flex flex-col gap-3 sm:order-1 sm:max-w-55">
                    <span className="text-4xl leading-none text-neutral-900">
                        &ldquo;
                    </span>
                    <p className="text-sm leading-relaxed text-neutral-500">
                        Jenny&rsquo;s Exceptional product design ensure our website&rsquo;s
                        success. Highly Recommended
                    </p>
                </div>

                {/* Center: headline + placeholder shape */}
                <div className="order-1 flex flex-col items-center text-center sm:order-2">
                    <span className="mb-6 inline-flex items-center gap-1 rounded-full border border-gray-200 px-4 py-1.5 text-sm font-semibold">
                        Hello!
                    </span>

                    <h1 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
                        I&rsquo;m <span className="text-primary">Laras</span>,
                        <br />
                        System Analyst
                    </h1>

                    {/* Photo placeholder */}
                    <div className="relative mt-8 flex h-70 w-70 items-end justify-center overflow-hidden rounded-t-full bg-primary sm:h-80 sm:w-[30vw]">
                        <span className="mb-10 text-sm font-medium text-orange-100">

                        </span>

                        <div className="absolute bottom-6 flex items-center gap-2 p-2 rounded-full backdrop-blur-xl bg-white/10 shadow-sm">
                            <button className="flex items-center gap-1 rounded-full bg-primary px-6 py-2 text-md font-semibold text-background">
                                Portfolio
                                <ArrowUpRight size={20} className="mt-0.5" />
                            </button>
                            <button className="rounded-full ps-2.5 pe-4 py-2.5 text-md font-medium text-white">
                                Hire me
                            </button>
                        </div>
                    </div>
                </div>

                {/* Rating */}
                <div className="order-3 flex flex-col items-center gap-1 text-center sm:items-end sm:text-right">
                    <div className="flex gap-1 text-primary">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                        ))}
                    </div>
                    <p className="text-2xl font-bold text-neutral-900">10 Years</p>
                    <p className="text-sm text-neutral-500">Experience</p>
                </div>
            </div>
        </section>
    );
}