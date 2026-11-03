import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.email) return Response.json({ message: "Unauthorized" }, { status: 401 });

  const db = await getDatabase();
  const books = await db.collection("books").find({ userEmail: session.user.email }).sort({ addedDate: -1 }).toArray();
  return Response.json(books.map((book) => ({ ...book, _id: book._id.toString() })));
}
