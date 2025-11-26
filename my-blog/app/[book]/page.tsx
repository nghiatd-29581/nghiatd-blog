// app/[book]/page.tsx  (Next.js 13+ app router)
import booksData from "@/data/books.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TerminalSidebar } from "@/components/TerminalSidebar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlitchText } from "@/components/GlitchText";

export default function BookPage({ params }: { params: { book: string } }) {
  const book = booksData.books.find((b) => b.id === params.book);
  if (!book) notFound();

  return (
    <>
      {/* Background cực nhẹ, không lag */}
      <AnimatedBackground />

      <div className="relative min-h-screen flex font-mono">
        {/* Terminal-style Sidebar */}
        <TerminalSidebar book={book} currentBookId={params.book} />

        {/* Main content */}
        <main className="flex-1 p-8 md:p-12 lg:p-16 text-cyan-300">
          <div className="max-w-4xl mx-auto">
            {/* Typing title + blinking cursor */}
            <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              <GlitchText text={book.title} />
              <span className="inline-block w-3 h-10 bg-cyan-400 ml-2 animate-pulse" />
            </h1>

            <p className="text-gray-400 mb-10 text-lg opacity-80">
              » Chọn chương từ terminal sidebar hoặc danh sách dưới đây
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {book.chapters.map((chapter, i) => (
                <Link
                  key={chapter.id}
                  href={`/${params.book}/${chapter.id}`}
                  className="group block p-6 bg-gray-900/50 backdrop-blur border border-cyan-900/50 rounded-lg
                           hover:border-cyan-400 hover:bg-cyan-900/20 transition-all duration-300
                           hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-cyan-500/20"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-cyan-500 font-bold">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-xl group-hover:text-cyan-300 transition-colors">
                      {chapter.title}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    → Click để vào chương
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer nhỏ xinh */}
            <div className="mt-20 text-center text-gray-600 text-sm">
              <span className="text-cyan-500">~</span> built with next.js 14 • tailwind • <span className="text-orange-500">{book.lang}</span> love{" "}
              <span className="text-cyan-500">~</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}