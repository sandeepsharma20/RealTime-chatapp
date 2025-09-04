import { config } from "dotenv";
import { resolve } from "path";

// ensure .env is loaded before mongoose
config({ path: resolve("./server/.env") });

import mongoose from "mongoose";

const uri = process.env.CONN_STRING;

if (!uri) {
  throw new Error("❌ MongoDB connection string missing. Check .env file!");
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("connected", () => {
  console.log("✅ db connection successful");
});

db.on("error", (err) => {
  console.error("❌ db connection failed:", err.message);
});

export default db;
