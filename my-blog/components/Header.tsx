"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
export default function Header() {

const { theme, setTheme } = useTheme();
  return (
    <header className="flex justify-between items-center p-4 bg-sidebar shadow-md">
      <Link href="/" className="text-xl font-bold text-foreground">
        Blog của Nghĩa, Trần Đắc
      </Link>
      
      <Link href="/my-info" className="text-xl font-bold text-foreground">
        Về tui
      </Link>
    </header>
  );
}
