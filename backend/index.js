import express from "express";
import db from "./config/Database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Tes koneksi ke database
(async () => {
  try {
    await db.authenticate();
    console.log("Database Connected...");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

// Middleware
app.use(cors({
  credentials: true,
  origin: true 
}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
