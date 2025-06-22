import dotenv from "dotenv";
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server;

// Configs
const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || " ",
};

const main = async () => {
  try {
    await mongoose.connect(config.MONGO_URI as string);
    console.log("✅ MongoDB connected!");

    // App listening
    server = app.listen(config.PORT, () => {
      console.log(`🚀 Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
  }
};

main();
