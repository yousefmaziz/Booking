# Yacht Booking System API

> **Status:** In Progress — Backend development

A RESTful backend API for managing yachts and reservations, built with **Node.js, Express.js, TypeScript, and MongoDB**. The project focuses on secure access, preventing overlapping reservations, and improving read performance with Redis caching.

## Features

- **Yacht management:** Create, view, update, and delete yachts. Management operations are restricted to admins.
- **Authentication and authorization:** User registration and login with hashed passwords, JWT authentication, and role-based access control (`user` / `admin`).
- **Booking management:** Authenticated users can book yachts for a date range, view their own bookings, and cancel their bookings. Admins can view all bookings and confirm them.
- **Double-booking prevention:** Date-overlap checks, MongoDB transactions, and optimistic concurrency control help prevent conflicting reservations.
- **Request validation:** Zod schemas validate registration, login, yacht data, booking dates, and route parameters.
- **Rate limiting:** Login and registration endpoints have request limits.
- **Redis caching:** Yacht listings are cached for 60 seconds. Successful yacht create/update/delete operations invalidate the listing cache. If Redis is unavailable, the listing endpoint can fall back to MongoDB.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| Cache | Redis |
| Authentication | JWT + bcrypt |
| Validation | Zod |
| Rate limiting | express-rate-limit |
| Local Redis environment | Docker |

## API Endpoints

> Routes below assume the API is mounted under `/api`.

### Users

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/users/register` | Public | Register a user |
| `POST` | `/users/login` | Public | Log in and receive a JWT |


### Yachts

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/yachts` | Public | List yachts (Redis-cached) |
| `POST`| `/yachts` | Admin | Create a yacht |
| `GET` | `/yachts/:id` | Public | Get yacht details |
| `PUT` | `/yachts/:id` | Admin | Update a yacht |
| `DELETE` | `/yachts/:id` | Admin | Delete a yacht |

### Bookings

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/bookings` | Authenticated | Create a booking |
| `GET` | `/bookings/myBookings` | Authenticated | View your bookings |
| `PATCH` | `/bookings/:bookingId/cancel` | Booking owner | Cancel your booking |
| `GET` | `/bookings` | Admin | View all bookings |
| `PATCH` | `/bookings/:bookingId/confirm` | Admin | Confirm a booking |

### Example: Create a Booking

```http
POST /bookings
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json
```

```json
{
  "yachtId": "507f1f77bcf86cd799439011",
  "startDate": "2027-06-10",
  "endDate": "2027-06-13"
}
```

The backend calculates `totalPrice` using the yacht's `pricePerDay` and the booking duration. Clients cannot supply their own price.

## How Booking Conflicts Are Prevented

A booking is rejected when its date range overlaps an existing **pending** or **confirmed** booking for the same yacht. The overlap rule is:

```text
existing.startDate < requested.endDate
AND
existing.endDate > requested.startDate
```

The booking flow uses a MongoDB transaction and an atomic conditional update to the yacht document's version (`__v`) to handle concurrent booking attempts. This helps ensure that two simultaneous requests cannot both reserve the same overlapping period.

## Redis Caching Strategy

`GET /api/yachts` follows the **cache-aside** pattern:

1. Look for `yachts:all` in Redis.
2. On a **cache hit**, return cached yacht data.
3. On a **cache miss**, query MongoDB and cache the result for **60 seconds**.
4. After a successful yacht create, update, or delete, invalidate `yachts:all`.
5. If Redis is unavailable, fetch yacht data directly from MongoDB.

> **Note:** Redis is used for yacht listings, not for deciding booking availability. Booking conflict checks remain database-backed.

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database (for example, MongoDB Atlas)
- Docker Desktop (optional, for running Redis locally)

### Installation

```bash
git clone https://github.com/yousefmaziz/Booking
cd <YOUR_BACKEND_DIRECTORY>
npm install
```

### Environment Variables

Create a `.env` file in the backend project directory and configure the values used by the application:

```env
PORT=5000
MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
JWT_SECRET=<YOUR_STRONG_JWT_SECRET>
REDIS_URL=redis://localhost:6379
```

**Important:** Check the MongoDB environment-variable name in your connection configuration and adjust `MONGO_URI` above if your code uses a different name. Never commit `.env` or secrets to GitHub.

### Run Redis with Docker

```bash
docker run -d --name yacht-redis -p 127.0.0.1:6379:6379 redis:7-alpine
```

If the container already exists:

```bash
docker start yacht-redis
```

### Start the API

```bash
npm run dev
```

The development server is configured to run on port `5000` by default (subject to your environment configuration).

## Project Status & Next Steps

**Implemented:** Yacht CRUD, JWT authentication, role-based authorization, booking workflows, date-overlap prevention, MongoDB transactions, Zod validation, rate limiting, and Redis listing cache.

**Planned:** Automated API testing (Vitest + Supertest), containerized backend deployment, Nginx load balancing, and load testing with k6.

## Author

**Yousef Mohamed Abdel Aziz Ibrahim**  
GitHub: [yousefmaziz](https://github.com/yousefmaziz)

---

*This project is actively being developed.*
