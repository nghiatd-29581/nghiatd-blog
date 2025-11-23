"use client";

import { useState, useEffect } from "react";
import booksData from "@/data/books.json";

export default function Admin() {
  const [books, setBooks] = useState(booksData);

  const saveChanges = async () => {
    try {
      const res = await fetch('/api/save-books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(books),
      });
      if (res.ok) alert('Saved!');
      else alert('Failed to save.');
    } catch {
      alert('Error saving.');
    }
  };

  // Form edit đơn giản (bạn có thể mở rộng bằng thư viện như React Hook Form)
  return (
    <main className="p-4 bg-background text-foreground min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <pre className="bg-gray-100 p-4 rounded overflow-auto dark:bg-gray-800">
        {JSON.stringify(books, null, 2)}
      </pre>
      <button
        onClick={saveChanges}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Changes (Local only)
      </button>
      <p className="mt-2 text-sm text-gray-500">Note: For production, update via Git repo.</p>
    </main>
  );
}