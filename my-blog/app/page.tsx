"use client";

import Link from "next/link";
import booksData from "@/data/books.json";
import { motion } from "framer-motion";
import Particles from "@/components/Particles";

export default function Home() {
  const { books } = booksData;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white overflow-hidden">

      {/* 🔥 Background Particles (non-blocking) */}
      <div className="absolute inset-0 pointer-events-none">
        <Particles
          quantity={80}
          ease={80}
          color="#45A5FF"
          refresh
        />
      </div>

      {/* 🔥 Fade-in content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl p-6"
      >
        <h1 className="text-4xl font-bold text-center mb-10 tracking-wide">
          📘 Danh Sách Blog
        </h1>

        <ul className="space-y-4">
          {books.map((book) => (
            <motion.li
              key={book.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href={`/${book.id}`}
                className="block p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10 
                           hover:bg-white/10 hover:border-blue-400 transition-all
                           text-xl hover:shadow-xl"
              >
                {book.title}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </main>
  );
}
