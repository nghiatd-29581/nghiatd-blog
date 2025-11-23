import booksData from "@/data/books.json";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 bg-sidebar hidden md:block overflow-y-auto">
        <h2 className="font-bold mb-4">{book.title}</h2>
        <ul>
          {book.chapters.map((chap) => (
            <li key={chap.id} className="mb-2">
              <Link
                href={`/${params.book}/${chap.id}`}
                className={`text-blue-500 hover:underline ${chap.id === params.chapter ? "font-bold" : ""}`}
              >
                {chap.title}
              </Link>
              <ul className="ml-4">
                {chap.lessons.map((les) => (
                  <li key={les.id}>
                    <Link href={`/${params.book}/${chap.id}/${les.id}`} className="text-sm">
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
        <h1 className="text-2xl font-bold mb-4">{chapter.title}</h1>
        <ul className="space-y-2">
          {chapter.lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link
                href={`/${params.book}/${params.chapter}/${lesson.id}`}
                className="text-blue-500 hover:underline"
              >
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}