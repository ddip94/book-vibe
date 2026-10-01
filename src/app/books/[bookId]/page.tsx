import { notFound } from "next/navigation";
import Image from "next/image";
import booksData from "@/data/booksData.json";
import BookActions from "@/components/BookActions";
import type { Book } from "@/types/books";

const books: Book[] = booksData;

type PageProps = {
  params: Promise<{ bookId: string }>;
};

export default async function BookDetailsPage({ params }: PageProps) {
  const { bookId } = await params;

  const book = books.find((b) => b.bookId === Number(bookId));

  if (!book) {
    notFound();
  }

  const {
    bookName,
    author,
    image,
    review,
    totalPages,
    rating,
    category,
    tags,
    publisher,
    yearOfPublishing,
  } = book;

  return (
    <div className="grid gap-8 my-10 md:grid-cols-2">
      <div className="bg-[#F3F3F3] rounded-2xl flex justify-center items-center p-10">
        <Image
          src={image}
          alt={bookName}
          width={300}
          height={400}
          className="h-96 w-auto object-contain"
        />
      </div>

      <div>
        <h1 className="text-4xl font-bold font-[family-name:var(--font-playfair)]">
          {bookName}
        </h1>
        <p className="mt-3 font-medium">By : {author}</p>

        <p className="border-y my-4 py-3">{category}</p>

        <p className="text-sm leading-relaxed text-gray-700">
          <span className="font-bold text-black">Review : </span>
          {review}
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-5 pb-5 border-b">
          <span className="font-bold text-sm">Tag</span>
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#23BE0A0D] text-[#23BE0A] text-xs font-medium px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <table className="mt-5 text-sm">
          <tbody>
            <tr>
              <td className="pr-10 py-1 text-gray-600">Number of Pages:</td>
              <td className="font-semibold">{totalPages}</td>
            </tr>
            <tr>
              <td className="pr-10 py-1 text-gray-600">Publisher:</td>
              <td className="font-semibold">{publisher}</td>
            </tr>
            <tr>
              <td className="pr-10 py-1 text-gray-600">Year of Publishing:</td>
              <td className="font-semibold">{yearOfPublishing}</td>
            </tr>
            <tr>
              <td className="pr-10 py-1 text-gray-600">Rating:</td>
              <td className="font-semibold">{rating}</td>
            </tr>
          </tbody>
        </table>

        <BookActions book={book} />
      </div>
    </div>
  );
}