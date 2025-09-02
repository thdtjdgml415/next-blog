"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  isAnimating: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = Math.random() * 0.4 - 0.2;
    this.speedY = Math.random() * 0.4 - 0.2;
    this.alpha = 1;
    this.isAnimating = false;
  }

  update(canvas: HTMLCanvasElement) {
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save(); // ✨ 2. 현재 컨텍스트 상태 저장
    ctx.globalAlpha = this.alpha; // 이 파티클을 그릴 때만 alpha 값 적용
    ctx.fillStyle = "#9fa4ff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore(); // ✨ 3. 저장했던 컨텍스트 상태 복원
  }
}

class ClickEffect {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  maxRadius: number; // 클릭 감지 범위 (여기서는 p.size * 2)

  constructor(x: number, y: number, detectionRadius: number) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.alpha = 1;
    this.maxRadius = detectionRadius;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;

    // 내부 원 (추가 효과)
    if (this.radius > 5) {
      ctx.globalAlpha = this.alpha * 0.5;
      ctx.strokeStyle = "#9fa4ff";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.7, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isParticleInRange = (
    px: number,
    py: number,
    clickX: number,
    clickY: number,
    range: number
  ): boolean => {
    const dx = clickX - px;
    const dy = clickY - py;
    const distanceSquared = dx * dx + dy * dy;
    const rangeSquared = range * range;
    return distanceSquared <= rangeSquared;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let clickEffects: ClickEffect[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        const p = new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
        particles.push(p);

        // ✨ 4. GSAP로 파티클 생성 애니메이션 추가
        // 처음에는 size와 alpha가 0이었다가 원래 값으로 복귀
        gsap.from(p, {
          size: 0,
          alpha: 0,
          duration: Math.random() * 1.5 + 0.5,
          ease: "power2.out",
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update(canvas);
        p.draw(ctx);
      });

      // 클릭 효과 그리기 및 정리
      clickEffects = clickEffects.filter((effect) => {
        effect.draw(ctx);
        return effect.alpha > 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // 최적화된 거리 계산 함수 (제곱근 계산 생략)

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      const mouseX = event.clientX - rect.x;
      const mouseY = event.clientY - rect.y;

      // 클릭 감지 범위 설정
      const detectionRadius = 30; // 고정된 감지 반경
      const clickEffect = new ClickEffect(mouseX, mouseY, detectionRadius);
      clickEffects.push(clickEffect);

      // ✨ 누락되었던 ClickEffect 애니메이션 시작 코드 추가
      gsap.to(clickEffect, {
        radius: detectionRadius * 1.5,
        alpha: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // 영향받은 파티클 수 카운트
      let affectedCount = 0;

      // 범위 내의 모든 파티클 처리
      particles.forEach((p) => {
        // 이미 애니메이션 중이면 스킵
        if (p.isAnimating) return;

        // 최적화된 거리 체크
        if (isParticleInRange(p.x, p.y, mouseX, mouseY, detectionRadius)) {
          affectedCount++;
          p.isAnimating = true;

          // 거리에 따른 지연 효과 추가
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const delay = (distance / detectionRadius) * 0.1;

          // 파티클 터지는 애니메이션
          gsap.to(p, {
            size: p.size * 5,
            alpha: 0,
            duration: 0.4,
            delay: delay,
            ease: "power3.out",
            onComplete: () => {
              // 새로운 위치에 재생성
              p.x = Math.random() * canvas.width;
              p.y = Math.random() * canvas.height;
              p.size = Math.random() * 1.5 + 0.5;
              p.speedX = Math.random() * 0.4 - 0.2;
              p.speedY = Math.random() * 0.4 - 0.2;

              // 다시 나타나는 애니메이션
              gsap.to(p, {
                alpha: 1,
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                  p.isAnimating = false;
                },
              });
            },
          });
        }
      });

      // 디버깅용 콘솔 로그
      console.log(`클릭 위치: (${mouseX.toFixed(0)}, ${mouseY.toFixed(0)})`);
      console.log(`영향받은 파티클: ${affectedCount}개`);
      console.log(`감지 반경: ${detectionRadius}px`);
    };

    const handleResize = () => {
      resizeCanvas();
      init();
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("click", handleClick);
    resizeCanvas();
    init();
    animate();

    // GSAP Animations
    // gsap.fromTo(
    //   ".hero-title",
    //   { y: 50, opacity: 0 },
    //   { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    // );
    gsap.fromTo(
      ".hero-subtitle",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(
      ".hero-description",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.1, ease: "power3.out" }
    );
    gsap.fromTo(
      ".scroll-indicator",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        delay: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      }
    );

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center text-center">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="z-10 px-4">
        <p className="hero-subtitle mt-4 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
          함께 성장하고 시너지를 내는 환경에 기여하며,
          <br />
          새로운 기술을 빠르게 익혀 실제 프로젝트에 적용하는 것을 즐깁니다.
        </p>
        <div className="hero-description mt-8 text-gray-500 max-w-3xl mx-auto">
          <p>
            다양한 프로젝트에서 모노레포 아키텍처를 적용하고, Github Projects로
            협업 프로세스를 개선한 경험이 있습니다. <br /> 팀 내 컨벤션 확립과
            활발한 소통을 통해 주도적으로 문제를 해결합니다.
          </p>
        </div>
      </div>
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
