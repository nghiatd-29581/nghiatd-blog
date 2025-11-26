"use client";
import { useState } from "react";

export function GlitchText({ text }: { text: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
      className="relative inline-block"
    >
      {isGlitching ? (
        <span className="animate-pulse text-cyan-300">{text}</span>
      ) : (
        <span className="text-cyan-100">{text}</span>
      )}
    </span>
  );
}