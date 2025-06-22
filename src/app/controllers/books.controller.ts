import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
// Create Router for Books related API's
export const booksRouter = express.Router();

// CREATE BOOK
booksRouter.post("/", async (req: Request, res: Response) => {
  try {
    const bookData = req.body;

    const book = await Book.create(bookData);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while creating book",
      error: error,
    });
  }
});

// GET ALL BOOKS
booksRouter.get("/", async (req: Request, res: Response) => {
  try {
    // Receive all Query Options
    const { filter, sortBy, sort, limit = 10 } = req.query;
    console.log(filter, sortBy, sort, limit);
    // Create Filter
    const filterOption = filter ? { genre: filter } : {};

    // Create Sort Option
    const sortOption: { [key: string]: 1 | -1 } = {};

    if (sortBy) {
      sortOption[sortBy as string] = sort === "desc" ? -1 : 1;
    }

    const books = await Book.find(filterOption)
      .sort(sortOption)
      .limit(Number(limit));

    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while getting all book",
      error: error,
    });
  }
});

// GET BOOK BY ID
booksRouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    // Get the book Id
    const bookId = req.params.bookId;

    const book = await Book.findById(bookId);
    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while getting single book",
      error: error,
    });
  }
});

// UPDATE BOOK
booksRouter.put("/:bookId", async (req: Request, res: Response) => {
  try {
    // Get the book Id
    const bookId = req.params.bookId;

    // Get update data for book
    const updatedData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
    });

    res.status(201).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while updating book",
      error: error,
    });
  }
});

// DELETE BOOK
booksRouter.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    // Get the book Id
    const bookId = req.params.bookId;

    const book = await Book.findByIdAndDelete(bookId, { new: true });

    res.status(201).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting book",
      error: error,
    });
  }
});
