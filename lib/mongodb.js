import { MongoClient } from "mongodb";

let client;
let db;

export async function connectToDatabase() {
  if (db) {
    return { client, db };
  }

  const mongoUrl = process.env.MONGO_URL;
  const dbName = process.env.DB_NAME;

  if (!mongoUrl || !dbName) {
    throw new Error("Missing MONGO_URL or DB_NAME environment variables");
  }

  client = new MongoClient(mongoUrl);
  await client.connect();
  db = client.db(dbName);

  return { client, db };
}

export async function getDatabase() {
  const { db } = await connectToDatabase();
  return db;
}
