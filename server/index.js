import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import cor from "cors";
import userRouter from "./routes/routes.js";

dotenv.config({ path: ".env" });

const app = express();

// db connect
connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cor({
    origin: "http://localhost:3000/",
    Credential: true,
  })
);

// add router
app.use("/api/vi/", userRouter);

// default router
app.get("/", (req, res) => {
  res.json({
    success: true,
    massage: "Your server is up and running...",
  });
});

app.listen(process.env.PORT || "4000", () => {
  console.log("server run successfully");
});
