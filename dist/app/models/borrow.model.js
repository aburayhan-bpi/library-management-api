"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const books_model_1 = require("./books.model");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
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
}, {
    versionKey: false,
    timestamps: true,
});
// Static method to update availability
borrowSchema.static("updateBookAvailability", function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield books_model_1.Book.findById(bookId);
        if (!book) {
            console.log("Book is not found!");
            return;
        }
        if (book.copies <= 0) {
            const updatedBook = yield books_model_1.Book.findByIdAndUpdate(bookId, {
                $set: { available: false },
            }, { new: true });
            console.log(`Book ${bookId} is not available due to copies 0`);
            return updatedBook;
        }
        return book;
    });
});
// Static Schema for Find books for borrow
// borrowSchema.static(
//   "findBookForBorrow",
//   async function (bookId: Types.ObjectId) {
//     const book = await Book.findById(bookId);
//     return book;
//   }
// );
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield books_model_1.Book.findById(this.book);
        if (!book) {
            return console.log("Book not found!");
        }
        next();
    });
});
// Post middleware for deduct requested quantity from the book's copies - It will run after the borrow is successful!
borrowSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Deduct the requested quantity from the book's copies
            const updatedBook = yield books_model_1.Book.findByIdAndUpdate(doc.book, {
                $inc: { copies: -doc.quantity },
            }, { new: true });
            console.log("Copies deducted successfully", updatedBook);
        }
        catch (error) {
            console.log("Failed to update book copies", error);
        }
    });
});
// Create model using borrowSchema
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
