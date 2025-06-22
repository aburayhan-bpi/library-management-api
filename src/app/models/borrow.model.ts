import { model, Schema, Types } from "mongoose";
import { BookStaticMethods, Iborrow } from "../interfaces/books.inerface";
import { Book } from "./books.model";

const borrowSchema = new Schema<Iborrow, BookStaticMethods>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Borrow Quantity must be a positive number",
      },
    },
    dueDate: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Static method to update availability
borrowSchema.static(
  "updateBookAvailability",
  async function (bookId: Types.ObjectId) {
    const book = await Book.findById(bookId);
    if (!book) {
      console.log("Book is not found!");
      return;
    }
    if (book.copies <= 0) {
      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        {
          $set: { available: false },
        },
        { new: true }
      );
      console.log(`Book ${bookId} is not available due to copies 0`);
      return updatedBook;
    }
    return book;
  }
);

// Static Schema for Find books for borrow
// borrowSchema.static(
//   "findBookForBorrow",
//   async function (bookId: Types.ObjectId) {
//     const book = await Book.findById(bookId);
//     return book;
//   }
// );

borrowSchema.pre("save", async function (next) {
  const book = await Book.findById(this.book);
  if (!book) {
    return console.log("Book not found!");
  }
  next();
});

// Post middleware for deduct requested quantity from the book's copies - It will run after the borrow is successful!
borrowSchema.post("save", async function (doc) {
  try {
    // Deduct the requested quantity from the book's copies
    const updatedBook = await Book.findByIdAndUpdate(
      doc.book,
      {
        $inc: { copies: -doc.quantity },
      },
      { new: true }
    );
    console.log("Copies deducted successfully", updatedBook);
  } catch (error) {
    console.log("Failed to update book copies", error);
  }
});

// Create model using borrowSchema
export const Borrow = model<Iborrow, BookStaticMethods>("Borrow", borrowSchema);
