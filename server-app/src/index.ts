import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";
// import {rateLimit} from "express-rate-limit"

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3002;
const app = express();

// app.set('trust proxy', true);

// // Apply Rate Limiter
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, 
// 	limit: 100,
// 	message: "Too many requests, please try again later",
// })

// app.use(limiter)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply Cors
app.use(
  cors({
    origin: "https://url-shortener-clo3.onrender.com/api",
    credentials: true,
  })
);

// Routes
app.use("/api", shortUrl);


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
