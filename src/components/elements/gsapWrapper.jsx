'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { usePathname } from 'next/navigation';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);
}

export default function GSAPWrapper({ children }) {
    const wrapperRef = useRef();
    const contentRef = useRef();
    const pathname = usePathname();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const smoother = ScrollSmoother.create({
                wrapper: wrapperRef.current,
                content: contentRef.current,
                effects: false,
                smooth: 1.5,
                smoothTouch: 0.5,
                normalizeScroll: false,
            });
            // window.__smoother = smoother;
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const smoother = ScrollSmoother.get();
        if (smoother) {
            smoother.scrollTo(0, false);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return (
        <div ref={wrapperRef} id="smooth-wrapper">
            <div ref={contentRef} id="smooth-content">
                {children}
            </div>
        </div>
    );
}