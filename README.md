# 📚 Library Management System API

A full-featured RESTful API for managing books and borrow records, developed using **Express.js**, **TypeScript**, and **MongoDB** with **Mongoose**.

---

## 🚀 Features

- Create, update, delete, and retrieve book records
- Borrow books with business logic enforcement
- Dynamic filtering, sorting, and pagination of books
- Auto-update book availability and stock
- Borrow summary using MongoDB Aggregation Pipeline
- Use of **Mongoose middleware**, **static methods**
- Clean and well-structured API responses

---

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** (via Mongoose)
- **dotenv**
- **ts-node-dev**

---

## 📁 Folder Structure

```
src/
│
├── app/
│   ├── interfaces/       # TypeScript interfaces
│   ├── models/           # Mongoose models
│   └── controllers/      # Route logic
│
├── app.ts                # App setup
└── server.ts             # Entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/aburayhan-bpi/library-management-api
cd library-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongodb_uri
```

### 4. Run the Server

```bash
npm run dev
```

---

## 📌 API Endpoints

### ✅ 1. Create Book

**POST** `/api/books`

**Request:**

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```

---

### ✅ 2. Get All Books (with Filtering & Sorting)

**GET** `/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5`

**Query Parameters:**

- `filter`: Filter by genre
- `sortBy`: Field to sort (e.g., createdAt)
- `sort`: asc or desc
- `limit`: Number of results to return

**Response:**

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [ ... ]
}
```

---

### ✅ 3. Get Book by ID

**GET** `/api/books/:bookId`

**Response:**

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": { ... }
}
```

---

### ✅ 4. Update Book

**PUT** `/api/books/:bookId`

**Request:**

```json
{
  "copies": 50
}
```

**Response:**

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": { ... }
}
```

---

### ✅ 5. Delete Book

**DELETE** `/api/books/:bookId`

**Response:**

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

---

### ✅ 6. Borrow a Book

**POST** `/api/borrow`

**Request:**

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Business Logic:**

- Verifies if enough copies are available
- Deducts the requested quantity
- Updates availability if stock hits 0

**Response:**

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": { ... }
}
```

---

### ✅ 7. Borrowed Books Summary

**GET** `/api/borrow`

**Response:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## 🧪 Linting

```bash
npm run lint
```

> Ensure ESLint and TypeScript rules are followed.

---

## 📝 Author

**Abu Rayhan**  
[GitHub Profile](https://github.com/aburayhan-bpi)

---

## 🪪 License

This project is licensed under the **ISC License**.
