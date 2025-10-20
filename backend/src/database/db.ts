import { MongoClient, Db, Collection } from "mongodb";
import env from "../config/env.config";

let db: Db;
let client: MongoClient;

async function connectToDB(): Promise<void> {
  try {
    client = new MongoClient(env.MONGODB_URI);
    await client.connect();
    db = client.db(env.DB_NAME);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

function getCollection<T>(name: string): Collection<T> {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db.collection<T>(name);
}

export default connectToDB;
export { db, getCollection };
