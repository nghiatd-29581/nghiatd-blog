// app/page.tsx – PHIÊN BẢN SIÊU MƯỢT, VẪN ĐẸP RỤNG TRỨNG
"use client";

import Link from "next/link";
import booksData from "@/data/books.json";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlitchText } from "@/components/GlitchText";

export default function Home() {
  const { books } = booksData;

  return (
    <>
      {/* Background nhẹ nhất có thể, chỉ 2 quả cầu mờ */}
      <AnimatedBackground />

      <div className="relative min-h-screen flex items-center justify-center font-mono">
        {/* Terminal chính – giữ nguyên độ ngầu */}
        <main className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="bg-black/90 backdrop-blur-xl border-2 border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-900 via-purple-900 to-pink-900 p-4 flex items-center gap-4">
              <div className="flex gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500" />
                <div className="w-4 h-4 rounded-full bg-yellow-500" />
                <div className="w-4 h-4 rounded-full bg-green-500" />
              </div>
              <div className="text-cyan-300 font-bold">root@nghia:~#</div>
            </div>

            <div className="p-10 text-left">
              <div className="text-cyan-400 text-lg mb-4">
                <span className="text-green-400">$</span> whoami
              </div>
              <div className="text-pink-400 text-2xl mb-8 font-bold">
                Nghĩa Trần Đắc — Rust từ C#
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map((book) => (
                  <Link
                    key={book.id}
                    href={`/${book.id}`}
                    className="group block p-6 bg-cyan-900/20 border border-cyan-700/50 rounded-lg
                               hover:bg-cyan-800/40 hover:border-cyan-400 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl text-orange-500">{book.lang}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-cyan-100 group-hover:text-cyan-300">
                          <GlitchText text={book.title} />
                        </h3>
                        <div className="text-sm text-gray-400">
                          {book.chapters.length} chương •{" "}
                          {book.chapters.reduce((a: number, c: any) => a + c.lessons.length, 0)} bài
                        </div>
                      </div>
                      <div className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-10 text-cyan-400 text-sm">
                <span className="text-green-400">$</span> cargo run --release
                <br />
                <span className="text-gray-500">Compiled in 0.01s</span>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-gray-600 text-sm">
            Built with Next.js • Tailwind • <span className="text-red-500">♥</span>
          </div>
        </main>
      </div>
    </>
  );
}