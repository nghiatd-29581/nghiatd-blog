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
            const isActive = currentChapterId === chap.id;
            return (
              <li key={chap.id} className={isActive ? "text-cyan-100 font-bold" : ""}>
                <Link
                  href={`/${currentBookId}/${chap.id}`}
                  className="block hover:text-cyan-100 transition-all"
                >
                  {isActive ? "▶" : "│"} {String(i + 1).padStart(2, "0")}. {chap.title}
                </Link>

                {/* Hiển thị lessons khi đang active (tùy chọn) */}
                {isActive && chap.lessons?.length > 0 && (
                  <ul className="ml-6 mt-2 text-cyan-500 text-xs">
                    {chap.lessons.slice(0, 5).map((les: any) => (
                      <li key={les.id}>├─ {les.title}</li>
                    ))}
                    {chap.lessons.length > 5 && <li>└─ ...và {chap.lessons.length - 5} lessons nữa</li>}
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