"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const sideProjectData = [
  {
    title: "기술 블로그",
    url: "https://next-blog-techsongblog.vercel.app/",
    description:
      "개인의 생각과 학습한 기술을 정리한 블로그입니다. metadata와 이미지 최적화, SSG를 활용하여 SEO와 성능을 극대화했습니다.",
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Shadcn"],
  },
  {
    title: "M-CARD (토이 프로젝트)",
    url: "https://m-card-sandy.vercel.app/",
    description:
      "카드 발급 프로세스를 이해하기 위해 만든 토이 프로젝트입니다. Polling 기법, Firebase 인증/DB 등을 활용했습니다.",
    tech: ["React", "TypeScript", "Emotion", "Recoil", "Firebase"],
  },
  {
    title: "GSAP 포트폴리오",
    url: "https://thdtjdgml415.github.io/portpolio/index5.html",
    description:
      "GSAP 애니메이션 라이브러리를 학습하여 만든 인터랙티브 포트폴리오 웹사이트입니다.",
    tech: ["HTML", "CSS", "JavaScript", "GSAP"],
  },
];

export function SideProjectSection() {
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

    const cards = section.querySelectorAll(".side-project-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: "top 90%" },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <h2 className="text-4xl font-bold text-center mb-12">사이드 프로젝트</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sideProjectData.map((project, index) => (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="side-project-card block"
          >
            <Card className="bg-gray-900 border-gray-800 h-full hover:border-cyan-400 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-400">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-gray-400 border-gray-600"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
