"use client";

import { useEffect, useRef } from "react";

export default function Particles({
  quantity = 50,
  staticity = 50,
  ease = 50,
  color = "#ffffff",
  refresh = false,
}: {
  quantity?: number;
  staticity?: number;
  ease?: number;
  color?: string;
  refresh?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const particles: any[] = [];
    const dpi = window.devicePixelRatio || 1;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    canvas.width = width * dpi;
    canvas.height = height * dpi;
    ctx.scale(dpi, dpi);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }

    for (let i = 0; i < quantity; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpi;
      canvas.height = height * dpi;
      ctx.scale(dpi, dpi);
    });
  }, [quantity, refresh, color, ease, staticity]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute inset-0"
    />
  );
}
