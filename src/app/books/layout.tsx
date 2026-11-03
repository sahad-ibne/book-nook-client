import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { category } = searchParams ? await searchParams : {};
  return {
    title: category ? `${category} Books` : "All Books",
  };
}

export default function BooksLayout({
  children,
}: LayoutProps<"/books">) {
  return children;
}
