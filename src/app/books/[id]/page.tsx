import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import BookDetailsContent from "@/components/BookDetailsContent";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  console.log("Token in page.tsx:", jwtToken?.token);

  return (
    <BookDetailsContent
      bookId={id}
      session={session}
      jwtToken={jwtToken?.token}
    />
  );
}
