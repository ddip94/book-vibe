import Link from "next/link";
import type { Book } from "@/types/books";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  const { bookId, bookName, author, image, rating, category, tags } = book;

  return (
    <Link
      href={`/books/${bookId}`}
      className="block border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition"
    >
      <div className="bg-[#F3F3F3] rounded-2xl py-6 flex justify-center">
        <img src={image} alt={bookName} className="h-40 object-contain" />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-[#23BE0A0D] text-[#23BE0A] text-xs font-medium px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-3 font-[family-name:var(--font-playfair)]">
        {bookName}
      </h2>
      <p className="text-sm text-gray-600 mt-1">By : {author}</p>

      <div className="border-t border-dashed mt-4 pt-3 flex justify-between text-sm text-gray-600">
        <span>{category}</span>
        <span>{rating} ☆</span>
      </div>
    </Link>
  );
}