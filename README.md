# 🚀 Aadish's Portfolio - Full Stack Developer Portfolio

A modern, interactive developer portfolio with a terminal-inspired design, built as a single **Next.js (App Router)** application — the UI, the contact-form API, MongoDB persistence, and email notifications all live in one codebase and deploy as one app.

## Website
- https://aadishjain.dev/

## ✨ Project Overview

Previously a split Vite frontend + Express backend, the project is now a unified Next.js app:
- **Frontend** — interactive React UI (client components) with a terminal interface and smooth animations
- **API** — a Next.js Route Handler at `/api/contact` for contact-form handling, persistence, and email notifications

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
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout — SEO metadata + JSON-LD
│   │   ├── page.tsx               # Home route (renders HomePage)
│   │   ├── not-found.tsx          # 404 page
│   │   ├── globals.css            # Global styles & design tokens
│   │   ├── experience/pw/page.tsx # Physics Wallah case-study page
│   │   └── api/
│   │       └── contact/route.ts   # POST /api/contact (Mongoose + Resend)
│   ├── components/                # React components (client)
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── HomePage.tsx           # Composes all sections + boot sequence
│   │   ├── Terminal.tsx           # Interactive terminal
│   │   ├── WelcomeScreen.tsx      # Boot sequence
│   │   ├── ProjectsSection.tsx    # Projects showcase
│   │   ├── JourneySection.tsx     # Learning timeline
│   │   ├── WorkExperienceSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── StackSection.tsx
│   │   ├── PersonalSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FloatingNavbar.tsx
│   │   └── ScrollProgressBar.tsx
│   ├── contexts/                  # React contexts (BootContext)
│   ├── hooks/                     # Custom hooks
│   ├── lib/                       # Server + shared utilities
│   │   ├── mongodb.ts             # Cached Mongoose connection
│   │   ├── models/Contact.ts      # Contact model
│   │   ├── emailService.ts        # Resend email service
│   │   └── utils.ts               # cn() + helpers
│   ├── types/                     # TypeScript type definitions
│   └── assets/                    # Images and static imports
├── public/                        # Static assets (favicon, robots.txt)
├── next.config.mjs                # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
├── tsconfig.json                  # TypeScript configuration
├── components.json                # shadcn/ui configuration
└── README.md                      # This file
```

## 🎯 Key Features

### UI
- **Interactive Terminal Interface** - Command-line style navigation
- **Boot Sequence Animation** - Retro computer startup experience
- **Smooth Scroll Navigation** - Snap-scrolling between sections
- **Responsive Design** - Optimized for all device sizes
- **Project Showcase** - Interactive project cards with metrics
- **Skills Visualization** - Proficiency levels and tech stack
- **Journey Timeline** - Learning and career progression
- **PW Case Study** - Dedicated `/experience/pw` deep-dive page
- **Contact Form** - Interactive contact system

### API
- **Contact Form Route Handler** - `POST /api/contact`
- **Email Notifications** - Automatic alerts via Resend
- **MongoDB Integration** - Persistence via Mongoose (connection cached for serverless)
- **Input Validation** - Email + message validation

## 🛠️ Technology Stack

- **Next.js 14 (App Router)** - React framework, routing, and API routes
- **React 18.3** - Client components, hooks, and context
- **TypeScript 5.5** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui + Radix UI** - Accessible component primitives
- **Framer Motion** - Animations
- **MongoDB + Mongoose** - NoSQL database and ODM
- **Resend** - Transactional email

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **MongoDB** database (local or cloud)
- A **Resend** API key for email notifications

### Setup
```bash
npm install
# Create a .env file (see below)
npm run dev
```
Open `http://localhost:3000` in your browser.

### Environment Variables
Create a `.env` file at the project root (see `.env.example`):
```env
DATABASE_URL=mongodb://localhost:27017/portfolio
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
EMAIL_USER=your_email@example.com   # receives contact-form notifications
```

## 📱 Portfolio Sections

1. **Welcome Screen** - Boot sequence with app launcher
2. **Projects** - Development work showcase with metrics
3. **Journey** - Learning and career timeline
4. **Work Experience** - Professional background (links to PW case study)
5. **Skills** - Technical expertise visualization
6. **Stack** - Technology architecture
7. **Personal** - Development philosophy
8. **Contact** - Interactive contact form
9. **Terminal** - Floating command-line interface

## 🔧 Available Scripts

- `npm run dev` - Start the development server (`http://localhost:3000`)
- `npm run build` - Build for production
- `npm start` - Run the production build
- `npm run lint` - Lint with ESLint

## 🚀 Deployment

- **Vercel** - Recommended; deploys the full app (UI + API routes) in one project. Set the environment variables above in the project settings.

## 📊 API Endpoints

- `POST /api/contact` - Submit the contact form (body: `{ email, message }`)

---

*Built with ❤️ using Next.js, React, TypeScript, MongoDB, and Resend*
