import booksData from "@/data/books.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function BookPage({ params }: { params: { book: string } }) {
  const book = booksData.books.find((b) => b.id === params.book);
  if (!book) notFound();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 bg-sidebar hidden md:block overflow-y-auto">
        <h2 className="font-bold mb-4">{book.title}</h2>
        <ul>
          {book.chapters.map((chap) => (
            <li key={chap.id} className="mb-2">
              <Link href={`/${params.book}/${chap.id}`} className="text-blue-500 hover:underline">
                {chap.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4 bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <p className="mb-4">Chọn chương từ sidebar hoặc danh sách dưới đây.</p>
        <ul className="space-y-2">
          {book.chapters.map((chapter) => (
            <li key={chapter.id}>
              <Link
                href={`/${params.book}/${chapter.id}`}
                className="text-blue-500 hover:underline"
              >
                {chapter.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}