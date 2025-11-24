// components/GlitchText.tsx
"use client";
import { useEffect, useState } from "react";

export function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setDisplay(text.split("").map(c => Math.random() > 0.9 ? String.fromCharCode(65 + Math.random()*26) : c).join(""));
        setTimeout(() => setDisplay(text), 100);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [text]);

  return <span className="text-cyan-400">{display}</span>;
}