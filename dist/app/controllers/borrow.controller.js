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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const borrow_model_1 = require("../models/borrow.model");
// Create Router for Borrow related API's
exports.borrowRouter = express_1.default.Router();
// BORROW A BOOK
exports.borrowRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const book = yield books_model_1.Book.findById(borrowData.book);
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
        if ((book === null || book === void 0 ? void 0 : book.copies) > 0) {
            // Save the borrow record with all relevant details.
            const savedBorrow = yield borrow_model_1.Borrow.create(borrowData);
            // Check or Change available status for book which wanted to borrow
            yield borrow_model_1.Borrow.updateBookAvailability(borrowData.book);
            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: savedBorrow,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error while creating borrow",
            error: error,
        });
    }
}));
// Borrowed Books Summary (Using Aggregation)
exports.borrowRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve summary",
            error: error,
        });
    }
}));
