// src/components/layout/Header.jsx

"use client";

import React, { useCallback, useMemo } from 'react';
import { useTheme } from "next-themes";
import Link from "next/link";
import { Moon, Sun, Menu } from 'lucide-react'; // Sử dụng thư viện icon chuyên nghiệp (ví dụ: lucide-react)

// --- Theme Toggle Component ---
/**
 * Component độc lập để chuyển đổi chủ đề (Light/Dark Mode).
 * Tách biệt logic quản lý chủ đề khỏi Header chính.
 */
const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Sử dụng useCallback để memoize hàm handler
  const toggleTheme = useCallback(() => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  // Hiển thị icon tương ứng với chủ đề hiện tại.
  // resolvedTheme đảm bảo hiển thị đúng trên server/client.
  const Icon = resolvedTheme === 'dark' ? Sun : Moon;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full text-foreground hover:bg-muted-foreground/10 transition-colors"
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

// --- Header Component Chính ---
/**
 * Component Header chính.
 * Áp dụng cấu trúc module hóa và chú trọng vào ngữ nghĩa.
 */
export default function Header() {
  // Thay thế các class cứng bằng biến CSS/Tailwind để dễ quản lý hơn.
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo/Site Title */}
        <Link href="/" aria-label="Trang chủ" className="flex items-center space-x-2">
          {/* Có thể thêm logo hoặc icon ở đây */}
          <span className="text-xl font-extrabold tracking-tight text-primary">
            Nghĩa, Trần Đắc
          </span>
          <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
             // Blog Kỹ thuật
          </span>
        </Link>

        {/* Navigation & Actions */}
        <nav className="flex items-center space-x-4">
          {/* Ví dụ: Menu điều hướng chính (có thể ẩn trên mobile) */}
 

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Menu Icon cho Mobile */}
          <button 
            aria-label="Mở menu"
            className="md:hidden p-2 rounded-full text-foreground hover:bg-muted-foreground/10 transition-colors"
          >
             <Menu className="w-5 h-5" />
          </button>
        </nav>
      </div>
    </header>
  );
}

// Helper Component để DRY (Don't Repeat Yourself) cho Nav Links
const NavLink = ({ href, children }: NavLinkProps) => (
    <Link 
        href={href} 
        className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200"
    >
        {children}
    </Link>
);