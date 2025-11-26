// app/not-found.tsx  ← 404 PAGE SIÊU WOW
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function NotFound() {
  const [glitch, setGlitch] = useState(false);

  // Glitch nhẹ mỗi 3 giây cho vui
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatedBackground />

      <div className="relative min-h-screen flex items-center justify-center font-mono text-cyan-300">
        <div className="max-w-4xl mx-auto px-8 text-center">
          {/* Terminal window 404 */}
          <div className="bg-black/90 backdrop-blur-xl border-2 border-red-500/60 rounded-lg shadow-2xl shadow-red-500/30 overflow-hidden">
            {/* Header đỏ báo động */}
            <div className="bg-gradient-to-r from-red-900 via-red-800 to-pink-900 p-5 flex items-center gap-4">
              <div className="flex gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />
                <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse delay-75" />
                <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse delay-150" />
              </div>
              <div className="text-red-300 font-bold tracking-wider">
                root@nghia:~$ PANIC
              </div>
            </div>

            <div className="p-12 text-left space-y-6">
              {/* Dòng lệnh lỗi */}
              <div className="text-red-400 text-2xl">
                <span className="text-green-400">$</span> cat /book1/chapter9/lesson19
              </div>

              <div className="text-6xl font-bold text-red-500" data-text="404">
                {glitch ? "4O4" : "404"}
              </div>

              <div className="text-xl text-gray-400">
                thread 'main' panicked at 'Lesson chưa được Nghĩa viết xong ạ :&lt;', 
                <br />
                src/will_be_written_soon.rs:<span className="text-yellow-400">2025</span>
              </div>

              <div className="mt-10 p-6 bg-red-900/30 border border-red-700/50 rounded-lg text-cyan-300">
                <p className="mb-4">Cảnh báo từ compiler:</p>
                <p className="text-lg">
                  "Nghĩa đang gõ phím điên cuồng đây... bài này sắp ra lò rồi mà! 
                  bà con chờ chút nha <span className="text-pink-400">♥</span>"
                </p>
              </div>

              {/* Nút quay lại */}
              <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/"
                  className="px-8 py-4 bg-cyan-900/70 border border-cyan-500 rounded-lg hover:bg-cyan-800/80 transition-all hover:scale-105"
                >
                  ← Quay lại trang chủ
                </Link>
              </div>

              {/* Easter egg nhỏ */}
              <div className="mt-12 text-gray-600 text-sm">
                <span className="text-green-400">$</span> rustc --explain E0000
                <br />
                <span className="text-yellow-400">
                  help: bài này sẽ có trong vòng 24h tới... hoặc đến khi viết xong
                </span>
              </div>
            </div>
          </div>

          {/* Footer yêu thương */}
          <div className="mt-12 text-gray-600 text-sm">
            <span className="text-red-500">~</span> 404 cũng phải đẹp vì có người đang đọc{" "}
            <span className="text-pink-400">♥</span>
          </div>
        </div>

        {/* CSS glitch nhẹ nhàng */}
        <style jsx>{`
          .glitch {
            position: relative;
          }
          .glitch::before,
          .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .glitch::before {
            animation: glitch-1 0.5s infinite;
            color: #f0f;
            z-index: -1;
          }
          .glitch::after {
            animation: glitch-2 0.5s infinite;
            color: #0ff;
            z-index: -2;
          }
          @keyframes glitch-1 {
            0%, 100% { clip: rect(0, 9999px, 0, 0); transform: translate(0); }
            20% { clip: rect(20px, 9999px, 40px, 0); transform: translate(-5px, 5px); }
            40% { clip: rect(80px, 9999px, 100px, 0); transform: translate(5px, -5px); }
            60% { clip: rect(40px, 9999px, 60px, 0); transform: translate(-5px, 5px); }
            80% { clip: rect(60px, 9999px, 80px, 0); transform: translate(5px, -5px); }
          }
          @keyframes glitch-2 {
            0%, 100% { clip: rect(0, 9999px, 0, 0); transform: translate(0); }
            30% { clip: rect(50px, 9999px, 70px, 0); transform: translate(3px, -3px); }
            70% { clip: rect(30px, 9999px, 90px, 0); transform: translate(-3px, 3px); }
          }
        `}</style>
      </div>
    </>
  );
}