import cors from "cors";
import express from "express";
import { mainRouter } from "./mainRouter";
import { errorHandler } from "./handlers/errors";
import dotenv from "dotenv";

dotenv.config();

const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);

app.use(errorHandler);

app
  .listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err.message);
    process.exit(1);
  });
