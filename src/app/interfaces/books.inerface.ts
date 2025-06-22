/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from "mongoose";

export interface Ibooks {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface Iborrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface BookStaticMethods extends Model<Iborrow> {
  findBookForBorrow(bookId: Types.ObjectId): any;
  updateBookAvailability(bookId: Types.ObjectId): any;
}
