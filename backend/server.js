import path from "path";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors());

// Middleware Imported Start
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// Middleware Imported End

//Route Imported Start
import userRoutes from "./routes/userRoutes.js";
//Route Imported End

//DB function imported
import connectDB from "./config/db.js";
connectDB();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));
// Middleware Start
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware End
// Routes Start
app.use("/api/user", userRoutes);
// Routes End

// app.get("*", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "dist", "index.html"))
// );

// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, "/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "dist", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running...");
//   });
// }

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
