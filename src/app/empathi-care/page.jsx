"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const sections = [
    { id: "tldr", label: "TL;DR" },
    { id: "role", label: "Role & Scope" },
    { id: "modules", label: "Modules Tested" },
    { id: "strategy", label: "Test Strategy" },
    { id: "skills", label: "QA Skills & Toolset" },
    { id: "test-cases", label: "Sample Test Cases" },
    { id: "report", label: "Test Report & Bug" },
    { id: "improvement", label: "Process Improvement" },
    { id: "star", label: "STAR Summary" },
];

const META = [
    { label: "Role", value: "Quality Engineer (Team Lead)" },
    { label: "Project", value: "EmpathiCare - Mental Health Care Platform" },
    { label: "Year", value: "2023" },
];

const STATS = [
    { value: "612", label: "Test cases written & executed" },
    { value: "3", label: "Platforms: web, mobile, API" },
    { value: "9", label: "Defects logged" },
];

const LINKS = [
    { label: "GitHub Organization", href: "https://github.com/Capstone-Mental-Health-Care-Group-6" },
    {
        label: "Project README",
        href: "https://github.com/Capstone-Mental-Health-Care-Group-6/.github/tree/main/profile/README.md",
    },
    // [TODO] add public links to your test case sheet, bug reports, and Postman collection
];

const RESPONSIBILITIES = [
    "Led a team of 3 Quality Engineers and split the test workload across web, mobile, and API",
    "Owned test scenarios, test cases, and the overall QE implementation",
    "Logged defects with clear steps to reproduce and expected vs actual results, then re-tested fixes before release",
    "Used Git workflow, CI/CD, and GitHub Project for task tracking, and contributed to the documentation, roadmap, and technical presentation",
];

const SCOPE = {
    inScope: [
        "Web (React), Mobile (Flutter), and RESTful API (Golang)",
        "Two user roles: End User (patient) and mental health specialist (doctor)",
        "Functional testing, negative and edge cases, API contract and status code checks, and re-testing of fixed defects",
    ],
    outOfScope: [
        "Performance and load testing",
        "Security testing",
        "Real payment or third-party production integrations",
    ],
};

const MODULES = [
    {
        platform: "Web Application",
        total: 21,
        modules: [
            "Landing Pages",
            "Authentication",
            "Dashboard & Notifications",
            "Patient Management",
            "Doctor Management",
            "User Management",
            "Chat & Video Consultation",
            "Article & Content Management",
            "Transaction Management",
            "Doctor Balance Withdrawal",
            "Consultation Package Management",
            "Profile Management",
        ],
    },
    {
        platform: "Mobile Application",
        total: 14,
        modules: [
            "Onboarding & Authentication",
            "Profile Completion",
            "Homepage",
            "Articles",
            "Instant & Premium Counseling",
            "Transaction History",
            "Feedback & Ratings",
            "Chatbot & AI Chat",
            "Profile & Account Management",
            "Privacy Policy & Terms",
        ],
    },
    {
        platform: "RESTful API",
        total: 13,
        modules: [
            "Authentication",
            "Patient Management",
            "Doctor Management",
            "Article & Category Management",
            "Counseling Packages",
            "Doctor Balance Withdrawal",
            "Chatbot & Customer Service",
            "Manual & Midtrans Transactions",
            "Chat",
            "Video Consultation",
        ],
    },
];

const TOOLING = [
    { platform: "Web UI", manual: "Chrome", automation: "Katalon Studio" },
    { platform: "Mobile", manual: "Katalon Studio", automation: "Katalon Studio" },
    { platform: "RESTful API", manual: "Postman", automation: "REST Assured" },
];

const QA_SKILLS = [
    {
        title: "Testing Types",
        items: [
            "Functional Testing",
            "Manual Testing",
            "Automation Testing",
            "API Testing",
            "Defect Re-testing",
        ],
    },
    {
        title: "Tools",
        items: [
            "Postman",
            "Google Chrome",
            "Git & GitHub",
            "GitHub Projects",
            "Spreadsheets",
            "Android Studio",
            "Vysor",
            "IntelliJ IDEA",
        ],
    },
    {
        title: "Automation & Frameworks",
        items: [
            "Katalon Studio",
            "Appium",
            "REST Assured",
            "Serenity BDD",
            "CI/CD & Git Workflow",
        ],
    },
];

const COVERAGE = [
    { label: "Web", value: 286 },
    { label: "Mobile", value: 194 },
    { label: "API", value: 132 },
];

const STRATEGY_POINTS = [
    "Wrote test scenarios from the user flows of both roles, then broke each scenario into positive, negative, and edge cases.",
    "Explored each feature manually first (Chrome, Katalon, Postman), then automated stable flows with Katalon Studio and REST Assured (with Serenity reporting) and Appium for mobile.",
    "Used the same test case format across platforms so results could be compared and reviewed by the whole team.",
    "Reported every defect with steps to reproduce, expected vs actual results, and evidence, then re-tested each fix before release.",
];

/* Case study feature for Task 3.1 - 3.2, taken from the web test case sheet. */
const FEATURE = "Doctor Login (Web)";

const TEST_CASES = [
    {
        id: "TC_WEB-022",
        type: "Positive",
        title: "Login with a valid username and password",
        objective: "Verify that a registered doctor can log in and reach the dashboard.",
        precondition: "User already has a registered account.",
        testData: "Valid username and password of a test account (password masked)",
        steps: [
            "Open the doctor login page.",
            "Fill in the username.",
            "Fill in the password.",
            "Tick the checkbox.",
            "Click the Login button.",
        ],
        expected: "User navigates to the dashboard.",
    },
    {
        id: "TC_WEB-024",
        type: "Negative",
        title: "Login with a valid username and an invalid password",
        objective: "Verify that the system rejects a wrong password and keeps the user on the login page.",
        precondition: "User already has a registered account.",
        testData: "Valid username, invalid password (\"xx\")",
        steps: [
            "Open the doctor login page.",
            "Fill in the username.",
            "Fill in the invalid password.",
            "Tick the checkbox.",
            "Click the Login button.",
        ],
        expected: "An error message is shown and the user stays on the login page.",
    },
    {
        id: "TC_WEB-026",
        type: "Negative (empty input)",
        title: "Login with a blank username and password",
        objective: "Verify that the form validates empty required fields at the boundary of valid input.",
        precondition: "User already has a registered account.",
        testData: "Username: N/A, password: N/A",
        steps: [
            "Open the doctor login page.",
            "Leave both fields empty.",
            "Click the Login button.",
        ],
        expected: "An error message is shown and the user stays on the login page.",
    },
];

const SUMMARY = {
    project: "EmpathiCare Web - All Modules",
    total: "286",
    passed: "277",
    failed: "9",
    blocked: "0",
    // note: "Manual execution: 277 passed, 9 failed, and none left unexecuted (about 96% pass rate). Automation with Katalon Studio: 106 cases passed, none failed, and 180 were not executed. Failed cases include the Download Now buttons on the user landing page (TC_WEB-004, 005, 006).",
};

const BUGS = [
    { id: "BUG_001-WEB", platform: "Web", title: "[Academic Data] Unlimited data can be added", priority: "Medium", expected: "Only 5 data entries can be added.", actual: "User can add unlimited data entries." },
    { id: "BUG_002-WEB", platform: "Web", title: "[Work Experience] Add data button has no limit", priority: "Medium", expected: "Only 5 data entries can be added.", actual: "User can add unlimited data entries." },
    { id: "BUG_003-WEB", platform: "Web", title: "[Notification] Notification detail cannot be opened", priority: "Medium", expected: "User can see the notification detail.", actual: "User cannot see the notification detail." },
    { id: "BUG_004-WEB", platform: "Web", title: "[Doctor Balance] Withdrawal works with empty data", priority: "Medium", expected: "Withdrawal is possible only when the data is filled in.", actual: "Withdrawal can be submitted even when the data is empty." },
    { id: "BUG_005-WEB", platform: "Web", title: "[Withdrawal Notification] X button cannot be clicked", priority: "Medium", expected: "User can click X and the notification closes.", actual: "User cannot click the X button." },
    { id: "BUG_001-MOBILE", platform: "Mobile", title: "[Login & Sign Up] App can be entered without an account", priority: "High", expected: "User cannot enter the app before logging in.", actual: "User can enter the app without having an account." },
    { id: "BUG_002-MOBILE", platform: "Mobile", title: "[Payment] GoPay payment form is empty", priority: "Medium", expected: "The GoPay payment form is displayed.", actual: "The GoPay payment form is empty." },
    { id: "BUG_003-MOBILE", platform: "Mobile", title: "[Counseling] Counseling data is empty", priority: "Medium", expected: "User can use the counseling feature.", actual: "Counseling data is empty, so the feature cannot be used." },
    { id: "BUG_004-MOBILE", platform: "Mobile", title: "[Notification] Notification detail cannot be opened", priority: "Low", expected: "User can see the notification detail.", actual: "User cannot see the notification detail." },
];

const BUG = {
    id: "BUG_003-MOBILE",
    title: "[Counseling] Empty Data Counseling",
    testCaseId: "-",
    reportedDate: "18/12/2023",
    priority: "Medium",
    description: "Empty Data Counseling",
    expected: "Can Use Feature Counseling",
    actual: "Empty Data Counseling, Can't Use",
    evidenceHref:
        "https://drive.google.com/file/d/1MBMVeNxFoIkmkXz0i7HoFISiwlrg06Xx/view?usp=drive_link",
};

const IMPROVEMENT = {
    initiative:
        "-",
    impact:
        "-",
};

const STAR = {
    situation:
        "EmpathiCare is an online mental health consultation platform built as a capstone project at Alterra Academy (Kampus Merdeka batch 5). Patients consult psychologists and specialists through a React web app and a Flutter mobile app, backed by a Golang API. Because users share sensitive concerns, login, consultation, and data accuracy had to work reliably across all three platforms.",
    task:
        "Worked with a team of 3 Quality Engineers to plan test scenarios, develop test cases, and conduct testing across web, mobile, and API platforms. The goal was to ensure software quality before release by identifying, documenting, and verifying defects to ensure they were properly resolved.",
    action: [
        "Wrote test scenarios from the user flows of both roles and split the work across the 3 QEs.",
        "Wrote and executed 612 test cases: 286 for web, 194 for mobile, and 132 for API.",
        "Used Katalon Studio for web and mobile, Postman and REST Assured for API, plus Serenity and Appium in the automation stack.",
        "Logged 9 defects (5 web, 4 mobile) with steps to reproduce and expected vs actual results, and discussed them with the developers.",
        "Used Git workflow, CI/CD, and GitHub Project to track tasks, and contributed to the documentation, roadmap, and technical presentation.",
    ],
    result: [
        "612 test cases executed across web, mobile, and API.",
        "9 defects found and reported before release, each re-tested after the fix.",
        "Web manual testing reached a 96% pass rate (277 of 286 passed, 9 failed), with 106 of the web cases also automated in Katalon Studio without a failure.",
    ],
};

function BulletList({ items }) {
    return (
        <ul className="list-disc pl-6 text-[#2e4150] leading-relaxed space-y-2">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

function Field({ label, children }) {
    return (
        <div className="mb-3">
            <p className="text-xs font-medium uppercase tracking-wide text-[#2e4150] mb-1">{label}</p>
            <div className="text-[#2e4150] leading-relaxed">{children}</div>
        </div>
    );
}

export default function ProjectDetail() {
    const [activeId, setActiveId] = useState(sections[0].id);
    const bookmarks = useRef(null);
    const content = useRef(null);
    const title = useRef(null);
    const subtitle = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
        );
        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            ScrollTrigger.create({
                trigger: content.current,
                start: "top 12%",
                end: () => `+=${content.current.offsetHeight - bookmarks.current.offsetHeight}`,
                pin: bookmarks.current,
                pinSpacing: false,
            });
        });

        gsap.timeline({ defaults: { ease: "power2.out" } })
            .fromTo(bookmarks.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })
            .fromTo(title.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0)
            .fromTo(subtitle.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0);

        return () => mm.revert();
    }, []);

    const scrollToSection = (id) => {
        const smoother = ScrollSmoother.get();
        const el = document.getElementById(id);
        if (smoother && el) {
            smoother.scrollTo(el, true, "top 6%");
        } else if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const backToHome = () => window.dispatchEvent(new CustomEvent("showNavbar"));

    const maxCoverage = Math.max(...COVERAGE.map((c) => c.value));

    return (
        <div className="flex items-start gap-10 px-6 sm:px-[8%] lg:px-[14%] pt-28 lg:pt-[12%] pb-24">
            <div className="hidden lg:block w-56 shrink-0">
                <aside ref={bookmarks} className="h-fit">
                    <Link
                        href="/"
                        onClick={backToHome}
                        className="flex items-center gap-2 text-[#2e4150] hover:text-accent transition-colors duration-300 mb-4"
                    >
                        <FiArrowLeft size={18} />
                        Back
                    </Link>
                    <nav className="flex flex-col">
                        {sections.map((section) => {
                            const isActive = activeId === section.id;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`text-left py-2 pl-4 border-l-2 transition-all duration-300 cursor-pointer ${isActive
                                        ? "border-accent text-[#2e4150] font-medium"
                                        : "border-neutral-200 text-[#9CA3AF] hover:text-[#2e4150] hover:border-neutral-400"
                                        }`}
                                >
                                    {section.label}
                                </button>
                            );
                        })}
                    </nav>
                </aside>
            </div>

            <main ref={content} className="w-full max-w-3xl">
                <Link
                    href="/"
                    onClick={backToHome}
                    className="lg:hidden flex items-center gap-2 text-[#2e4150] hover:text-accent transition-colors duration-300 mb-6"
                >
                    <FiArrowLeft size={18} />
                    Back
                </Link>

                <h1 ref={title} className="text-3xl font-semibold text-foreground mb-2">
                    EmpathiCare - Mental Health Care Platform
                </h1>
                <p ref={subtitle} className="text-lg text-[#2e4150] mb-14">
                    Quality Engineer - Alterra Academy Capstone (Kampus Merdeka Batch 5)
                </p>

                {/* TL;DR */}
                <section id="tldr" className="mb-14">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">TL;DR</h2>
                    <p className="text-[#2e4150] leading-relaxed mb-4">
                        EmpathiCare is an online platform that helps users manage stress and anxiety by
                        consulting psychologists and mental health specialists and by reading useful
                        mental health information. It runs on a React web app, a Flutter mobile app, and
                        a Golang API.
                    </p>
                    <p className="text-[#2e4150] leading-relaxed mb-6">
                        I led a team of 3 Quality Engineers. We wrote and executed 612 test cases across
                        web, mobile, and API, logged 9 defects with clear reproduction steps, and
                        re-tested every fix before release.
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {STATS.map((s) => (
                            <div
                                key={s.label}
                                className="rounded-2xl border border-neutral-200 bg-secondary px-3 py-5 text-center"
                            >
                                <p className="text-2xl sm:text-3xl font-medium text-accent">{s.value}</p>
                                <p className="text-xs sm:text-sm text-[#2e4150] mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6">
                        {LINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-secondary px-4 py-2 text-sm text-[#2e4150] hover:text-accent transition-colors duration-300"
                            >
                                {l.label}
                                <FiExternalLink size={14} />
                            </a>
                        ))}
                    </div>

                    <div className="bg-neutral-100 rounded-xl p-5 text-sm text-[#2e4150] leading-relaxed">
                        Note: this is a capstone project built for learning. No real user data is shown,
                        and all credentials and keys have been removed.
                    </div>
                </section>

                {/* Role & Scope */}
                <section id="role" className="mb-14">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Role & Scope</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                        {META.map((m) => (
                            <div key={m.label} className="rounded-2xl border border-neutral-200 bg-secondary p-4">
                                <p className="text-xs text-[#2e4150]">{m.label}</p>
                                <p className="text-foreground font-medium mt-1">{m.value}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-[#2e4150] leading-relaxed mb-4">
                        I worked with the UI/UX, React, Flutter, and Golang teams. My work covered:
                    </p>
                    <div className="mb-8">
                        <BulletList items={RESPONSIBILITIES} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-neutral-200 bg-secondary p-5">
                            <h3 className="text-foreground font-medium mb-3">In scope</h3>
                            <BulletList items={SCOPE.inScope} />
                        </div>
                        <div className="rounded-2xl border border-neutral-200 bg-secondary p-5">
                            <h3 className="text-foreground font-medium mb-3">Out of scope</h3>
                            <BulletList items={SCOPE.outOfScope} />
                        </div>
                    </div>
                </section>

                {/* Modules Tested */}
                <section id="modules" className="mb-14">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        Modules Tested
                    </h2>

                    <p className="text-[#2e4150] leading-relaxed mb-6">
                        Testing coverage across the web application, mobile
                        application, and RESTful API, covering key user
                        workflows and system functionality.
                    </p>

                    <div className="space-y-4">
                        {MODULES.map((platform) => (
                            <div
                                key={platform.platform}
                                className="rounded-2xl border border-neutral-200 bg-secondary p-5"
                            >
                                <div className="flex items-center justify-between gap-3 mb-4">
                                    <h3 className="text-foreground font-medium">
                                        {platform.platform}
                                    </h3>

                                    <span className="text-sm font-medium text-accent whitespace-nowrap">
                                        {platform.total} Modules
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                    {platform.modules.map((module, index) => (
                                        <div
                                            key={module}
                                            className="flex items-start gap-3 text-sm text-[#2e4150]"
                                        >
                                            <span className="text-accent font-medium min-w-5">
                                                {String(index + 1).padStart(2, "0")}.
                                            </span>

                                            <span>{module}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* QA Skills & Toolset */}
                <section id="skills" className="mb-14">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                        QA Skills & Toolset
                    </h2>

                    <p className="text-[#2e4150] leading-relaxed mb-6">
                        Testing approaches, tools, and automation frameworks
                        used throughout the EmpathiCare project.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {QA_SKILLS.map((skill, index) => (
                            <div
                                key={skill.title}
                                className={`rounded-2xl border border-neutral-200 bg-secondary p-5 ${index === 2 ? "sm:col-span-2" : ""
                                    }`}
                            >
                                <h3 className="text-foreground font-medium mb-4">
                                    {skill.title}
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-[#2e4150]"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Test Strategy */}
                <section id="strategy" className="mb-14">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Test Strategy</h2>
                    <p className="text-[#2e4150] leading-relaxed mb-4">
                        I split testing by platform and picked tools that fit each one:
                    </p>

                    <div className="overflow-x-auto rounded-2xl border border-neutral-200 mb-6">
                        <table className="w-full text-sm text-left text-[#2e4150]">
                            <thead className="bg-secondary text-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Platform</th>
                                    <th className="px-4 py-3 font-medium">Manual</th>
                                    <th className="px-4 py-3 font-medium">Automation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TOOLING.map((t) => (
                                    <tr key={t.platform} className="border-t border-neutral-200">
                                        <td className="px-4 py-3 font-medium">{t.platform}</td>
                                        <td className="px-4 py-3">{t.manual}</td>
                                        <td className="px-4 py-3">{t.automation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-foreground font-medium mb-3">Test case coverage (612 total)</h3>
                    <div className="space-y-3 mb-6">
                        {COVERAGE.map((c) => (
                            <div key={c.label}>
                                <div className="flex justify-between text-sm text-[#2e4150] mb-1">
                                    <span>{c.label}</span>
                                    <span>{c.value}</span>
                                </div>
                                <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-accent"
                                        style={{ width: `${(c.value / maxCoverage) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <BulletList items={STRATEGY_POINTS} />
                </section>

                {/* Sample Test Cases */}
                <section id="test-cases" className="mb-14">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Sample Test Cases</h2>
                    <p className="text-[#2e4150] leading-relaxed mb-6">
                        Three examples from the <strong>{FEATURE}</strong> feature, covering a positive
                        case, a negative case, and an edge case.
                    </p>

                    <div className="overflow-x-auto rounded-2xl border border-neutral-200">
                        <table className="w-full min-w-[900px] text-sm text-left text-[#2e4150] align-top">
                            <thead className="bg-secondary text-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium whitespace-nowrap">Test ID</th>
                                    <th className="px-4 py-3 font-medium">Type</th>
                                    <th className="px-4 py-3 font-medium">Title</th>
                                    <th className="px-4 py-3 font-medium">Precondition</th>
                                    <th className="px-4 py-3 font-medium">Test data</th>
                                    <th className="px-4 py-3 font-medium">Steps</th>
                                    <th className="px-4 py-3 font-medium">Expected result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TEST_CASES.map((tc) => (
                                    <tr key={tc.id} className="border-t border-neutral-200 align-top">
                                        <td className="px-4 py-3 font-medium text-accent whitespace-nowrap">{tc.id}</td>
                                        <td className="px-4 py-3">{tc.type}</td>
                                        <td className="px-4 py-3">
                                            <p className="text-foreground font-medium">{tc.title}</p>
                                            <p className="mt-1 text-xs leading-relaxed">{tc.objective}</p>
                                        </td>
                                        <td className="px-4 py-3">{tc.precondition}</td>
                                        <td className="px-4 py-3">{tc.testData}</td>
                                        <td className="px-4 py-3">
                                            <ol className="list-decimal pl-4 space-y-1">
                                                {tc.steps.map((step) => (
                                                    <li key={step}>{step}</li>
                                                ))}
                                            </ol>
                                        </td>
                                        <td className="px-4 py-3">{tc.expected}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Test Report & Bug */}
                <section id="report" className="mb-14">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Test Report & Bug Finding</h2>

                    <h3 className="text-foreground font-medium mb-3">Test summary</h3>
                    <div className="rounded-2xl border border-neutral-200 bg-secondary p-5 mb-3">
                        <Field label="Project / feature">{SUMMARY.project}</Field>
                        <Field label="Total test cases executed">{SUMMARY.total}</Field>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {[
                            { label: "Passed", value: SUMMARY.passed },
                            { label: "Failed", value: SUMMARY.failed },
                            { label: "Blocked", value: SUMMARY.blocked },
                        ].map((s) => (
                            <div
                                key={s.label}
                                className="rounded-2xl border border-neutral-200 bg-secondary px-3 py-5 text-center"
                            >
                                <p className="text-2xl font-medium text-accent">{s.value}</p>
                                <p className="text-xs sm:text-sm text-[#2e4150] mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-[#2e4150] leading-relaxed mb-8">{SUMMARY.note}</p>

                    <h3 className="text-foreground font-medium mb-3">
                        Sample Bug Report
                    </h3>

                    <div className="rounded-2xl border border-neutral-200 bg-secondary p-5 mb-8">
                        <Field label="Bug ID & Title">
                            {BUG.id} - {BUG.title}
                        </Field>

                        <Field label="Test Case ID">
                            {BUG.testCaseId}
                        </Field>

                        <Field label="Reported Date">
                            {BUG.reportedDate}
                        </Field>

                        <Field label="Priority">
                            {BUG.priority}
                        </Field>

                        <Field label="Description">
                            {BUG.description}
                        </Field>

                        <Field label="Expected Result">
                            {BUG.expected}
                        </Field>

                        <Field label="Actual Result">
                            {BUG.actual}
                        </Field>

                        <Field label="Attachment / Evidence">
                            <a
                                href={BUG.evidenceHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-accent hover:underline"
                            >
                                Documentation Testing
                                <FiExternalLink size={14} />
                            </a>
                        </Field>
                    </div>

                    <h3 className="text-foreground font-medium mb-3">All defects found (9)</h3>
                    <p className="text-[#2e4150] leading-relaxed mb-4">
                        5 on web and 4 on mobile. Each one was logged with expected vs actual results and
                        evidence, then re-tested after the fix before release.
                    </p>
                    <div className="space-y-3">
                        {BUGS.map((b) => (
                            <div key={b.id} className="rounded-2xl border border-neutral-200 bg-secondary p-4">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="text-xs font-medium text-accent">{b.id}</span>
                                    <span className="text-xs rounded-full bg-neutral-100 px-2 py-0.5 text-[#2e4150]">
                                        {b.priority}
                                    </span>
                                </div>
                                <p className="text-foreground font-medium text-sm mb-2">{b.title}</p>
                                <p className="text-sm text-[#2e4150] leading-relaxed">
                                    <span className="font-medium">Expected:</span> {b.expected}
                                </p>
                                <p className="text-sm text-[#2e4150] leading-relaxed">
                                    <span className="font-medium">Actual:</span> {b.actual}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Process Improvement */}
                <section id="improvement" className="mb-14">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Process Improvement</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-neutral-200 bg-secondary p-5">
                            <h3 className="text-foreground font-medium mb-2">Initiative</h3>
                            <p className="text-sm text-[#2e4150] leading-relaxed">{IMPROVEMENT.initiative}</p>
                        </div>
                        <div className="rounded-2xl border border-neutral-200 bg-secondary p-5">
                            <h3 className="text-foreground font-medium mb-2">Impact</h3>
                            <p className="text-sm text-[#2e4150] leading-relaxed">{IMPROVEMENT.impact}</p>
                        </div>
                    </div>
                </section>

                {/* STAR */}
                <section id="star">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">STAR Summary</h2>

                    <h3 className="text-xl font-semibold text-foreground mb-2">Situation</h3>
                    <p className="text-[#2e4150] leading-relaxed mb-6">{STAR.situation}</p>

                    <h3 className="text-xl font-semibold text-foreground mb-2">Task</h3>
                    <p className="text-[#2e4150] leading-relaxed mb-6">{STAR.task}</p>

                    <h3 className="text-xl font-semibold text-foreground mb-2">Action</h3>
                    <div className="mb-6">
                        <BulletList items={STAR.action} />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2">Result</h3>
                    <BulletList items={STAR.result} />
                </section>
            </main>
        </div>
    );
}
