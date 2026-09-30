"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/listed-books", label: "Listed Books" },
  { href: "/pages-to-read", label: "Pages to Read" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 py-6">
      <Link
        href="/"
        className="text-2xl font-bold font-[family-name:var(--font-playfair)]"
      >
        Book Vibe
      </Link>

      <ul className="flex gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`px-4 py-2 rounded-lg border text-sm ${
                pathname === link.href
                  ? "border-[#23BE0A] text-[#23BE0A] font-semibold"
                  : "border-transparent"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <button className="bg-[#23BE0A] text-white px-4 py-2 rounded-lg font-semibold text-sm">
          Sign In
        </button>
        <button className="bg-[#59C6D2] text-white px-4 py-2 rounded-lg font-semibold text-sm">
          Sign Up
        </button>
      </div>
    </nav>
  );
}