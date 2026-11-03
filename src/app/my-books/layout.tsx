import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Books" };

export default function MyBooksLayout({ children }: LayoutProps<"/my-books">) {
  return children;
}
