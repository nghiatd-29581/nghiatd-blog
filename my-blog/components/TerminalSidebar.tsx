
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// components/TerminalSidebar.tsx (chỉ sửa phần này thôi)
export function TerminalSidebar({ 
  book, 
  currentBookId,
  currentChapterId // ← thêm cái này
}: { 
  book: any; 
  currentBookId: string;
  currentChapterId?: string; // optional nếu ở trang book list
}) {
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
          <span className="text-green-400">$</span> tree {book.title}/
        </div>

        <ul className="space-y-2 mt-6">
			{book.chapters.map((chap: any, i: number) => {
			  const isChapterActive = currentChapterId === chap.id;
			  return (
				<li key={chap.id} className={isChapterActive ? "text-cyan-100 font-bold" : ""}>
				  <Link href={`/${currentBookId}/${chap.id}`} className="block hover:text-cyan-100">
					{isChapterActive ? "▶" : "│"} {String(i + 1).padStart(2, "0")}. {chap.title}
				  </Link>

				  {isChapterActive && chap.lessons?.length > 0 && (
					<ul className="ml-8 mt-2 text-cyan-400 text-xs space-y-1">
					  {chap.lessons.map((les: any) => (
						<li key={les.id} className={les.id === currentLessonId ? "text-cyan-100 font-bold" : ""}>
						  {les.id === currentLessonId ? "→" : "├"} {les.title}
						</li>
					  ))}
					</ul>
				  )}
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