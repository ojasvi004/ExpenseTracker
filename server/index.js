import express from "express";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { router as authRouter } from "./routes/user.route.js";
import { router as transactionRouter } from "./routes/transaction.route.js";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("helloooo!!!");
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", authRouter);
app.use("/api/v1", transactionRouter);

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;

    app.listen(port, () => {
      console.log(`server is running on: ${port}`);
    });

    app.on("error", (err) => {
      console.log("error: ", err);
      throw err;
    });
  })
  .catch((err) => {
    console.log("mongoDB connection failed", err);
    process.exit(1);
  });
