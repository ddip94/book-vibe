import type { Metadata } from "next";
import { Work_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { BooksProvider } from "@/context/BooksContext";

const work = Work_Sans({ subsets: ["latin"], variable: "--font-work" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Book Vibe",
  description: "Books to freshen up your bookshelf",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${work.variable} ${playfair.variable} font-[family-name:var(--font-work)] max-w-6xl mx-auto px-4`}
      >
       <BooksProvider>
         <Navbar />
        <main>{children}</main>
        
       </BooksProvider>
        
      </body>
    </html>
  );
}