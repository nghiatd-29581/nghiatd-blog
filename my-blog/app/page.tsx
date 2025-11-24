// app/page.tsx
"use client";

import Link from "next/link";
import booksData from "@/data/books.json";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlitchText } from "@/components/GlitchText";
import { useEffect, useState } from "react";

export default function Home() {
  const { books } = booksData;
  const [typedText, setTypedText] = useState("");
  const fullText = "Chào mừng đến với thế giới Blog của mình";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatedBackground />

      <div className="relative min-h-screen flex items-center justify-center font-mono overflow-hidden">
        {/* Matrix-style falling code rain (siêu nhẹ) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/20 to-transparent" />
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-cyan-500 text-xs font-bold animate-fall"
              style={{
                left: `${i * 8.33}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${8 + i}s`,
              }}
            >
              {Array(30)
                .fill(0)
                .map((_, j) => (
                  <div key={j}>{"01"[Math.floor(Math.random() * 2)]}</div>
                ))}
            </div>
          ))}
        </div>

        <main className="relative z-10 max-w-6xl mx-auto px-8 text-center">
          {/* Terminal Window lớn nhất, ngầu nhất */}
          <div className="bg-black/90 backdrop-blur-xl border-2 border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/30 overflow-hidden">
            {/* Terminal header */}
            <div className="bg-gradient-to-r from-cyan-900 via-purple-900 to-pink-900 p-4 flex items-center gap-4">
              <div className="flex gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
                <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
              </div>
              <div className="text-cyan-300 font-bold tracking-wider">
                root@nghia:~#
              </div>
            </div>

            {/* Terminal body */}
            <div className="p-10 text-left">
              {/* Typing effect */}
              <div className="text-cyan-400 text-lg mb-6">
                <span className="text-green-400">$</span> whoami
              </div>
              <div className="text-pink-400 text-2xl mb-8 font-bold">
                Nghĩa Trần Đắc — Học không bao giờ là trễ
              </div>

              <div className="text-cyan-300 mb-8">
                <span className="text-green-400">$</span> cat welcome.txt
              </div>
              <div className="text-gray-300 text-lg leading-relaxed mb-10">
                {typedText}
                <span className="inline-block w-2 h-8 bg-cyan-400 ml-1 animate-pulse" />
              </div>

              {/* Books list - kiểu file explorer */}
              <div className="text-cyan-300 mb-6">
                <span className="text-green-400">$</span> ls -la books/
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map((book, i) => (
                  <Link
                    key={book.id}
                    href={`/${book.id}`}
                    className="group block p-6 bg-cyan-900/20 border border-cyan-700/50 rounded-lg
                               hover:bg-cyan-800/40 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/40
                               transition-all duration-500 hover:scale-105"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">Rust</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-cyan-100 group-hover:text-cyan-300 transition-colors">
                          <GlitchText text={book.title} />
                        </h3>
                        <div className="text-sm text-gray-400 mt-2">
                          {book.chapters.length} chương •{" "}
                          {book.chapters.reduce(
                            (acc: number, c: any) => acc + c.lessons.length,
                            0
                          )}{" "}
                          bài học
                        </div>
                      </div>
                      <div className="text-3xl opacity-0 group-hover:opacity-100 transition-all translate-x-[-20px] group-hover:translate-x-0">
                        →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Final command */}
              <div className="mt-12 text-gray-500 text-sm">
                <span className="text-green-400">$</span> cargo run --release --features love
                <br />
                <span className="text-cyan-400">
                  Compiled successfully in 0.69s ♥
                </span>
              </div>
            </div>
          </div>

          {/* Footer nhỏ xinh */}
          <div className="mt-12 text-center text-gray-600 text-sm">
            <span className="text-cyan-500">~</span> Built with Next.js 14 • Tailwind •{" "}
            <span className="text-orange-500">Rust</span> • và rất nhiều{" "}
            <span className="text-red-500">tình yêu</span>{" "}
            <span className="text-cyan-500">~</span>
          </div>
        </main>
      </div>

      {/* CSS cho Matrix rain */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </>
  );
}