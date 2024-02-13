import cors from "cors";
import express from "express";
import { mainRouter } from "./mainRouter";
import { errorHandler } from "./handlers/errors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
