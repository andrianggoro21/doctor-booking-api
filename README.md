# Doctor Booking API

A comprehensive RESTful API for managing doctor appointments and bookings. Built with Node.js, Express, TypeScript, and MySQL using Prisma ORM.

## Features

- 🏥 **Doctor Management** - Create and manage doctors with different specializations
- 📅 **Schedule Management** - Set up practice schedules for doctors
- 📋 **Booking System** - Patient appointment booking with conflict validation
- 🛡️ **Security** - Rate limiting, CORS, and security headers
- 📊 **Database** - MySQL with Prisma ORM for type-safe database operations
- 🏗️ **Clean Architecture** - Repository pattern with service layer separation

## Docs
- melampirkan **Postman Collection** untuk pengujian API.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MySQL
- **ORM:** Prisma
- **Security:** Helmet, CORS, Rate Limiting

## Quick Start

### Prerequisites

Make sure you have the following installed:
- Node.js 
- MySQL Server
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd doctor-booking-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/doctor_booking"
   JWT_SECRET="your-secret-key"
   PORT=8000
   ```

4. **Database setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Migrate schema to database
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Base URL: `http://localhost:8000/api`

### 🏥 Doctors
- `POST /api/doctors` - Create a new doctor
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors?type=GIGI` - Get doctors by type (GIGI, KECANTIKAN, UMUM)

### 📅 Schedules
- `POST /api/schedules` - Create doctor schedule
- `GET /api/schedules` - Get all schedules
- `GET /api/schedules?doctorId=1` - Get schedules for specific doctor

### 📋 Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings

### 💊 Health Check
- `GET /health` - Check server status

## Project Structure

```
src/
├── config/
│   └── database.ts          # Prisma client configuration
├── controllers/
│   ├── doctorController.ts   # Doctor endpoint handlers
│   ├── scheduleController.ts # Schedule endpoint handlers
│   └── bookingController.ts  # Booking endpoint handlers
├── services/
│   ├── doctorService.ts      # Doctor business logic
│   ├── scheduleService.ts    # Schedule business logic
│   └── bookingService.ts     # Booking business logic
├── repositories/
│   ├── doctorRepository.ts   # Doctor data access
│   ├── scheduleRepository.ts # Schedule data access
│   └── bookingRepository.ts  # Booking data access
├── routes/
│   ├── doctorRoutes.ts       # Doctor route definitions
│   ├── scheduleRoutes.ts     # Schedule route definitions
│   └── bookingRoutes.ts      # Booking route definitions
├── middleware/
│   ├── errorHandler.ts       # Global error handling
│   └── rateLimiter.ts        # Rate limiting configuration
├── utils/
│   ├── responseHandler.ts    # Standardized API responses
│   └── dateHelper.ts         # Date/time utilities
├── types/
│   └── index.ts              # TypeScript type definitions
├── app.ts                    # Express app configuration
```

## Database Schema

### Doctor Types
- `GIGI` - Dentist
- `KECANTIKAN` - Beauty/Cosmetic Doctor  
- `UMUM` - General Practitioner

### Tables
- **doctors** - Doctor information and specializations
- **schedules** - Doctor practice schedules by day
- **bookings** - Patient appointment bookings

## Validation Rules

### Doctor Creation
- Name must be unique
- Type must be one of: GIGI, KECANTIKAN, UMUM

### Schedule Creation
- Doctor must exist
- Time format: HH:MM (24-hour)
- Open time must be before close time
- One schedule per doctor per day

### Booking Creation
- All fields required
- Valid phone number format (Indonesian)
- Booking date cannot be in the past
- Doctor must have schedule for the booking day
- Booking time must be within doctor's schedule
- No conflicting bookings allowed

## Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server

# Database
npm run db:generate # Generate Prisma client
npm run db:push     # Push schema changes to database
npm run db:migrate  # Run database migrations
npm run db:studio   # Open Prisma Studio (database GUI)
```

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

## Security Features

- **Rate Limiting** - Prevents API abuse
- **CORS** - Cross-origin resource sharing configuration
- **Helmet** - Security headers
- **Input Validation** - Prevents malicious data
- **SQL Injection Protection** - Through Prisma ORM

## Health Check

Check if the API is running:
```http
GET /health
```

Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-07-30T10:30:00.000Z"
}
```

**Made with ❤️ using Node.js, Express, TypeScript, and Prisma**