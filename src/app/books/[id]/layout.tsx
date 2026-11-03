import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Details",
};

export default function BookDetailsLayout({
  children,
}: LayoutProps<"/books/[id]">) {
  return children;
}
