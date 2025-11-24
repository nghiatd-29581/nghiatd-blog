// components/TerminalSidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TerminalSidebar({ book, currentBookId }: any) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-80 bg-black/90 backdrop-blur border-r border-cyan-900/50">
      <div className="p-4 border-b border-cyan-900/50 flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-500 text-sm">terminal — {currentBookId}</span>
      </div>

      <div className="p-4 text-cyan-300 font-mono text-sm">
        <div className="mb-4">
          <span className="text-green-400">$</span> cat {book.title}.rs
        </div>

        <ul className="space-y-2 mt-6">
          {book.chapters.map((chap: any, i: number) => {
            const isActive = pathname === `/${currentBookId}/${chap.id}`;
            return (
              <li key={chap.id}>
                <Link
                  href={`/${currentBookId}/${chap.id}`}
                  className={`block hover:text-cyan-100 transition-all ${
                    isActive ? "text-cyan-100 font-bold" : "text-cyan-500"
                  }`}
                >
                  {isActive && "▶ "} {String(i + 1).padStart(2, "0")}. {chap.title}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 text-gray-600">
          <span className="text-green-400">$</span> cargo build --release
          <br />
          <span className="text-gray-500">Finished release [optimized] target(s) in 0.01s</span>
        </div>
      </div>
    </aside>
  );
}