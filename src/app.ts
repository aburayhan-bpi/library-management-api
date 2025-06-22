import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controllers/books.controller";
import { borrowRouter } from "./app/controllers/borrow.controller";

// Make an app
const app: Application = express();
app.use(express.json());

// Books related API's
app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management Api server");
});

// console.log("borrowRouter is:", typeof borrowRouter);

export default app;
