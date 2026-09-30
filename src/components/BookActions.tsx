"use client";

import type { Book } from "@/types/books";
import { useBooks } from "@/context/BooksContext";

export default function BookActions({ book }: { book: Book }) {
  const { addToRead, addToWishlist } = useBooks();

  return (
    <div className="flex gap-3 mt-6">
      <button
        onClick={() => addToRead(book)}
        className="border border-gray-300 px-5 py-2 rounded-lg font-semibold"
      >
        Read
      </button>
      <button
        onClick={() => addToWishlist(book)}
        className="bg-[#59C6D2] text-white px-5 py-2 rounded-lg font-semibold"
      >
        Wishlist
      </button>
    </div>
  );
}