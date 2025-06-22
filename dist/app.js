"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
// Make an app
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Books related API's
app.use("/api/books", books_controller_1.booksRouter);
app.use("/api/borrow", borrow_controller_1.borrowRouter);
app.get("/", (req, res) => {
    res.send("Welcome to Library Management Api server");
});
// console.log("borrowRouter is:", typeof borrowRouter);
exports.default = app;
