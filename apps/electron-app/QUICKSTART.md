# Plans for Today - Quick Start Guide

## 🚀 Running the App

### Development Mode
```bash
npm run electron:dev
```

### Build for Production
```bash
npm run electron:build
```

## ✨ Features

- **Handwritten Feel**: 3 different handwriting fonts (Caveat, Kalam, Architect)
- **Color Options**: 6 preset colors for your pen
- **Simple Input**: Just start typing to add a plan
- **Mark Complete**: Draw a line through items with your mouse to mark them done
- **Local Storage**: Your plans are automatically saved locally
- **Clean UI**: Minimalist whiteboard interface

## 🎯 How to Use

1. **Add Plans**: Just start typing anywhere - a text box will appear
2. **Submit**: Press Enter to add the plan to your board
3. **Complete**: Use your mouse to draw a line through completed items
4. **Change Style**: Use the bottom controls to switch fonts and colors
5. **Clear**: Click the trash icon to remove completed items

## 🛠 Tech Stack

- Electron + React + Vite
- Konva.js for canvas rendering
- Zustand for state management
- Lucide React for icons

## 📦 Building Distributable

To create a distributable app:
```bash
npm run dist
```

This will create an installer in the `release` folder.