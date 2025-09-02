"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const careerData = [
  {
    company: "피엠에스엘플러스",
    position: "Frontend Developer (프리랜서)",
    period: "2024.09 ~ 2025.07 (10개월)",
    description:
      "프로젝트 관리 시스템(PMS)과 데이터 연동 LLM 서비스(DAVIS)를 개발했습니다. PMS 사이트와 Davis 사이트의 개발 및 유지보수 업무를 담당했습니다.",
  },
  {
    company: "스탠다드 네트웍스 (서울이동통신)",
    position: "Frontend Developer",
    period: "2022.12 ~ 2024.03 (1년 4개월)",
    description:
      "100개 이상의 서버 문서 현행화 및 유지보수, 웹 문자 발신 서비스 'a015', 고객 민원 등록 사이트 'VOC'를 개발했습니다. 기획/설계 단계부터 참여하여 서비스 가치 증진에 기여했습니다.",
  },
];

export function CareerSection() {
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
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    const cards = section.querySelectorAll(".career-card");
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <h2 className="text-4xl font-bold text-center mb-12">경력</h2>
      <div className="relative pl-6 border-l-2 border-gray-700 space-y-12">
        {careerData.map((item, index) => (
          <div key={index} className="career-card relative">
            <div className="absolute -left-[34px] top-1.5 w-4 h-4 bg-cyan-400 rounded-full border-4 border-gray-950"></div>
            <Card className="bg-gray-900 border-gray-800 shadow-lg shadow-cyan-500/10">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-cyan-400">
                      {item.company}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      {item.position}
                    </CardDescription>
                  </div>
                  <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                    {item.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{item.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
