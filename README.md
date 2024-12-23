# Booking System

A booking system built using NestJS for backend development. This application demonstrates JWT authentication and basic CRUD operations for managing bookings.

---

## Instructions to Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) or any other database of your choice.

### Steps to Run

1. **Clone the repository**  
   ```bash
   git clone <repository-url>
   cd booking-system
Install dependencies


npm install
Set up environment variables
Create a .env file in the root directory with the following variables:

env

MONGO_URI=mongodb+srv://admin:123qwe123@cluster0.cxsn6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-secret-key
Run migrations (if applicable)
Ensure your database is set up, then run migrations to apply the schema:

npm run migration:run
Start the development server


npm run start:dev
Access the API
Navigate to http://localhost:3000/api in your browser or use an API testing tool like Postman or cURL to test the endpoints.

Features
User Authentication

Login and signup functionality using JWT.
CRUD Operations for Bookings

Create, read, update, and delete bookings.
Modular Architecture

Separate modules for authentication and booking management.
Environment Variable Management

Configuration via .env file for easy setup and security.
Additional Notes

Ensure that your database connection string in the .env file is correct and that the database server is running before starting the application.
If you face issues with migrations, check the DATABASE_URL variable in .env.
This project assumes the use of PostgreSQL as the database. If you use another database, update the configuration accordingly.
For security, never commit your .env file or sensitive information to version control.
