import Link from "next/link";
import booksData from "@/data/booksData.json";
import BookCard from "@/components/BookCard";
import type { Book } from "@/types/books";

const books: Book[] = booksData;

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F3F3F3] rounded-3xl px-8 py-12 md:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight font-[family-name:var(--font-playfair)]">
            Books to freshen up <br /> your bookshelf
          </h1>
          <Link
            href="/listed-books"
            className="inline-block mt-8 bg-[#23BE0A] text-white font-semibold px-6 py-3 rounded-lg"
          >
            View The List
          </Link>
        </div>
        <img
          src={books[5].image}
          alt={books[5].bookName}
          className="h-64 object-contain"
        />
      </section>

      {/* Books */}
      <section className="my-16">
        <h2 className="text-4xl font-bold text-center mb-8 font-[family-name:var(--font-playfair)]">
          Books
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.bookId} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}