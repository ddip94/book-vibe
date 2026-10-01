import Link from "next/link";
import Image from "next/image";
import type { Book } from "@/types/books";

type ListedBookCardProps = {
  book: Book;
  onRemove: () => void;
};

export default function ListedBookCard({ book, onRemove }: ListedBookCardProps) {
  const {
    bookId,
    bookName,
    author,
    image,
    tags,
    yearOfPublishing,
    publisher,
    totalPages,
    category,
    rating,
  } = book;

  return (
    <div className="flex flex-col gap-5 border border-gray-200 rounded-2xl p-5 md:flex-row">
      <div className="bg-[#F3F3F3] rounded-2xl p-6 flex justify-center items-center md:w-52 shrink-0">
        <Image
          src={image}
          alt={bookName}
          width={160}
          height={200}
          className="h-40 w-auto object-contain"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">
          {bookName}
        </h2>
        <p className="text-sm mt-2">By : {author}</p>

        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
          <span className="font-bold">Tag</span>
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#23BE0A0D] text-[#23BE0A] text-xs font-medium px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
          <span className="text-gray-600">
            Year of Publishing: {yearOfPublishing}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600 pb-4 border-b">
          <span>Publisher: {publisher}</span>
          <span>Page {totalPages}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
          <span className="bg-blue-50 text-blue-500 px-4 py-2 rounded-full">
            Category: {category}
          </span>
          <span className="bg-orange-50 text-orange-400 px-4 py-2 rounded-full">
            Rating: {rating}
          </span>
          <Link
            href={`/books/${bookId}`}
            className="bg-[#23BE0A] text-white px-4 py-2 rounded-full font-medium"
          >
            View Details
          </Link>
          <button
            onClick={onRemove}
            className="border border-red-300 text-red-500 px-4 py-2 rounded-full font-medium hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}