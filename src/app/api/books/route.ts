import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  const db = await getDatabase();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = category
    ? {
        category: {
          $regex: `^${category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
          $options: "i",
        },
      }
    : {};
  const books = await db
    .collection("books")
    .find(query)
    .sort({ addedDate: -1 })
    .toArray();

  return Response.json(books.map((book) => ({ ...book, _id: book._id.toString() })), {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const title = String(body.title || "").trim();
  const author = String(body.author || "").trim();
  const description = String(body.description || "").trim();
  const image = String(body.image || "").trim();
  const category = String(body.category || "");

  if (!title || !author || !category || !image || !description) {
    return Response.json(
      { message: "All book fields are required" },
      { status: 400 },
    );
  }

  const db = await getDatabase();
  const result = await db.collection("books").insertOne({
    title,
    author,
    category,
    image,
    description,
    copies: Math.max(1, Number(body.copies) || 1),
    userName: session.user.name,
    userEmail: session.user.email,
    addedDate: new Date(),
  });

  return Response.json({ _id: result.insertedId.toString() }, { status: 201 });
}
