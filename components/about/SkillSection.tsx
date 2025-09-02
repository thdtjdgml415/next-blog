"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Shadcn",
  "Styled-components",
  "Emotion",
  "Recoil",
  "RTK-Query",
  "React-Query",
  "React-Hook-Form",
  "Material React Table V3",
  "re-charts",
  "React-Flow",
  "GSAP",
  "Firebase",
  "Firestore",
  "Nginx",
  "Docker",
  "Linux",
  "Turbo Repo",
  "GitHub Projects",
  "next-intl",
  "HTML",
  "CSS",
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelector("h2"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      }
    );

    const badges = section.querySelectorAll(".skill-badge");
    gsap.fromTo(
      badges,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: section.querySelector(".skills-container"),
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <h2 className="text-4xl font-bold text-center mb-12">기술 스택</h2>
      <div className="skills-container flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="skill-badge text-md md:text-lg px-4 py-2 bg-gray-800 text-gray-300 border-gray-700"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </section>
  );
}
