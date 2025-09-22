# @plans-for-today/assets

Shared assets for Plans For Today applications.

## Structure

```
assets/
├── logos/          # Logo variations (SVG, PNG)
├── icons/          # App icons for different platforms
├── screenshots/    # App screenshots for marketing
└── colors.js       # Brand color palette
```

## Logo Files

Place in `logos/`:
- `logo.svg` - Main logo (vector)
- `logo.png` - Main logo (raster, 1024x1024)
- `logo-text.svg` - Logo with text
- `logo-icon.svg` - Icon only version

## Icon Sizes

Place in `icons/`:

### macOS
- `icon.icns` - macOS app icon
- `icon-512.png` - 512x512
- `icon-256.png` - 256x256
- `icon-128.png` - 128x128

### Windows
- `icon.ico` - Windows app icon
- `icon-256.png` - 256x256

### Web
- `favicon.svg` - Scalable favicon
- `favicon-32.png` - 32x32
- `favicon-16.png` - 16x16
- `apple-touch-icon.png` - 180x180

## Color Palette

Import the color palette in your app:

```javascript
import { colors, penColors, fonts } from '@plans-for-today/assets/colors';
```

## Usage

In your apps, you can reference assets:

```javascript
// In electron-app
import logo from '@plans-for-today/assets/logos/logo.svg';

// In landing-page
import { colors } from '@plans-for-today/assets/colors';
```