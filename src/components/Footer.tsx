import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#17231C] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2D5A3F] text-base">
              📚
            </span>
            BookNook
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-gray-300">
            A community library for discovering, sharing, and borrowing books.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Contact
          </h2>
          <a
            href="mailto:binsahad91@gmail.com"
            className="mt-4 block text-sm text-gray-300 hover:text-white"
          >
            binsahad91@gmail.com
          </a>
          <p className="mt-2 text-sm text-gray-300">Chittagong, Bangladesh</p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Follow Us
          </h2>
          <div className="mt-4 flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-lg border border-white/20 px-3 py-2 text-sm text-gray-300 hover:text-white"
            >
              f
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-lg border border-white/20 px-3 py-2 text-sm text-gray-300 hover:text-white"
            >
              ig
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg border border-white/20 px-3 py-2 text-sm text-gray-300 hover:text-white"
            >
              Ln
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-400">
        © 2026 BookNook.
      </div>
    </footer>
  );
}
