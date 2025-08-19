# 🎨 Portfolio Frontend

A modern, interactive developer portfolio built with **React 18**, **TypeScript**, and **Tailwind CSS**. Features a unique terminal-inspired design with interactive elements, smooth animations, and a comprehensive showcase of projects and skills.

## ✨ Features

### 🎯 Core Features
- **Interactive Terminal Interface** - Command-line style navigation and project execution
- **Boot Sequence Animation** - Retro computer boot-up experience with typing effects
- **Smooth Scroll Navigation** - Snap-scrolling between sections
- **Responsive Design** - Optimized for all device sizes

### 🎮 Interactive Elements
- **Floating Terminal** - Accessible from any section with project commands
- **Project Execution** - Run projects directly from the terminal
- **Interactive Cards** - Hover effects and smooth transitions
- **Back to Top Button** - Smooth navigation helper

### 📱 Sections
1. **Welcome Screen** - Boot sequence with app launcher and floating geometric shapes
2. **Projects** - Showcase of development work with interactive status indicators
3. **Journey** - Learning and development timeline with detailed stories and achievements
4. **Work Experience** - Professional background with impact metrics and technologies
5. **Skills** - Technical expertise with proficiency levels and project usage
6. **Stack** - Technology architecture with layered visualization and reasoning
7. **Personal** - Development philosophy, motivation, and personal insights
8. **Contact** - Interactive contact form with smart suggestions and social links
9. **Terminal** - Floating command-line interface accessible from any section

## 🛠️ Technology Stack

### Core Framework
- **React 18.3.1** - Latest React with hooks and context
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.1** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, customizable components
- **Radix UI** - Accessible component primitives
- **Lucide React 0.462.0** - Modern icon library


## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** 
- **npm** or **yarn** package manager

### Installation

1. **Clone and Navigate**
   ```bash
   cd Frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/              # React components
│   │   ├── ui/                 # Shadcn/ui components
│   │   │   ├── badge.tsx       # Badge component
│   │   │   ├── button.tsx      # Button component
│   │   │   ├── card.tsx        # Card component
│   │   │   ├── input.tsx       # Input component
│   │   │   ├── sonner.tsx      # Sonner toast component
│   │   │   ├── textarea.tsx    # Textarea component
│   │   │   ├── toast.tsx       # Toast notifications
│   │   │   ├── toaster.tsx     # Toaster component
│   │   │   ├── tooltip.tsx     # Tooltip component
│   │   │   └── x-logo.tsx      # X logo component
│   │   ├── Terminal.tsx        # Interactive terminal
│   │   ├── WelcomeScreen.tsx   # Boot sequence
│   │   ├── ProjectsSection.tsx # Projects showcase
│   │   ├── JourneySection.tsx  # Learning timeline
│   │   ├── WorkExperienceSection.tsx # Work history
│   │   ├── SkillsSection.tsx   # Skills showcase
│   │   ├── StackSection.tsx    # Tech stack
│   │   ├── PersonalSection.tsx # Personal insights
│   │   ├── ContactSection.tsx  # Contact form
│   │   ├── FloatingNavbar.tsx  # Floating navigation
│   │   └── ScrollProgressBar.tsx # Scroll progress indicator
│   ├── contexts/               # React contexts
│   │   └── BootContext.tsx     # Boot sequence state
│   ├── hooks/                  # Custom hooks
│   │   ├── use-mobile.tsx      # Mobile detection
│   │   └── use-toast.ts        # Toast notifications
│   ├── lib/                    # Utility functions
│   │   └── utils.ts            # Common utilities
│   ├── pages/                  # Page components
│   │   ├── index.tsx           # Main portfolio page
│   │   └── NotFound.tsx        # 404 page
│   ├── types/                  # TypeScript type definitions
│   │   └── global.d.ts         # Global type declarations
│   ├── App.css                 # Main application styles
│   ├── App.tsx                 # Main App component
│   ├── index.css               # Global styles
│   ├── main.tsx                # Application entry point
│   └── assets/                 # Images and static files
│       └── hero-terminal.jpeg  # Hero image
├── public/                     # Public assets
│   ├── favicon.png             # Site favicon
│   └── robots.txt              # SEO robots file
├── components.json             # Shadcn/ui configuration
├── eslint.config.js            # ESLint configuration
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.app.json           # TypeScript app configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.node.json          # TypeScript node configuration
├── vite.config.ts              # Vite configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Terminal Theme**: Dark backgrounds with neon accents
- **Electric Blue**: Primary accent color for highlights and interactions
- **Neon Green**: Secondary accent for success states and secondary elements
- **Hot Pink**: Tertiary accent for emphasis and special elements
- **Pastel Variants**: Subtle color variations for backgrounds and subtle elements

### Animations & Interactions
- **Smooth Transitions**: 300ms ease-in-out for all interactive elements
- **Floating Elements**: Subtle hover animations with transform effects
- **Scroll Animations**: Intersection observer effects for section reveals
- **Boot Sequence**: Typing animation effects with character-by-character display
- **Scroll Snap**: Smooth section-to-section navigation

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production

## 🌟 Key Features in Detail

### Terminal Interface
The portfolio features a fully functional terminal that allows users to:
- Execute project commands (`run-labeasy`, `run-quizzical`, etc.)
- Navigate through different sections
- View project information and links
- Experience a command-line interface
- Access from any section with floating design

### Boot Sequence
An engaging boot sequence that:
- Simulates computer startup with retro aesthetics
- Shows loading messages with typing animation
- Transitions smoothly to the main interface
- Creates an immersive experience with floating geometric shapes

### Project Showcase
Each project includes:
- Detailed descriptions with impact metrics
- Technology stack and status indicators
- Live and GitHub links
- Interactive cards with hover effects
- Performance metrics (uptime, users served, etc.)

### Journey & Experience
Comprehensive timeline featuring:
- Learning milestones from March 2023 to present
- Work experience at Physics Wallah and Appzlogic
- Leadership roles at Anveshan technical club
- Hackathon achievements and freelance projects
- Skills development progression

### Skills & Stack
Interactive skills showcase with:
- Proficiency levels (1-5 scale)
- Experience duration and project usage
- Categorized skills (Languages, Frameworks, Database, DevOps)
- Architecture visualization with layered approach
- Technology reasoning and connections

### Personal Insights
Personal section featuring:
- Development philosophy and coding principles
- Motivation and drive for building solutions
- Leadership experience and team management
- Continuous learning approach
- Balance between code and personal interests

### Contact & Interaction
Advanced contact system with:
- Smart message suggestions
- Interactive form with validation
- Social media integration
- Professional networking links
- Quick action buttons

### Responsive Design
- Mobile-first approach with touch optimization
- Smooth scroll-snap navigation
- Custom cursor interactions
- Floating terminal for mobile access
- Optimized for all screen sizes

*Built with ❤️ using React, TypeScript, and Tailwind CSS*
