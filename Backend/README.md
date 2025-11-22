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
- **Resend 4.0.0** - Email API service (SMTP-free)
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
   RESEND_API_KEY=re_your_resend_api_key
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   EMAIL_USER=your_email@gmail.com
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

### Resend API Setup
This backend uses **Resend** API service for email delivery, which is perfect for cloud hosting environments (like DigitalOcean) that block SMTP ports.

1. **Create a Resend Account**:
   - Go to [resend.com](https://resend.com)
   - Sign up for a free account
   - Navigate to API Keys section

2. **Get Your API Key**:
   - Create a new API key in the Resend dashboard
   - Copy the API key (starts with `re_`)

3. **Verify Your Domain** (Recommended):
   - Add and verify your domain in Resend dashboard
   - This allows you to send from `noreply@yourdomain.com` or similar
   - Alternatively, you can use Resend's test domain for development

### Environment Variables
- `RESEND_API_KEY`: Your Resend API key (required)
- `RESEND_FROM_EMAIL`: The "from" email address (must be verified in Resend)
- `EMAIL_USER`: Your email address (where notifications will be sent)

### Benefits of Resend
- ✅ No SMTP configuration needed
- ✅ Works on cloud platforms that block SMTP
- ✅ Simple API-based email delivery
- ✅ Built-in email analytics
- ✅ Free tier available

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
├── package-lock.json        # Lock file for dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # Backend documentation
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
- `RESEND_API_KEY` - Resend API key for email service
- `RESEND_FROM_EMAIL` - Verified "from" email address in Resend
- `EMAIL_USER` - Email address where notifications will be sent

### Production Commands
```bash
npm run build
npm start
```

*Built with ❤️ using Express.js, TypeScript, and MongoDB*
