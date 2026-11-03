import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#FBF9F5] px-4">
      <div className="text-center">
        <p className="text-sm font-bold tracking-widest text-[#E08552] uppercase">
          404 Error
        </p>
        <h1 className="mt-2 text-5xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-4 text-sm text-gray-500">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-[#2D5A3F] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#234631]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
