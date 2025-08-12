# 🚀 Portfolio Backend API

A robust backend API for Aadish Jain's portfolio website, built with **Express.js 5**, **TypeScript**, and **MongoDB**. Features a contact form API with email notifications and comprehensive error handling.

## ✨ Features

- **Contact Form API** - Handles contact form submissions with validation
- **MongoDB Integration** - Uses Mongoose 8 for database operations
- **Email Notifications** - Automatic email alerts for new contact messages
- **TypeScript Support** - Full type safety with proper type definitions
- **CORS Enabled** - Configured for seamless frontend integration
- **Environment Configuration** - Secure environment variable management
- **Error Handling** - Comprehensive error handling and validation

## 🛠️ Technology Stack

### Core Dependencies
- **Express.js 5.1.0** - Latest Express framework with enhanced features
- **TypeScript 5.9.2** - Type-safe development environment
- **MongoDB** - NoSQL database with Mongoose ODM
- **Node.js** - Runtime environment

### Key Packages
- **Mongoose 8.17.1** - MongoDB object modeling
- **Nodemailer 7.0.5** - Email functionality
- **CORS 2.8.5** - Cross-origin resource sharing
- **Axios 1.11.0** - HTTP client for external requests
- **Dotenv 17.2.1** - Environment variable management

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** 
- **MongoDB** database (local or cloud)
- **npm** or **yarn** package manager

### Installation

1. **Clone and Navigate**
   ```bash
   cd Backend
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the Backend directory:
   ```env
   PORT=5500
   DATABASE_URL=mongodb://localhost:27017/portfolio
   EMAIL_USER=your_email@gmail.com
   EMAIL_APP_PASSWORD=your_email_app_password
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## 📡 API Endpoints

### Base URL
```
http://localhost:5500
```

### Health Check
```
GET /
Response: { "message": "Hello from Aadish Jain" }
```

### Contact Form
```
POST /api/contact
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Contact message sent successfully!",
  "data": {
    "id": "contact_id",
    "email": "user@example.com",
    "message": "Hello, I'd like to discuss a project...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Email is required", "Message is required"]
}
```


## 🗄️ Database Schema

### Contact Model
```typescript
interface Contact {
  email: string;        // Required, validated email format
  message: string;      // Required, contact message content
  createdAt: Date;      // Auto-generated timestamp
  _id: string;          // MongoDB ObjectId
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Build and run production server

## 📧 Email Configuration

### Gmail Setup (Recommended)
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate new app password for "Mail"
   - Use this password in `EMAIL_APP_PASSWORD`

### Environment Variables
- `EMAIL_USER`: Your email address
- `EMAIL_APP_PASSWORD`: Your email app password (not regular password)

### Other Email Providers
Modify `services/emailService.ts` to use:
- Outlook/Hotmail
- Yahoo
- Custom SMTP servers

## 🏗️ Project Structure

```
Backend/
├── config/
│   └── database.ts          # MongoDB connection configuration
├── models/
│   └── Contact.ts           # Contact data model
├── routes/
│   └── contact.ts           # Contact API endpoints
├── services/
│   └── emailService.ts      # Email notification service
├── index.ts                 # Main server file
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## 🔒 Security Features

- **Input Validation** - Comprehensive field validation
- **CORS Configuration** - Secure cross-origin requests
- **Environment Variables** - Secure credential management
- **Error Handling** - Safe error responses without sensitive data

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set in production:
- `PORT` - Server port (default: 3000)
- `DATABASE_URL` - MongoDB connection string
- `EMAIL_USER` - Email address for notifications
- `EMAIL_APP_PASSWORD` - Email app password

### Production Commands
```bash
npm run build
npm start
```

*Built with ❤️ using Express.js, TypeScript, and MongoDB*
