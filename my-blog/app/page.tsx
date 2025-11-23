import booksData from "@/data/books.json";
import Link from "next/link";

export default function Home() {
  const { books } = booksData;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8">Danh Sách Blog</h1>
      <ul className="space-y-4 w-full max-w-2xl">
        {books.map((book) => (
          <li key={book.id}>
            <Link
              href={`/${book.id}`}
              className="text-blue-500 hover:underline text-xl"
            >
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}