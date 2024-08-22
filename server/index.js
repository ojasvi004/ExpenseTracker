import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("helloooo!!!");
});

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;

    app.listen(port, () => {
      console.log(`server is running on: ${port}`);
    });

    app.on("error", (error) => {
      console.log("error: ", error);
      throw error;
    });
  })
  .catch((error) => {
    console.log("mongoDB connection failed! ", error);
    process.exit(1);
  });
