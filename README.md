# Business Website - WebStudio

A modern, bilingual (Hungarian/English) business website built with React, TypeScript, and Vite. Features a warm-orange theme, dark/light mode toggle, and optimized animations.

## Features

- 🌐 **Bilingual**: Hungarian (default) and English with easy toggle
- 🌓 **Dark/Light Mode**: Smooth theme switching with localStorage persistence
- 🎨 **Warm-Orange Theme**: Professional color palette that works in both themes
- ⚡ **Optimized Animations**: Eye-catching Framer Motion animations with performance optimization
- 📱 **Fully Responsive**: Mobile-first design approach
- ♿ **Accessible**: Respects prefers-reduced-motion and follows WCAG guidelines
- 🚀 **Fast**: Code splitting, lazy loading, and optimized build

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Framer Motion** - Animation library
- **react-i18next** - Internationalization
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer
│   ├── sections/        # Hero, Services, Process, Pricing, FAQ, Contact
│   ├── ui/              # shadcn components (Button, Card, Input, etc.)
│   └── common/          # ThemeToggle, LanguageToggle, AnimatedSection
├── contexts/            # ThemeContext, LanguageContext
├── locales/             # hu.json, en.json (translations)
├── lib/                 # utils, i18n config
├── types/               # TypeScript types
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Customization

### Colors

Edit the CSS variables in `src/index.css` to change the color scheme for both light and dark modes.

### Translations

Edit `src/locales/hu.json` and `src/locales/en.json` to update content.

### Contact Form

The contact form is currently a placeholder. To make it functional:

1. Set up a backend API or use a service like EmailJS, Formspree, etc.
2. Update the `handleSubmit` function in `src/components/sections/ContactSection.tsx`

## Performance Optimizations

- Code splitting with dynamic imports
- Lazy loading of route components
- Framer Motion's LazyMotion for reduced bundle size
- IntersectionObserver for scroll-triggered animations
- Optimized Tailwind CSS with purging unused styles
- Manual chunk splitting in Vite config

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Android)

## License

All rights reserved.

## Contact

- Email: info@webstudio.hu
- Phone: +36 30 123 4567
- Location: Budapest, Hungary

