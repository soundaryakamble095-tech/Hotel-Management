# Hotel Management REST API Project

A beginner-friendly **Full-Stack Hotel Management System** built using:

- Backend: Node.js, Express.js, better-sqlite3
- Frontend: React + Vite
- Database: SQLite
- API Testing: Postman

The project allows users to create, view, search, update, and delete hotel room bookings using a REST API.

---

# Project Structure

```
project-folder/
│
├── backend/
│   └── server/
│       └── index.js
│
├── frontend/
│   └── hotelDemo/
│       ├── src/
│       │   ├── App.jsx
│       │   └── App.css
│       └── ...
│
└── postman/
    ├── Hotel-Management-API.postman_collection.json
    └── Hotel-Management.postman_environment.json
```

---

# Technologies Used

## Backend

- Node.js
- Express.js
- better-sqlite3
- CORS
- SQLite

## Frontend

- React
- Vite
- Fetch API
- React Hooks

## Database

SQLite (`data.db`)

---

# Features

## Backend

- SQLite database
- Automatically creates `rooms` table
- REST API
- Pagination
- Search
- Duplicate email validation
- Required field validation
- Update booking
- Delete booking
- Fetch booking by ID
- Fetch all bookings

---

## Frontend

- Responsive UI
- Booking Form
- Edit Booking
- Delete Booking
- Search
- Pagination
- Loading Indicator
- Dark Mode
- Avatar Initials
- Character Counter
- Client-side Validation
- API Error Messages
- Last Updated Timestamp

---

# Database Table

## rooms

| Column | Type |
|---------|------|
| id | INTEGER PRIMARY KEY AUTOINCREMENT |
| guest_name | TEXT |
| email | TEXT UNIQUE |
| phone | TEXT |
| room_number | TEXT |
| room_type | TEXT |
| check_in | TEXT |
| check_out | TEXT |
| status | TEXT |
| created_at | DATETIME |

---

# REST API Endpoints

## Create Booking

```
POST /rooms
```

Required Fields

- guest_name
- email
- room_number
- room_type
- check_in
- check_out

Returns

- 201 Created
- 400 Missing fields
- 409 Duplicate email

---

## Get All Bookings

```
GET /rooms
```

Supports

```
?page=1
&limit=5
&search=John
```

Returns

```
{
  "data": [],
  "page": 1,
  "limit": 5,
  "total": 20,
  "totalPages": 4
}
```

---

## Get Booking By ID

```
GET /rooms/:id
```

Returns

- Booking
- 404 if not found

---

## Update Booking

```
PUT /rooms/:id
```

Updates any booking details.

Returns

- Updated booking
- 404 if booking not found

---

## Delete Booking

```
DELETE /rooms/:id
```

Returns

```
{
    "message":"Booking deleted successfully."
}
```

---

# Installation

## 1. Clone the project

```
git clone <repository-url>
```

---

## 2. Backend

Navigate to backend/server

```
cd backend/server
```

Install dependencies

```
npm install express cors better-sqlite3
```

Run

```
node index.js
```

Server starts on

```
http://localhost:5000
```

---

## 3. Frontend

Navigate to frontend

```
cd frontend/hotelDemo
```

Install dependencies

```
npm install
```

Run

```
npm run dev
```

Usually opens at

```
http://localhost:5173
```

---

# API Testing

Import into Postman:

- Hotel-Management-API.postman_collection.json
- Hotel-Management.postman_environment.json

Environment Variables

| Variable | Value |
|-----------|-------|
| base_url | http://localhost:5000 |
| booking_id | (leave blank initially) |

---

# Frontend Features

- Create Booking
- Edit Booking
- Delete Booking
- Search by Guest Name
- Search by Room Number
- Search by Room Type
- Live Character Counter
- Loading Indicator
- Pagination
- Last Updated Time
- Responsive Layout
- Dark Mode
- Avatar Initials
- Form Validation

---

# Validation

Backend validates

- Required fields
- Duplicate email

Frontend validates

- Empty fields
- Guest name length (40 characters)
- Required dates
- Email field

---

# Pagination

Example

```
GET /rooms?page=2&limit=5
```

---

# Search

Example

```
GET /rooms?search=Suite
```

Search works on

- Guest Name
- Room Number
- Room Type

---

# HTTP Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 201 | Created |
| 400 | Missing Required Fields |
| 404 | Booking Not Found |
| 409 | Duplicate Email |
| 500 | Internal Server Error |

---

# Sample Booking

```json
{
  "guest_name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "room_number": "101",
  "room_type": "Deluxe",
  "check_in": "2026-07-10",
  "check_out": "2026-07-15"
}
```

---

# Learning Outcomes

This project helps beginners learn:

- Express.js REST APIs
- SQLite with better-sqlite3
- CRUD Operations
- Pagination
- Search
- React Hooks
- Fetch API
- Form Validation
- Responsive CSS
- Dark Mode
- Postman Testing

---

# Author

Hotel Management REST API Demo Project

Designed for learning full-stack CRUD application development using Express, SQLite, React, and Postman.
