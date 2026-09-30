"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { Book } from "@/types/books";

type BooksContextType = {
  readBooks: Book[];
  wishlistBooks: Book[];
  addToRead: (book: Book) => void;
  addToWishlist: (book: Book) => void;
};

const BooksContext = createContext<BooksContextType | null>(null);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [readBooks, setReadBooks] = useState<Book[]>([]);
  const [wishlistBooks, setWishlistBooks] = useState<Book[]>([]);

  const addToRead = (book: Book) => {
    const alreadyRead = readBooks.some((b) => b.bookId === book.bookId);

    if (alreadyRead) {
      toast.error("You have already read this book");
      return;
    }

    setReadBooks([...readBooks, book]);

    // Wishlist-এ থাকলে সেখান থেকে সরিয়ে দাও
    setWishlistBooks(wishlistBooks.filter((b) => b.bookId !== book.bookId));

    toast.success("Added to Read list");
  };

  const addToWishlist = (book: Book) => {
    const alreadyRead = readBooks.some((b) => b.bookId === book.bookId);
    if (alreadyRead) {
      toast.error("You have already read this book");
      return;
    }

    const alreadyWishlisted = wishlistBooks.some(
      (b) => b.bookId === book.bookId
    );
    if (alreadyWishlisted) {
      toast.error("This book is already in your wishlist");
      return;
    }

    setWishlistBooks([...wishlistBooks, book]);
    toast.success("Added to Wishlist");
  };

  return (
    <BooksContext.Provider
      value={{ readBooks, wishlistBooks, addToRead, addToWishlist }}
    >
      {children}
      <Toaster />
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooks must be used inside BooksProvider");
  }

  return context;
}