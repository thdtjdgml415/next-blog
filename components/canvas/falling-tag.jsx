"use client";

import Matter from "matter-js";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export const FallingTag = ({ tags }) => {
  const { theme } = useTheme();
  const engineRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const runnerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current === null || canvasRef.current === null) return;
    const { Engine, Runner, World, Bodies, Composite, Mouse, MouseConstraint } =
      Matter;

    const engine = Engine.create({
      gravity: { y: 0.6 },
      positionIterations: 10,
      velocityIterations: 10,
    });
    const world = engine.world;
    engineRef.current = engine;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    const columns = 5;
    const tagSpacing = 10;
    const tagBodies = tags.map((label, index) => {
      const textMetrics = ctx.measureText(label);

      const width = textMetrics.width + 20;
      const height = textMetrics.width;

      const column = index % columns;
      const row = Math.floor(index / columns);

      const x =
        (containerWidth / columns) * column + containerWidth / (columns * 2);
      const y = -row * (height + tagSpacing) - 100;

      const body = Bodies.rectangle(x, y, width, height, {
        restitution: 0.2,
        friction: 0.1,
        frictionStatic: 0.2,
        render: {
          fillStyle: "#5c67f2",
          strokeStyle: "#020817",
          lineWidth: 1,
        },
      });

      body.label = label;
      return body;
    });
    const ground = Bodies.rectangle(
      containerWidth / 2,
      containerHeight,
      containerWidth,
      60,
      { isStatic: true, render: { visible: false }, label: "ground" }
    );
    const leftWall = Bodies.rectangle(
      0,
      containerHeight / 2,
      60,
      containerHeight,
      { isStatic: true, render: { visible: false }, label: "leftWall" }
    );
    const rightWall = Bodies.rectangle(
      containerWidth,
      containerHeight / 2,
      60,
      containerHeight,
      { isStatic: true, render: { visible: false }, label: "rightWall" }
    );

    World.add(world, [...tagBodies, ground, leftWall, rightWall]);

    const mouse = Mouse.create(canvasRef.current);
    console.log(mouse);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    World.add(world, mouseConstraint);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    let animationFrameId;
    (function rerender() {
      ctx.clearRect(0, 0, containerWidth, containerHeight);

      Composite.allBodies(world).forEach((body) => {
        if (body.render.visible && !body.isStatic) {
          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);

          ctx.fillStyle = body.render.fillStyle;
          ctx.strokeStyle = body.render.strokeStyle;
          ctx.lineWidth = body.render.lineWidth;
          ctx.beginPath();
          const width = body.bounds.max.x - body.bounds.min.x;
          const height = body.bounds.max.y - body.bounds.min.y;
          ctx.roundRect(-width / 2, -height / 2, width, height, 10);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.font = "14px";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fontStyle = "bold";
          ctx.fillText(body.label, 0, 0);

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(rerender);
    })();

    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current || !engineRef.current)
        return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Update wall and ground positions
      Composite.allBodies(engineRef.current.world).forEach((body) => {
        if (body.isStatic) {
          if (body.label === "ground")
            Matter.Body.setPosition(body, { x: newWidth / 2, y: newHeight });
          if (body.label === "leftWall")
            Matter.Body.setPosition(body, { x: 0, y: newHeight / 2 });
          if (body.label === "rightWall")
            Matter.Body.setPosition(body, { x: newWidth, y: newHeight / 2 });
        }
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runnerRef.current);
      World.clear(engineRef.current.world, false);
      Engine.clear(engineRef.current);
      Mouse.clearSourceEvents(mouse);
      window.removeEventListener("resize", handleResize);
    };
  }, [tags]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-20 md:py-32 w-full h-full min-h-[500px] flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="w-[300px] h-full"></div>

      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      ></canvas>
    </section>
  );
};
