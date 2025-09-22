# Plans For Today

A simple, beautiful whiteboard app for daily planning. No subscriptions, no cloud sync, no complexity - just a digital whiteboard that helps you focus on what matters today.

## 🎨 Features

- **Natural Input** - Click anywhere and start typing
- **Handwritten Fonts** - 6 beautiful fonts to match your mood
- **Strike to Complete** - Draw through tasks to mark them done
- **Daily Boards** - Each day gets its own space
- **Drawing Mode** - Sketch and annotate freely
- **Privacy First** - Your data stays on your computer

## 📁 Project Structure

This is a monorepo containing:

```
apps/
├── electron-app/    # Desktop application (Electron + React)
└── landing-page/    # Marketing website (Astro)
```

## 🚀 Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Install dependencies
npm install

# Run both app and website in development
npm run dev

# Run only the desktop app
npm run dev:app

# Run only the website
npm run dev:web
```

## 📦 Building

```bash
# Build everything
npm run build

# Build only the desktop app
npm run build:app

# Build only the website
npm run build:web
```

## 🎯 Distribution

The desktop app builds to:
- `apps/electron-app/release/` - Contains DMG and ZIP files for macOS

The website builds to:
- `apps/landing-page/dist/` - Static files ready for deployment

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with simplicity in mind.