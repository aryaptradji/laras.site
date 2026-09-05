"use client";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const projects = [
  {
    image: "/assets/heroimg2.jpg",
    title: "Kemenkeu Learning Center (KLC) Re-engineering",
    url: "/kemenkeu-learning-center",
    role: "System Analyst & UI/UX Designer",
    productName: "Kemenkeu Learning Center",
    productInitial: "/assets/logo-klc.jpg",
    year: "2026",
    tags: [
      "Business Analysis",
      "Requirements Analysis",
      "BPMN",
      "BRD",
      "Process Mapping",
      "Use Case",
      "User Flow",
      "UI/UX",
      "Wireframing",
      "Prototyping",
      "Figma",
    ],
  },
  {
    image: "/assets/heroimg2.jpg",
    title: "Complaint Hub – AI-Powered Complaint Management System",
    url: "/complaint-hub",
    role: "Fullstack & AI Engineer",
    productName: "Complaint Hub",
    productInitial: "/assets/complainthub.png",
    year: "2025",
    tags: [
      "Web Development",
      "Laravel",
      "MySQL",
      "Python",
      "FastAPI",
      "TensorFlow",
      "Keras",
      "Bi-LSTM",
      "Sentiment Analysis",
      "System Design",
      "Dashboard",
      "UAT",
      "Black Box Testing",
      "SUS",
      "NPS",
    ],
  },
  {
    image: "/assets/heroimg2.jpg",
    title: "Smart Cat Feeder – IoT Monitoring System",
    url: "/smart-cat-feeder",
    role: "Team Lead & Web Developer",
    productName: "Smart Cat Feeder",
    productInitial: "/assets/smartcatfeeder.jpg",
    year: "2024",
    tags: [
      "IoT",
      "Web Development",
      "Laravel",
      "MySQL",
      "Python",
      "FastAPI",
      "TensorFlow",
      "Keras",
      "Bi-LSTM",
      "Sentiment Analysis",
      "Real-time Dashboard",
      "System Integration",
      "Team Leadership",
    ],
  },
  {
    image: "/assets/heroimg2.jpg",
    title: "EmpathiCare – Mental Health Care Platform",
    url: "/empathi-care",
    role: "Quality Engineer",
    productName: "EmpathiCare",
    productInitial: "/assets/empathi-care.jpg",
    year: "2023",
    tags: [
      "Quality Assurance",
      "Manual Testing",
      "Automation Testing",
      "Web UI Testing",
      "API Testing",
      "Mobile Testing",
      "Functional Testing",
      "Integration Testing",
      "Unit Testing",
      "Postman",
      "Katalon Studio",
      "REST Assured",
      "Serenity BDD",
      "Appium",
      "Test Case",
      "Test Plan",
      "Test Management",
    ],
  },
];

export default function Projects() {
  const labelRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(() => {
    const cards = cardRefs.current;

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;

      ScrollTrigger.create({
        trigger: card,
        start: "top top+=100",
        endTrigger: cards[cards.length - 1],
        end: "top top+=100",
        pin: true,
        pinSpacing: false,
      });
    });

    ScrollTrigger.create({
      trigger: cards[0],
      start: "top top+=100",
      endTrigger: cards[cards.length - 1],
      end: "top top+=100",
      pin: labelRef.current,
      pinSpacing: false,
    });
  }, []);

  return (
    <section className="relative z-3 w-full mx-auto pt-40" id="projects">
      <div className="flex justify-center gap-8 md:gap-12 px-20">
        <div ref={labelRef}>
          <h2 className="text-xl font-medium text-foreground text-nowrap">
            Featured Projects
          </h2>
          <p className="text-foreground-2 mt-1">Case Studies</p>
        </div>

        <div ref={containerRef} className="flex flex-col gap-4 w-[66%] h-full">
          {projects.map((project, index) => (
            <Link key={index} href={project.url}>
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className="group w-full h-100 max-h-100 bg-secondary border border-neutral-200 rounded-4xl p-4 flex flex-col md:flex-row gap-8"
                style={{ zIndex: index + 1 }}
              >
                <div className="relative w-full md:w-[48%] h-full rounded-3xl overflow-hidden shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              
                <div className="flex flex-col justify-between py-2 pr-2 flex-1">
                  <div>
                    <h3 className="text-xl font-medium text-foreground leading-snug group-hover:underline">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground-2 mt-2">{project.role}</p>
              
                    <div className="h-px bg-neutral-200 my-6" />
              
                    <div className="flex gap-16">
                      <div>
                        <p className="text-xs text-foreground-2">Product</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="relative w-7 h-7 rounded-md overflow-hidden shrink-0 border border-neutral-200">
                            <Image
                              src={project.productInitial}
                              alt={project.productName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-foreground font-medium">
                            {project.productName}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-foreground-2">Year</p>
                        <p className="text-foreground font-medium mt-2">
                          {project.year}
                        </p>
                      </div>
                    </div>
                  </div>
              
                  <div className="flex flex-wrap gap-2 mt-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full border bg-neutral-100 border-neutral-300 text-xs text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
