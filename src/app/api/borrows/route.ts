import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.email)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const db = await getDatabase();
  const borrows = await db
    .collection("borrows")
    .find({ borrowerEmail: session.user.email, returned: false })
    .sort({ borrowDate: -1 })
    .toArray();

  return Response.json(
    borrows.map((borrow) => ({ ...borrow, _id: borrow._id.toString() })),
  );
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!body.bookId || !body.bookTitle) {
    return Response.json(
      { message: "Invalid borrow request" },
      { status: 400 },
    );
  }

  const db = await getDatabase();
  const { ObjectId } = await import("mongodb");
  if (!ObjectId.isValid(body.bookId))
    return Response.json({ message: "Invalid book" }, { status: 400 });

  const existing = await db.collection("borrows").findOne({
    bookId: body.bookId,
    borrowerEmail: session.user.email,
    returned: false,
  });
  if (existing)
    return Response.json(
      { message: "You have already borrowed this book" },
      { status: 409 },
    );

  await db.collection("borrows").insertOne({
    bookId: body.bookId,
    bookTitle: body.bookTitle,
    bookImage: body.bookImage || "",
    borrowerName: session.user.name,
    borrowerEmail: session.user.email,
    borrowDate: body.borrowDate
      ? new Date(`${body.borrowDate}T00:00:00`)
      : new Date(),
    returnDate: body.returnDate
      ? new Date(`${body.returnDate}T00:00:00`)
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    returned: false,
  });
  return Response.json({ message: "Book borrowed" }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.email)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  const { ObjectId } = await import("mongodb");
  if (!id || !ObjectId.isValid(id))
    return Response.json({ message: "Invalid borrow record" }, { status: 400 });

  const db = await getDatabase();
  const result = await db
    .collection("borrows")
    .updateOne(
      { _id: new ObjectId(id), borrowerEmail: session.user.email },
      { $set: { returned: true, returnedDate: new Date() } },
    );
  if (!result.matchedCount)
    return Response.json(
      { message: "Borrow record not found" },
      { status: 404 },
    );

  return Response.json({ message: "Book returned" });
}
