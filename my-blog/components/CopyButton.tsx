"use client";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="px-3 py-1.5 bg-cyan-900/80 hover:bg-cyan-700 rounded text-xs transition-all"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}