// app/[book]/[chapter]/page.tsx
import booksData from "@/data/books.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TerminalSidebar } from "@/components/TerminalSidebar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlitchText } from "@/components/GlitchText";

export default function ChapterPage({
  params,
}: {
  params: { book: string; chapter: string };
}) {
  const book = booksData.books.find((b) => b.id === params.book);
  if (!book) notFound();

  const chapter = book.chapters.find((c) => c.id === params.chapter);
  if (!chapter) notFound();

  return (
    <>
      <AnimatedBackground />

      <div className="relative min-h-screen flex font-mono">
        {/* Dùng lại TerminalSidebar đã làm siêu ngầu */}
        <TerminalSidebar book={book} currentBookId={params.book} currentChapterId={params.chapter} />

        {/* Main content - Terminal style */}
        <main className="flex-1 p-8 md:p-12 lg:p-16 text-cyan-300 overflow-x-auto">
          <div className="max-w-5xl mx-auto">
            {/* Title với glitch + cursor blink */}
            <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              <GlitchText text={chapter.title} />
              <span className="inline-block w-3 h-10 bg-cyan-400 ml-2 animate-pulse" />
            </h1>

            <div className="mb-12 text-lg opacity-90">
              <span className="text-green-400">$</span> ls -la lessons/
            </div>

            {/* Grid lesson cards - đẹp hơn list cũ gấp 100 lần */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapter.lessons.map((lesson, idx) => (
                <Link
                  key={lesson.id}
                  href={`/${params.book}/${params.chapter}/${lesson.id}`}
                  className="group block p-6 bg-gray-900/60 backdrop-blur border border-cyan-900/50 rounded-lg
                           hover:border-cyan-400 hover:bg-cyan-900/20 transition-all duration-300
                           hover:translate-y-[-6px] hover:shadow-2xl hover:shadow-cyan-500/30"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-cyan-500 font-bold text-lg">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium group-hover:text-cyan-200 transition-colors">
                        {lesson.title}
                      </h3>
                      <div className="mt-3 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                        <span className="text-green-400">→</span> Vào đọc ngay
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bonus: Hiệu ứng gõ lệnh ở dưới */}
            <div className="mt-20 text-sm text-gray-500 font-mono">
              <div>
                <span className="text-green-400">$</span> cat {params.book}/{params.chapter}/README.md
              </div>
              <div className="mt-2 text-gray-600">
                <span className="text-cyan-400">Tip:</span> Dùng phím <kbd className="px-2 py-1 bg-gray-800 rounded">← →</kbd> để chuyển chapter nhanh
              </div>
            </div>

            {/* Footer nhỏ xinh */}
            <div className="mt-16 text-center text-gray-600 text-sm">
              <span className="text-orange-500">~</span>Từ C# tới bay sang <span className="text-orange-500">{book.lang}</span> • by Nghĩa Trần Đắc{" "}
              <span className="text-red-500">♥</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}