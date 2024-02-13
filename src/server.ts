import cors from "cors";
import express from "express";
import { mainRouter } from "./mainRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
