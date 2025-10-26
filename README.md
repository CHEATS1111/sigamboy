# IDIRENT-CHEATS - Next.js Website

A beautiful, modern website with a red color theme built with Next.js and Tailwind CSS. Features automatic language detection (Russian/English) based on user's browser settings.

## Features

- 🌍 Automatic language detection (Russian/English)
- 🎨 Modern and beautiful red-themed design
- 📱 Fully responsive across all devices
- ⚡ Fast performance with Next.js
- 🎯 Smooth scrolling navigation
- 💫 Beautiful animations and transitions
- 📄 Terms of Agreement page
- 🌙 Dark theme optimized

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with blurred top bar
│   ├── page.tsx         # Home page
│   ├── globals.css      # Global styles
│   └── terms/
│       └── page.tsx     # Terms of Agreement page
├── components/
│   ├── Navbar.tsx       # Navigation bar
│   ├── Hero.tsx         # Hero section
│   ├── Features.tsx     # Features section
│   ├── About.tsx        # About section
│   └── Footer.tsx       # Footer
├── contexts/
│   └── LanguageContext.tsx  # Language context provider
├── lib/
│   └── i18n.ts          # Internationalization translations
├── public/              # Static assets
└── package.json         # Dependencies
```

## Build for Production

```bash
npm run build
npm start
```

## Customization

- Edit colors in `tailwind.config.js` to change the theme
- Modify components in the `components/` directory
- Update content in each component file

## Technologies Used

- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **React** - UI library

## License

This project is open source and available under the MIT License.

