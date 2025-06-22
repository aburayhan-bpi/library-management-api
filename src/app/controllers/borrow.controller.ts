import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import { Borrow } from "../models/borrow.model";
// Create Router for Borrow related API's
export const borrowRouter = express.Router();

// BORROW A BOOK
borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Get the borrow data
    const borrowData = req.body;

    // Validate quantity
    if (borrowData.quantity <= 0) {
      res.status(400).json({
        success: false,
        message: "Borrow quantity must be at least 1",
      });
      return;
    }

    // Check the book availability which wanted to borrow
    // const availableBook = await Borrow.findBookForBorrow(borrowData.book);
    
    const book = await Book.findById(borrowData.book);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
      return;
    }

    // Validate is the book copies is less than the borrow quantity
    if (book.copies < borrowData.quantity) {
      res.status(400).json({
        success: false,
        message: `Not enough copies available. Available: ${book.copies}, Requested: ${borrowData.quantity}`,
      });
      return;
    }
    // Verify the book has enough available copies.
    if (book?.copies > 0) {
      // Save the borrow record with all relevant details.
      const savedBorrow = await Borrow.create(borrowData);

      // Check or Change available status for book which wanted to borrow
      await Borrow.updateBookAvailability(borrowData.book);

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: savedBorrow,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while creating borrow",
      error: error,
    });
  }
});

// Borrowed Books Summary (Using Aggregation)
borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve summary",
      error: error,
    });
  }
});
