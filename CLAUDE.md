# CLAUDE ASSISTANT INSTRUCTIONS

## ⛔ IMPORTANT RULES

1. **NEVER COMMIT CODE** - Do NOT run `git commit` unless explicitly asked by the user
2. **NEVER START SERVERS** - Do NOT run `npm run dev`, `npm start`, or any server commands unless explicitly requested
3. **ASK BEFORE MAJOR ACTIONS** - Always confirm with the user before:
   - Making commits
   - Starting/stopping servers
   - Deleting files
   - Major refactoring

## 📁 PROJECT STRUCTURE

```
PlansForToday/
├── apps/                          # Application packages
│   ├── electron-app/              # Desktop application (Electron + React)
│   │   ├── electron/              # Electron main/preload scripts
│   │   ├── src/                   # React source code
│   │   │   ├── components/        # React components
│   │   │   ├── store/            # Zustand state management
│   │   │   └── utils/            # Utility functions
│   │   ├── public/               # Static assets
│   │   ├── release/              # Built applications (generated)
│   │   └── package.json          # App dependencies
│   │
│   └── landing-page/             # Marketing website (Astro)
│       ├── src/
│       │   ├── components/       # Astro components
│       │   ├── layouts/          # Page layouts
│       │   └── pages/            # Page routes
│       ├── public/               # Static assets
│       └── package.json          # Website dependencies
│
├── packages/                      # Shared packages
│   └── assets/                   # Shared branding assets
│       ├── logos/                # Logo files
│       ├── icons/                # App icons
│       ├── screenshots/          # Marketing screenshots
│       └── colors.js             # Brand color palette
│
├── package.json                  # Root monorepo configuration
├── README.md                     # Project documentation
├── CLAUDE.md                     # This file - AI assistant instructions
└── .gitignore                    # Git ignore rules
```

## 🎨 BRAND COLORS

```javascript
const colors = {
  yellow: "#F5C542",        // "PLANS" text
  orange: "#E47428",        // "FOR" text
  green: "#4CA64C",         // "TODAY" text
  darkGreen: "#2D6B2D",     // Text shadows
  blueBorder: "#397C92",    // Whiteboard border
  darkBlue: "#1D3C47",      // Outer border
  markerBlue: "#4077A5",    // Marker color
  whiteboard: "#F8F6ED",    // Board surface
  speckle: "#A9B7C5",       // Decorative dots
  black: "#202020"          // Text/outlines
};
```

## 📝 AVAILABLE SCRIPTS

From root directory:
- `npm run dev:app` - Run Electron app in development
- `npm run dev:web` - Run landing page in development
- `npm run build:app` - Build Electron app for distribution
- `npm run build:web` - Build landing page for deployment

## 🛠 TECHNOLOGY STACK

- **Monorepo**: NPM workspaces
- **Desktop App**: Electron + React + Konva.js + Zustand
- **Landing Page**: Astro + Tailwind CSS
- **Build Tools**: Vite, electron-builder

## 💡 KEY FEATURES

1. **Whiteboard-style todo app**
2. **Handwritten fonts** (6 options)
3. **Natural input** - Click anywhere and type
4. **Strike to complete** - Draw through tasks
5. **Drawing mode** - Freeform annotations
6. **Daily boards** - Separate board for each day
7. **Local storage** - Privacy-first, no cloud

## 🚨 REMINDERS

- Always read files before editing them
- Preserve code style and conventions
- Test changes locally (but don't start servers without permission)
- Keep the minimalist, simple philosophy of the app
- No unnecessary features or complexity