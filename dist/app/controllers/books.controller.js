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
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
// Create Router for Books related API's
exports.booksRouter = express_1.default.Router();
// CREATE BOOK
exports.booksRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        const book = yield books_model_1.Book.create(bookData);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error while creating book",
            error: error,
        });
    }
}));
// GET ALL BOOKS
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Receive all Query Options
        const { filter, sortBy, sort, limit = 10 } = req.query;
        console.log(filter, sortBy, sort, limit);
        // Create Filter
        const filterOption = filter ? { genre: filter } : {};
        // Create Sort Option
        const sortOption = {};
        if (sortBy) {
            sortOption[sortBy] = sort === "desc" ? -1 : 1;
        }
        const books = yield books_model_1.Book.find(filterOption)
            .sort(sortOption)
            .limit(Number(limit));
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error while getting all book",
            error: error,
        });
    }
}));
// GET BOOK BY ID
exports.booksRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the book Id
        const bookId = req.params.bookId;
        const book = yield books_model_1.Book.findById(bookId);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error while getting single book",
            error: error,
        });
    }
}));
// UPDATE BOOK
exports.booksRouter.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the book Id
        const bookId = req.params.bookId;
        // Get update data for book
        const updatedData = req.body;
        const updatedBook = yield books_model_1.Book.findByIdAndUpdate(bookId, updatedData, {
            new: true,
        });
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error while updating book",
            error: error,
        });
    }
}));
// DELETE BOOK
exports.booksRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the book Id
        const bookId = req.params.bookId;
        const book = yield books_model_1.Book.findByIdAndDelete(bookId, { new: true });
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error while deleting book",
            error: error,
        });
    }
}));
