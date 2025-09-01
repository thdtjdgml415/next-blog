"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export const CuboidCanvas = () => {
  const canvasRef = useRef(null);
  const mousePointRef = useRef(null);

  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!canvas) return;

    let animationFrameId;
    let angleX = 0;
    let angleY = 0;
    let snowflakes = [];

    const setUpCanvas = () => {
      snowflakes = [];
      const snowflakeCount = 600;

      // 캔버스 크기 설정
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // --- 눈송이 효과 설정 시작 ---

      for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1, // 1px ~ 3px
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: Math.random() * 1 + 0.5, // 0.5px/frame ~ 1.5px/frame
        });
      }
    };
    const draw = () => {
      // 캔버스 초기화(테마 별 변경사항 적용)
      ctx.fillStyle = theme === "dark" ? "#020817" : "#FFFFFF";

      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- 눈송이 그리기 및 위치 업데이트 시작 ---
      ctx.fillStyle = theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "#22d3ee";

      ctx.beginPath();

      snowflakes.forEach((flake) => {
        // 위치 업데이트
        flake.x += flake.speedX;
        flake.y += flake.speedY;

        const mouse = mousePointRef.current;
        const interactionRadius = 80;
        if (mouse && mouse.x !== null) {
          const dx = flake.x - mouse.x;
          const dy = flake.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            flake.x += (dx / distance) * force * 2;
            flake.y += (dy / distance) * force * 2;
          }
        }

        // 화면 아래로 벗어나면 위에서 다시 시작
        if (flake.y > canvas.height) {
          flake.y = 0 - flake.radius;
          flake.x = Math.random() * canvas.width;
        }
        // 화면 좌우로 벗어나면 반대편에서 다시 시작
        if (flake.x > canvas.width + flake.radius) {
          flake.x = 0 - flake.radius;
        } else if (flake.x < 0 - flake.radius) {
          flake.x = canvas.width + flake.radius;
        }

        // 눈송이 그리기
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      });
      ctx.fill();

      // 각도 업데이트
      angleX += 0.005;
      angleY += 0.005;

      animationFrameId = requestAnimationFrame(draw);
    };
    setUpCanvas();
    draw();

    window.addEventListener("resize", setUpCanvas);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setUpCanvas);
    };
  }, [theme]);

  const handleOnMouseCanvas = ({ nativeEvent: event }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    mousePointRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handleOnMouseLeaveCanvas = (event) => {
    mousePointRef.current = {
      x: null,
      y: null,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleOnMouseCanvas}
      onMouseLeave={handleOnMouseLeaveCanvas}
      className={cn(`w-full bg-background rounded-lg shadow-xl`)}
    />
  );
};
