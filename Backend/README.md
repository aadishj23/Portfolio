# Portfolio Backend API

This is the backend API for Aadish Jain's portfolio website, built with Express.js, TypeScript, and MongoDB.

## Features

- **Contact Form API**: Handles contact form submissions from the portfolio website
- **MongoDB Integration**: Uses Mongoose for database operations
- **Email Notifications**: Automatically sends you email notifications for new contact messages
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
   EMAIL_USER=your_email@gmail.com
   EMAIL_APP_PASSWORD=your_email_app_password
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

## Email Setup

### Gmail Setup (Recommended)
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in your `EMAIL_APP_PASSWORD` environment variable

### Other Email Providers
You can modify the `emailService.ts` file to use other email services like:
- Outlook/Hotmail
- Yahoo
- Custom SMTP servers

### Environment Variables
- `EMAIL_USER`: Your email address
- `EMAIL_APP_PASSWORD`: Your email app password (not your regular password)

## CORS Configuration

CORS is enabled to allow requests from the frontend portfolio website.
