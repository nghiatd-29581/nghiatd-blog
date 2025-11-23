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

      <button

        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}

        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"

      >

         {theme === "dark" ? "Light" : "Dark"} 

      </button>

    </header>

  );

}