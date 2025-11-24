// app/[book]/[chapter]/[lesson]/page.tsx
import booksData from "@/data/books.json";
import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TerminalSidebar } from "@/components/TerminalSidebar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { GlitchText } from "@/components/GlitchText";
import { CopyButton } from "@/components/CopyButton";
import { ProgressBar } from "@/components/ProgressBar";

async function getHtmlContent(htmlPath: string) {
  const fullPath = path.join(process.cwd(), "public", htmlPath);
  try {
    return await fs.readFile(fullPath, "utf8");
  } catch {
    notFound();
  }
}

export default async function LessonPage({
  params,
}: {
  params: { book: string; chapter: string; lesson: string };
}) {
  const book = booksData.books.find((b) => b.id === params.book);
  if (!book) notFound();

  const chapter = book.chapters.find((c) => c.id === params.chapter);
  if (!chapter) notFound();

  const lessonIndex = chapter.lessons.findIndex((l) => l.id === params.lesson);
  if (lessonIndex === -1) notFound();
  const lesson = chapter.lessons[lessonIndex];

  const htmlContent = await getHtmlContent(lesson.htmlPath);

  // === Tính prev/next ===
  let prevLink: string | null = null;
  let nextLink: string | null = null;

  if (lessonIndex > 0) {
    prevLink = `/${params.book}/${params.chapter}/${chapter.lessons[lessonIndex - 1].id}`;
  } else {
    const chapIdx = book.chapters.findIndex((c) => c.id === params.chapter);
    if (chapIdx > 0) {
      const prevChap = book.chapters[chapIdx - 1];
      const last = prevChap.lessons[prevChap.lessons.length - 1];
      prevLink = `/${params.book}/${prevChap.id}/${last.id}`;
    }
  }

  if (lessonIndex < chapter.lessons.length - 1) {
    nextLink = `/${params.book}/${params.chapter}/${chapter.lessons[lessonIndex + 1].id}`;
  } else {
    const chapIdx = book.chapters.findIndex((c) => c.id === params.chapter);
    if (chapIdx < book.chapters.length - 1) {
      const nextChap = book.chapters[chapIdx + 1];
      nextLink = `/${params.book}/${nextChap.id}/${nextChap.lessons[0].id}`;
    }
  }

  return (
    <>
      <AnimatedBackground />
      <ProgressBar /> {/* Thêm thanh tiến độ ở đầu */}

      <div className="relative min-h-screen flex font-mono">
        <TerminalSidebar
          book={book}
          currentBookId={params.book}
          currentChapterId={params.chapter}
          currentLessonId={params.lesson}
        />

        <main className="flex-1 p-8 md:p-12 lg:p-20 text-cyan-300 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Title + blinking cursor */}
            <h1 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight">
              <GlitchText text={lesson.title} />
              <span className="inline-block w-3 h-10 bg-cyan-400 ml-2 animate-pulse" />
            </h1>

            {/* Nội dung HTML từ file */}
            <article
              className="prose prose-invert prose-cyan max-w-none"
              dangerouslySetInnerHTML={{
                __html: htmlContent
                  .replace(
                    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
                    (match, lang, code) => `
                      <div class="relative group my-8">
                        <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <CopyButton text="${code.replace(/"/g, "&quot;")}" />
                        </div>
                        <pre class="bg-gray-900/90 backdrop-blur border border-cyan-900/50 rounded-lg overflow-x-auto p-6 font-mono text-sm">
                          <code class="language-${lang} text-cyan-100">${code}</code>
                        </pre>
                      </div>
                    `
                  ),
              }}
            />

            {/* Navigation prev/next kiểu terminal */}
            <div className="mt-20 flex flex-col sm:flex-row justify-between items-center gap-8 text-lg font-mono">
              {prevLink ? (
                <Link
                  href={prevLink}
                  className="flex items-center gap-3 text-cyan-400 hover:text-cyan-200 transition-all hover:-translate-x-2"
                >
                  <span className="text-2xl">←</span>
                  <div>
                    <div className="text-sm text-gray-500">Previous lesson</div>
                    <div>Bài trước</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextLink ? (
                <Link
                  href={nextLink}
                  className="flex items-center gap-3 text-cyan-400 hover:text-cyan-200 transition-all hover:translate-x-2 text-right"
                >
                  <div>
                    <div className="text-sm text-gray-500">Next lesson</div>
                    <div>Bài tiếp theo</div>
                  </div>
                  <span className="text-2xl">→</span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Footer yêu thương */}
            <div className="mt-24 text-center text-gray-600 text-sm border-t border-cyan-900/30 pt-8">
              <span className="text-cyan-500">~</span> Made with <span className="text-red-500">♥</span> &amp;{" "}
              <span className="text-orange-500">Rust</span> by Nghĩa Trần Đắc{" "}
              <span className="text-cyan-500">~</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}