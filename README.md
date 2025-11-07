# AgriNova360

A modern React + Vite + Tailwind CSS application for agricultural management, featuring smart farming tools, marketplace, and AI-powered crop advisory.

## Features

- 🌾 **Smart Farming Dashboard** - Monitor crops and sensor data
- 🛒 **Marketplace** - Buy and sell agricultural products
- 🤖 **AI Crop Advisor** - Get personalized farming recommendations
- 📊 **Analytics Dashboard** - Track farm performance and metrics
- 💬 **AI Chatbot** - 24/7 farming assistance
- 👥 **User Roles** - Separate dashboards for farmers and customers

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── pages/
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── FarmerDashboard.jsx
│   ├── CustomerDashboard.jsx
│   ├── Marketplace.jsx
│   ├── CropAdvisor.jsx
│   ├── Analytics.jsx
│   └── Chatbot.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── CropCard.jsx
│   └── SensorCard.jsx
├── assets/ (for logos/images)
├── App.jsx
└── main.jsx
```

## Color Theme

The project uses a desert-themed color palette:

- **Desert Beige** (`#F5E6D3`) - Background
- **Desert Sandy** (`#E8D5B7`) - Secondary background
- **Desert Tan** (`#D4C4A8`) - Accent
- **Desert Green** (`#8B9A5B`) - Primary actions
- **Desert Green Dark** (`#6B7A4A`) - Hover states
- **Desert Gold** (`#D4AF37`) - Highlights
- **Desert Gold Dark** (`#B8941F`) - Gold hover states

## Available Routes

- `/` - Landing page
- `/login` - Login page
- `/signup` - Sign up page
- `/farmer-dashboard` - Farmer dashboard
- `/customer-dashboard` - Customer dashboard
- `/marketplace` - Product marketplace
- `/crop-advisor` - AI crop advisor
- `/analytics` - Analytics dashboard
- `/chatbot` - AI chatbot assistant

## License

MIT
