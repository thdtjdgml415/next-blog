"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projectData = [
  {
    title: "PMS (프로젝트 관리 시스템)",
    company: "피엠에스엘플러스",
    period: "2024.09 ~ 2025.07",
    description:
      "프로젝트 기획부터 위험관리까지 전 과정을 지원하는 웹 서비스입니다. 게시판, 워크플로우, 생산성 관리 등 다양한 관리 페이지를 개발했습니다.",
    tasks: [
      "로그인 페이지 LCP 이미지 최적화 (로딩 37% 개선)",
      "rtk-query 도입으로 API 캐싱 및 서버 상태 관리 최적화",
      "가상 스크롤로 10,000개 이상 대용량 데이터 처리",
      "re-charts, React-Flow 커스터마이징으로 데이터 시각화",
      "Turbo Repo 모노레포 및 Docker로 빌드 시간 75% 단축",
      "next-intl을 활용한 다국어(3개) 지원",
      "RTK Query 미들웨어로 공통 에러 처리 및 토큰 관리 시스템 구축",
    ],
    src: ["/projects/produtivity.png"],
  },
  {
    title: "Davis (PMS 연동 LLM)",
    company: "피엠에스엘플러스",
    period: "2025.03 ~ 2025.09",
    description: "PMS+ 데이터를 생성형 LLM으로 쉽게 관리하는 서비스입니다.",
    tasks: [
      "커스텀 훅 패턴으로 뷰와 로직 분리",
      "SSR과 서버 컴포넌트를 적극 활용하여 초기 로딩 속도 개선",
      "Redux-Toolkit으로 전역 상태 관리",
      "SSE를 활용하여 AI 답변 단방향 실시간 통신 구현",
      "Azure-pipeline 및 Docker를 활용한 배포 자동화",
    ],
    src: ["/projects/davis.png"],
  },
  {
    title: "a015 (웹 문자/ARS 서비스)",
    company: "스탠다드 네트웍스",
    period: "2023.01 ~ 2024.03",
    description:
      "015 번호를 이용한 주소록 관리, 문자 전송, ARS가 가능한 웹 서비스입니다.",
    tasks: [
      "Velocity/jQuery 기반 레거시 시스템을 React SPA로 전면 개편",
      "NICE PASS 본인인증 모듈 연동 및 로그인/회원가입 시스템 구축",
      "React-Query로 서버 데이터 캐싱하여 불필요한 API 호출 제거",
      "React-Hook-Form으로 동적 폼 및 유효성 검사 최적화",
      "GitHub Projects 도입으로 이슈 관리 및 업무 프로세스 개선",
    ],
    src: ["/projects/arreo.png"],
  },
  {
    title: "VOC (통합 고객 민원 게시판)",
    company: "스탠다드 네트웍스",
    period: "2023.06 ~ 2023.08",
    description:
      "사내 3개 사이트에서 사용되는 고객 민원 게시판을 통합 플랫폼으로 구축했습니다.",
    tasks: [
      "파편화된 민원 시스템 통합으로 관리 효율성 향상 및 처리 프로세스 25% 감소",
      "Query String을 활용한 유입 사이트 자동 추적 및 분류 시스템 구현",
      "Recoil을 활용한 전역 상태 관리 구조 설계",
      "Nginx를 활용한 배포 환경 설정 및 운영",
    ],
    src: ["/projects/voc.png"],
  },
];

export function ProjectSection() {
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

    const cards = section.querySelectorAll(".project-card");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <h2 className="text-4xl font-bold text-center mb-12">주요 프로젝트</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectData.map((project, index) => (
          <div
            key={index}
            className="project-card group [perspective:1100px] w-full min-h-[600px]"
          >
            <div className="relative w-full h-full group-hover:rotate-y-180 [transform-style:preserve-3d] duration-500">
              <Card className="bg-primary-foreground z-10 card-dynamic-size card-front-back shadow-none [transform-style:preserve-3d] overflow-auto">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-[var(--brand-color)]">
                      {project.title}
                    </CardTitle>
                    <Badge variant="secondary">{project.company}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{project.period}</p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-gray-400 mb-4 flex-grow">
                    {project.description}
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    {project.tasks.map((task, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[var(--brand-color)] mr-2 shrink-0">
                          ✓
                        </span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-primary-foreground card-dynamic-size card-front-back rotate-y-180 shadow-none [transform-style-preserve-3d]">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-[var(--brand-color)]">
                      이미지
                    </CardTitle>
                    <Badge variant="secondary">{project.company}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{project.period}</p>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <Image
                    src={project.src[0]}
                    alt="project"
                    width={300}
                    height={400}
                    sizes="200px"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
