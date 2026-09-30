"use client";

import { useState } from "react";
import { useBooks } from "@/context/BooksContext";
import ListedBookCard from "@/components/ListedBookCard";
import type { Book } from "@/types/books";

type Tab = "read" | "wishlist";
type SortKey = "rating" | "totalPages" | "yearOfPublishing";

const tabs: { key: Tab; label: string }[] = [
  { key: "read", label: "Read Books" },
  { key: "wishlist", label: "Wishlist Books" },
];

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "rating", label: "Rating" },
  { key: "totalPages", label: "Number of pages" },
  { key: "yearOfPublishing", label: "Publisher year" },
];

export default function ListedBooksPage() {
  const { readBooks, wishlistBooks } = useBooks();
  const [activeTab, setActiveTab] = useState<Tab>("read");
  const [sortBy, setSortBy] = useState<SortKey | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const books: Book[] = activeTab === "read" ? readBooks : wishlistBooks;

  // মূল array না বদলিয়ে কপি সাজানো হচ্ছে (বেশি মান আগে)
  const sortedBooks = sortBy
    ? [...books].sort((a, b) => b[sortBy] - a[sortBy])
    : books;

  const handleSort = (key: SortKey) => {
    setSortBy(key);
    setIsOpen(false);
  };

  const currentLabel = sortOptions.find((o) => o.key === sortBy)?.label;

  return (
    <div className="my-8">
      <h1 className="bg-[#F3F3F3] rounded-2xl py-6 text-center text-3xl font-bold">
        Books
      </h1>

      {/* Sort By */}
      <div className="flex justify-center mt-8">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-[#23BE0A] text-white font-semibold px-5 py-3 rounded-lg text-sm"
          >
            {currentLabel ? `Sort By: ${currentLabel}` : "Sort By"} ▾
          </button>

          {isOpen && (
            <ul className="absolute left-0 right-0 z-10 mt-1 bg-[#F3F3F3] rounded-lg shadow p-2 text-sm text-center">
              {sortOptions.map((option) => (
                <li key={option.key}>
                  <button
                    onClick={() => handleSort(option.key)}
                    className="w-full py-2 hover:bg-gray-200 rounded"
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mt-8 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-3 text-sm ${
              activeTab === tab.key
                ? "border border-b-white rounded-t-lg -mb-px font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-6 mt-6">
        {sortedBooks.length === 0 ? (
          <p className="text-center text-gray-500 py-16">
            No books here yet.
          </p>
        ) : (
          sortedBooks.map((book) => (
            <ListedBookCard key={book.bookId} book={book} />
          ))
        )}
      </div>
    </div>
  );
}