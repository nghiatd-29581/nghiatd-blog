import booksData from "@/data/books.json";
import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getHtmlContent(htmlPath: string) {
  const fullPath = path.join(process.cwd(), "public", htmlPath);
  try {
    const html = await fs.readFile(fullPath, "utf8");
    return html;
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

  // Tìm next/prev
  let prevLink = null;
  let nextLink = null;
  if (lessonIndex > 0) {
    const prevLesson = chapter.lessons[lessonIndex - 1];
    prevLink = `/${params.book}/${params.chapter}/${prevLesson.id}`;
  } else {
    const chapterIndex = book.chapters.findIndex((c) => c.id === params.chapter);
    if (chapterIndex > 0) {
      const prevChapter = book.chapters[chapterIndex - 1];
      const lastLesson = prevChapter.lessons[prevChapter.lessons.length - 1];
      prevLink = `/${params.book}/${prevChapter.id}/${lastLesson.id}`;
    }
  }

  if (lessonIndex < chapter.lessons.length - 1) {
    const nextLesson = chapter.lessons[lessonIndex + 1];
    nextLink = `/${params.book}/${params.chapter}/${nextLesson.id}`;
  } else {
    const chapterIndex = book.chapters.findIndex((c) => c.id === params.chapter);
    if (chapterIndex < book.chapters.length - 1) {
      const nextChapter = book.chapters[chapterIndex + 1];
      const firstLesson = nextChapter.lessons[0];
      nextLink = `/${params.book}/${nextChapter.id}/${firstLesson.id}`;
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar TOC - Có thể viết component riêng để reuse */}
      <aside className="w-64 p-4 bg-sidebar hidden md:block overflow-y-auto">
        <h2 className="font-bold mb-4">{book.title}</h2>
        <ul>
          {book.chapters.map((chap) => (
            <li key={chap.id} className="mb-2">
              <Link href={`/${params.book}/${chap.id}`} className="text-blue-500 hover:underline">
                {chap.title}
              </Link>
              <ul className="ml-4">
                {chap.lessons.map((les) => (
                  <li key={les.id}>
                    <Link
                      href={`/${params.book}/${chap.id}/${les.id}`}
                      className={`text-sm ${les.id === params.lesson ? "font-bold" : ""}`}
                    >
                      {les.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4 bg-background text-foreground">
        <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <div className="flex justify-between mt-8">
          {prevLink && (
            <Link href={prevLink} className="text-blue-500 hover:underline">
              ← Bài trước
            </Link>
          )}
          {nextLink && (
            <Link href={nextLink} className="text-blue-500 hover:underline">
              Bài tiếp theo →
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}