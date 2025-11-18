import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    // Already connected - do nothing
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "urlshortner",   // your actual DB name
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
}
