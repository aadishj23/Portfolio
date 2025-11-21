# 🚀 Aadish's Portfolio - Full Stack Developer Portfolio

A modern, interactive full-stack developer portfolio featuring a React frontend with terminal-inspired design and a Node.js backend API. Built with cutting-edge technologies and featuring smooth animations, interactive elements, and comprehensive project showcases.

## Website
- https://aadishjain.dev/

## ✨ Project Overview

This portfolio consists of two main components:
- **Frontend**: Interactive React portfolio with terminal interface and smooth animations
- **Backend**: Express.js API for contact form handling and email notifications

## 📸 Sections

### Welcome Screen
![Welcome Screen](https://drive.google.com/uc?id=17r7wwGM4wQkvd3VyjM6ZuiilbE13zFhj)

### Projects Section
![Projects Section](https://drive.google.com/uc?id=1X9FAxFrbZrjUz2DusPbzWsYxGDPQ5ihZ)

### Journey Timeline
![Journey Timeline](https://drive.google.com/uc?id=1viNS6riT9hUikssg9nENSrvFPbbOJQMf)

### Work Experience
![Work Experience](https://drive.google.com/uc?id=1Xfth79ETzFIxBtO8xM2lG4JDjxLYTYhk)

### Skills Section
![Skills](https://drive.google.com/uc?id=1pNzrGtqmdxlkWRPzfFcSAQ-gv9iZhqSn)

### Stack Section
![Stack](https://drive.google.com/uc?id=1fWlwK1IjHaiQ6guKnbuZNXPJ5p9yh2cI)

### Personal Section
![Personal Section](https://drive.google.com/uc?id=1HfOJamcGPi1BUt8PUPpbYG0DFcW2cb7F)

### Contact Form
![Contact Form](https://drive.google.com/uc?id=18H0lxDHvtsX4cQ3zLwK6mjqjofQQEVrT)

### Terminal Interface
![Terminal Interface](https://drive.google.com/uc?id=1wuDIBtph8dTxTacog03rW98s8CU97jYA)


## 🏗️ Architecture

```
Portfolio/
├── Frontend/                    # React + TypeScript + Tailwind CSS
│   ├── src/                    # Source code
│   │   ├── components/         # React components
│   │   │   ├── ui/            # Shadcn/ui components
│   │   │   ├── Terminal.tsx   # Interactive terminal
│   │   │   ├── WelcomeScreen.tsx # Boot sequence
│   │   │   ├── ProjectsSection.tsx # Projects showcase
│   │   │   ├── JourneySection.tsx # Learning timeline
│   │   │   ├── WorkExperienceSection.tsx # Work history
│   │   │   ├── SkillsSection.tsx # Skills showcase
│   │   │   ├── StackSection.tsx # Tech stack
│   │   │   ├── PersonalSection.tsx # Personal insights
│   │   │   ├── ContactSection.tsx # Contact form
│   │   │   ├── FloatingNavbar.tsx # Floating navigation
│   │   │   └── ScrollProgressBar.tsx # Scroll progress indicator
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom hooks
│   │   ├── lib/                # Utility functions
│   │   ├── pages/              # Page components
│   │   ├── types/              # TypeScript type definitions
│   │   ├── App.css             # Main application styles
│   │   ├── App.tsx             # Main App component
│   │   ├── index.css           # Global styles
│   │   ├── main.tsx            # Application entry point
│   │   └── assets/             # Images and static files
│   ├── public/                 # Static assets
│   ├── tailwind.config.ts      # Tailwind configuration
│   ├── vite.config.ts          # Vite configuration
│   └── package.json            # Frontend dependencies
├── Backend/                     # Express.js + TypeScript + MongoDB
│   ├── config/                 # Database configuration
│   ├── models/                 # Data models
│   ├── routes/                 # API endpoints
│   ├── services/               # Business logic
│   ├── index.ts                # Main server file
│   ├── package.json            # Backend dependencies
│   ├── tsconfig.json           # TypeScript configuration
└── README.md                    # This file
```

## 🎯 Key Features

### Frontend Features
- **Interactive Terminal Interface** - Command-line style navigation
- **Boot Sequence Animation** - Retro computer startup experience
- **Smooth Scroll Navigation** - Snap-scrolling between sections
- **Responsive Design** - Optimized for all device sizes
- **Project Showcase** - Interactive project cards with metrics
- **Skills Visualization** - Proficiency levels and tech stack
- **Journey Timeline** - Learning and career progression
- **Contact Form** - Interactive contact system

### Backend Features
- **Contact Form API** - Handle form submissions
- **Email Notifications** - Automatic email alerts
- **MongoDB Integration** - Data persistence
- **Input Validation** - Comprehensive field validation
- **CORS Support** - Frontend integration ready
- **TypeScript** - Type-safe development

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and context
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.1** - Fast build tool and dev server
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, customizable components
- **Radix UI** - Accessible component primitives

### Backend
- **Express.js 5.1.0** - Latest Express framework
- **TypeScript 5.9.2** - Type-safe development
- **MongoDB** - NoSQL database with Mongoose ODM
- **Node.js** - Runtime environment
- **Nodemailer** - Email functionality

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **MongoDB** database (local or cloud)
- **npm** or **yarn** package manager

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### Backend Setup
```bash
cd Backend
npm install
# Create .env file with your configuration
npm run dev
```
Backend will run on `http://localhost:5500`.

### Environment Variables (Backend)
Create a `.env` file in the Backend directory:
```env
PORT=5500
DATABASE_URL=mongodb://localhost:27017/portfolio
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_email_app_password
```

## 📱 Portfolio Sections

1. **Welcome Screen** - Boot sequence with app launcher
2. **Projects** - Development work showcase with metrics
3. **Journey** - Learning and career timeline
4. **Work Experience** - Professional background
5. **Skills** - Technical expertise visualization
6. **Stack** - Technology architecture
7. **Personal** - Development philosophy
8. **Contact** - Interactive contact form
9. **Terminal** - Floating command-line interface

## 🌟 Interactive Elements

- **Floating Terminal** - Accessible from any section
- **Project Commands** - Execute projects from terminal
- **Smooth Animations** - Hover effects and transitions
- **Scroll Snap** - Section-to-section navigation
- **Boot Sequence** - Typing animation effects

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production


### Backend
- `npm run dev` - Start development server
- `npm run build` - Compile TypeScript
- `npm start` - Build and run production

## 🚀 Deployment

### Frontend
- **Vercel** - Automatic deployment


### Backend

- **Render** - Free tier available
- **Heroku** - Traditional choice

## 📊 API Endpoints

- `GET /` - Health check
- `POST /api/contact` - Submit contact form








*Built with ❤️ using React, TypeScript, Express.js, and MongoDB*
