# 📚 Library Management System API

A fully functional RESTful API for managing books and borrow records, built with **TypeScript**, **Express.js**, and **MongoDB** using **Mongoose**.

---

## 🚀 Features

- Add and manage books with proper schema validation
- Borrow books with availability control logic
- Automatic stock update after borrowing
- Borrow summary using MongoDB Aggregation Pipeline
- Implements Mongoose **static methods**, **middleware** (`pre`, `post`)
- Filtering and validation built-in

---

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** (Mongoose)
- **dotenv**
- **ESLint** and **ts-node-dev** for development

---

## 📁 Folder Structure

```
src/
│
├── app/
│   ├── interfaces/       # TypeScript interfaces
│   ├── models/           # Mongoose models (Book, Borrow)
│   ├── routes/           # Express routers
│   └── controllers/      # Request handling logic
│
├── config/               # Database configuration
└── server.ts             # Entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
```

### 4. Start the Development Server

```bash
npm run dev
```

---

## 📌 API Endpoints

### ✅ Add a Book

**POST** `/api/books`

```json
{
  "title": "JavaScript Essentials",
  "author": "John Doe",
  "isbn": "123-456-789",
  "copies": 5
}
```

---

### ✅ Get All Books

**GET** `/api/books`

---

### ✅ Borrow a Book

**POST** `/api/borrow`

```json
{
  "book": "BOOK_OBJECT_ID",
  "quantity": 2,
  "dueDate": "2025-07-01"
}
```

> 📌 Automatically updates book availability and deducts stock.

---

### ✅ Borrowed Books Summary

**GET** `/api/borrow`

Returns a summary of all books borrowed along with their total quantity.

```json
[
  {
    "book": {
      "title": "JavaScript Essentials",
      "isbn": "123-456-789"
    },
    "totalQuantity": 5
  }
]
```

---

## 🧪 Linting

To check for TypeScript and style errors, run:

```bash
npm run lint
```

> Make sure `eslint.config.mjs` is set up and `.eslintrc` rules are followed.

---

## 📝 Author

**Abu Rayhan**  
[GitHub Profile](https://github.com/aburayhan-bpi)

---

## 🪪 License

This project is licensed under the **ISC License**.