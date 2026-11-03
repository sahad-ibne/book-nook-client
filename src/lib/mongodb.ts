import { MongoClient, Db } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
  mongoDb?: Db;
};

export async function getDatabase() {
  if (!globalForMongo.mongoDb) {
    let uri = process.env.MONGO_URI?.trim();
    if (!uri) throw new Error("MONGO_URI is not configured");
    if (
      (uri.startsWith("'") && uri.endsWith("'")) ||
      (uri.startsWith('"') && uri.endsWith('"'))
    ) {
      uri = uri.slice(1, -1).trim();
    }

    globalForMongo.mongoClient = new MongoClient(uri);
    globalForMongo.mongoDb = globalForMongo.mongoClient.db("bookNook");
  }

  return globalForMongo.mongoDb;
}
