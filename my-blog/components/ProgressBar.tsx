"use client";
import { useEffect } from "react";

export function ProgressBar() {
  useEffect(() => {
    const update = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById("progress")!.style.width = scrolled + "%";
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-cyan-900/50 z-50">
      <div id="progress" className="h-full bg-cyan-400 transition-all duration-300" style={{ width: 0 }} />
    </div>
  );
}