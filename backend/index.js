import express from "express";
import db from "./config/Database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();
const app = express();

// Koneksi ke database
try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error('Database connection error:', error);
}

// Middleware
app.use(cors({  origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

// GANTI DARI INI:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
