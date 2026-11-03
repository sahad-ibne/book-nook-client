import { getDatabase } from "@/lib/mongodb";

export async function GET() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "");
  if (serverUrl) {
    const response = await fetch(`${serverUrl}/latest-books`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return Response.json(
        { message: "Failed to fetch latest books" },
        { status: response.status },
      );
    }
    return Response.json(await response.json(), {
      headers: { "Cache-Control": "no-store" },
    });
  }

  const db = await getDatabase();
  const books = await db
    .collection("books")
    .find({})
    .sort({ addedDate: -1 })
    .limit(6)
    .toArray();

  return Response.json(
    books.map((book) => ({ ...book, _id: book._id.toString() })),
    { headers: { "Cache-Control": "no-store" } },
  );
}
