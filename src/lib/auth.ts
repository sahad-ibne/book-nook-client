import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

let uri = process.env.MONGO_URI?.trim() || "";
if (
  (uri.startsWith("'") && uri.endsWith("'")) ||
  (uri.startsWith('"') && uri.endsWith('"'))
) {
  uri = uri.slice(1, -1).trim();
}
const client = new MongoClient(uri);
const db = client.db("bookNook");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
    },
  },
});
