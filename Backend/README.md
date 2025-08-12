# Portfolio Backend API

This is the backend API for Aadish Jain's portfolio website, built with Express.js, TypeScript, and MongoDB.

## Features

- **Contact Form API**: Handles contact form submissions from the portfolio website
- **MongoDB Integration**: Uses Mongoose for database operations
- **TypeScript**: Full TypeScript support with proper type definitions
- **CORS Enabled**: Configured for frontend integration

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory with:
   ```env
   PORT=5500
   DATABASE_URL=your_mongodb_connection_string
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build and Run Production**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### POST /api/contact
Submit a contact form message.

**Request Body:**
```json
{
  "email": "user@example.com",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact message sent successfully!",
  "data": {
    "id": "contact_id",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/contact
Get all contact messages (for admin purposes).

## Database Schema

The Contact model includes:
- `email`: User's email address (required, validated)
- `message`: Contact message content (required)
- `createdAt`: Timestamp of submission (auto-generated)

## Error Handling

The API includes comprehensive error handling for:
- Missing required fields
- Invalid email format
- Database connection issues
- Server errors

## CORS Configuration

CORS is enabled to allow requests from the frontend portfolio website.
