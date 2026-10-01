"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import type { Book } from "@/types/books";

type ListType = "read" | "wishlist";

type BooksContextType = {
  readBooks: Book[];
  wishlistBooks: Book[];
  addToRead: (book: Book) => void;
  addToWishlist: (book: Book) => void;
  removeBook: (bookId: number, list: ListType) => void;
};

const BooksContext = createContext<BooksContextType | null>(null);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [readBooks, setReadBooks] = useState<Book[]>([]);
  const [wishlistBooks, setWishlistBooks] = useState<Book[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
  try {
    const savedRead = localStorage.getItem("readBooks");
    const savedWishlist = localStorage.getItem("wishlistBooks");

    if (savedRead) {
      const parsed = JSON.parse(savedRead);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (Array.isArray(parsed)) setReadBooks(parsed);
    }
    if (savedWishlist) {
      const parsed = JSON.parse(savedWishlist);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (Array.isArray(parsed)) setWishlistBooks(parsed);
    }
  } catch {
    // ডেটা নষ্ট থাকলে খালি লিস্ট নিয়েই শুরু হবে
  }
  setIsLoaded(true);
}, []);

  // ২) readBooks বদলালে সেভ করা (পড়া শেষ হওয়ার পরেই)
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
  }, [readBooks, isLoaded]);

  // ৩) wishlistBooks বদলালে সেভ করা
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("wishlistBooks", JSON.stringify(wishlistBooks));
  }, [wishlistBooks, isLoaded]);

  const addToRead = (book: Book) => {
    const alreadyRead = readBooks.some((b) => b.bookId === book.bookId);

    if (alreadyRead) {
      toast.error("You have already read this book");
      return;
    }

    setReadBooks([...readBooks, book]);
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

  // টাস্ক ৪: লিস্ট থেকে বই সরানো
  const removeBook = (bookId: number, list: ListType) => {
    if (list === "read") {
      setReadBooks(readBooks.filter((b) => b.bookId !== bookId));
    } else {
      setWishlistBooks(wishlistBooks.filter((b) => b.bookId !== bookId));
    }
    toast.success("Book removed");
  };

  return (
    <BooksContext.Provider
      value={{ readBooks, wishlistBooks, addToRead, addToWishlist, removeBook }}
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