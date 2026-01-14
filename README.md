# ☕ Compose Coffee - Frontend

A modern, responsive e-commerce frontend for Compose Coffee, built with React, TypeScript, and Vite.

![React](https://img.shields.io/badge/React-19.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-7.x-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-cyan)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, responsive design with TailwindCSS
- 🛒 **Shopping Cart** - Redux-powered cart with localStorage persistence
- 🔐 **Authentication** - Secure login/signup with JWT
- 📱 **Mobile Responsive** - Optimized for all screen sizes
- 🔍 **Product Search** - Real-time search and filtering
- 📦 **Order Management** - Track orders and order history
- 👤 **User Profile** - Manage profile, addresses, and payments
- ⭐ **Product Reviews** - View and submit product reviews
- 🎯 **Category Browsing** - Browse by coffee type, beverages, etc.
- 🚀 **Performance** - Code splitting and lazy loading
- 🎭 **Animations** - Smooth transitions with Framer Motion
- 🌐 **SEO Optimized** - Meta tags and semantic HTML

## 🛠️ Tech Stack

- **Framework:** React 19.x
- **Build Tool:** Vite 7.x
- **Language:** TypeScript 5.x
- **Styling:** TailwindCSS 4.x
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios
- **Icons:** Hugeicons React
- **UI Components:** Hero UI
- **Animations:** Framer Motion
- **Form Handling:** React Hook Form (optional)
- **Alerts:** SweetAlert2

## 📦 Prerequisites

- **Node.js** >= 20.19.0
- **npm** >= 10.0.0

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/compose-coffee-frontend.git
cd compose-coffee-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create `.env.development` and `.env.production` files:

```bash
cp .env.example .env.development
```

See [Environment Variables](#environment-variables) section for details.

### 4. Start development server

```bash
npm run dev
```

## 🔐 Environment Variables

### Development (`.env.development`)

```env
VITE_API_URL=http://localhost:3003
VITE_CURRENCY=₩
```

### Production (`.env.production`)

```env
VITE_API_URL=https://your-api.onrender.com
VITE_CURRENCY=₩
```

### Environment Variable Rules

- All Vite environment variables must be prefixed with `VITE_`
- Access in code: `import.meta.env.VITE_API_URL`
- Never commit `.env` files to git

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output directory: `dist/`

### Preview Production Build

```bash
npm run preview
```

Visit `http://localhost:4173`

### Available Scripts

| Script               | Description                      |
| -------------------- | -------------------------------- |
| `npm run dev`        | Start development server         |
| `npm run build`      | Build for production             |
| `npm run preview`    | Preview production build locally |
| `npm run lint`       | Run ESLint                       |
| `npm run type-check` | TypeScript type checking         |

## 🎨 Styling Guidelines

### TailwindCSS

- Use utility classes for styling
- Custom colors defined in `tailwind.config.js`
- Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`

### Theme Colors

```javascript
{
  main: "#e3b609",
  "main-text": "#2e2726",
  "main-dull": "#f0c754",
  border: "#e7e7e7"
}
```

### Example Usage

```tsx
<div className="bg-main hover:bg-main-dull text-main-text p-4 rounded-lg">
  Button
</div>
```

## 🚀 Deployment

### Deploying to Vercel

1. **Push to GitHub**

```bash
   git push origin main
```

2. **Import project in Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Configure build settings:**

   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Set environment variables:**

```
   VITE_API_URL=https://your-api.onrender.com
   VITE_CURRENCY=₩
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Products load correctly
- [ ] Cart add/remove works
- [ ] Checkout flow works
- [ ] User profile updates
- [ ] Address management
- [ ] Payment method management
- [ ] Order placement
- [ ] Responsive on mobile

## 🐛 Troubleshooting

### CORS Errors

```bash
# Backend ALLOWED_ORIGINS must include frontend URL
ALLOWED_ORIGINS=https://your-app.vercel.app
```

### Build Failures

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Working

```bash
# Must prefix with VITE_
VITE_API_URL=http://localhost:3003  ✅
API_URL=http://localhost:3003       ❌

# Restart dev server after changes
```

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Style

- Use TypeScript for all new files
- Follow React best practices
- Use functional components with hooks
- Use TailwindCSS for styling
- Add comments for complex logic

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- React team
- Vite team
- TailwindCSS
- Redux Toolkit
- All open source contributors

---

Made with ☕ and ⚛️ by Nabiev
