import { model, Schema } from "mongoose";
import { Ibooks } from "../interfaces/books.inerface";

const bookSchema = new Schema<Ibooks>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Copies must be a positive number",
      },
    },
    available: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

// Create model with bookSchema
export const Book = model<Ibooks>("Book", bookSchema);
