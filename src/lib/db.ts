import { envConfig } from "@/config";
import mongoose from "mongoose";

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var myMongoose: GlobalMongoose | undefined;
}

let cached = global.myMongoose;

if (!cached) {
  cached = global.myMongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(envConfig.db_url!, opts);
  }

  try {
    cached!.conn = await cached!.promise;
    console.log("MongoDB connected successfully");
  } catch (e) {
    cached!.promise = null;
    console.error("MongoDB connection error:", e);
    throw e;
  }

  return cached!.conn;
}

export default connectDB;
