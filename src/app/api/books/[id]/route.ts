import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!ObjectId.isValid(id))
    return Response.json({ message: "Book not found" }, { status: 404 });

  const db = await getDatabase();
  const book = await db.collection("books").findOne({ _id: new ObjectId(id) });
  if (!book)
    return Response.json({ message: "Book not found" }, { status: 404 });
  return Response.json({ ...book, _id: book._id.toString() });
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.email)
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  if (!ObjectId.isValid(id))
    return Response.json({ message: "Book not found" }, { status: 404 });

  const db = await getDatabase();
  const _id = new ObjectId(id);
  const existing = await db
    .collection("books")
    .findOne({ _id, userEmail: session.user.email });
  if (!existing)
    return Response.json(
      { message: "Book not found or you cannot edit it" },
      { status: 403 },
    );

  const body = await request.json();
  const update = {
    title: String(body.title || "").trim(),
    author: String(body.author || "").trim(),
    category: String(body.category || ""),
    image: String(body.image || "").trim(),
    description: String(body.description || "").trim(),
    copies: Math.max(1, Number(body.copies) || 1),
  };
  if (
    !update.title ||
    !update.author ||
    !update.category ||
    !update.image ||
    !update.description
  ) {
    return Response.json(
      { message: "All book fields are required" },
      { status: 400 },
    );
  }

  await db.collection("books").updateOne({ _id }, { $set: update });
  return Response.json({ message: "Book updated" });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.email)
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  if (!ObjectId.isValid(id))
    return Response.json({ message: "Book not found" }, { status: 404 });

  const db = await getDatabase();
  const result = await db.collection("books").deleteOne({
    _id: new ObjectId(id),
    userEmail: session.user.email,
  });
  if (!result.deletedCount)
    return Response.json(
      { message: "Book not found or you cannot delete it" },
      { status: 403 },
    );
  return Response.json({ message: "Book deleted" });
}
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.email)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  if (!ObjectId.isValid(id))
    return Response.json({ message: "Book not found" }, { status: 404 });

  const body = await request.json();
  const { type, rating, comment, quoteText, userName, userEmail } = body;

  const db = await getDatabase();
  const _id = new ObjectId(id);

  if (type === "review") {
    const newReview = {
      rating: Number(rating) || 5,
      comment: String(comment || "").trim(),
      userName: session.user.name || userName,
      userEmail: session.user.email || userEmail,
      createdAt: new Date().toISOString(),
    };

    await db
      .collection("books")
      .updateOne({ _id }, { $push: { reviews: newReview } as any });
    return Response.json({ message: "Review added successfully" });
  }

  if (type === "quote") {
    const newQuote = {
      quoteText: String(quoteText || "").trim(),
      userName: session.user.name || userName,
      userEmail: session.user.email || userEmail,
      createdAt: new Date().toISOString(),
    };

    await db
      .collection("books")
      .updateOne({ _id }, { $push: { quotes: newQuote } as any });
    return Response.json({ message: "Quote added successfully" });
  }

  return Response.json({ message: "Invalid update type" }, { status: 400 });
}
