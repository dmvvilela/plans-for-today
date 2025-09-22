/**
 * Plans For Today Brand Colors
 * These are the official colors used across all applications
 */

export const colors = {
  // Primary brand colors (from icon)
  yellow: "#F5C542",        // "PLANS" text
  orange: "#E47428",        // "FOR" / "4" text
  green: "#4CA64C",         // "TODAY" text
  darkGreen: "#2D6B2D",     // "TODAY" text outline/shadow

  // UI colors
  blueBorder: "#397C92",    // Whiteboard border
  darkBlue: "#1D3C47",      // Outermost border/outline
  markerBlue: "#4077A5",    // Top marker

  // Background colors
  whiteboard: "#F8F6ED",    // Board surface
  speckle: "#A9B7C5",       // Little dots/speckles

  // Text colors
  black: "#202020",         // Text outlines / face
  darkGray: "#666666",      // Secondary text

  // Additional UI colors
  white: "#FFFFFF",
  success: "#27ae60",
  error: "#e74c3c",
  warning: "#f39c12",
  info: "#3498db"
};

// Pen colors available in the app
export const penColors = [
  { name: "Navy", value: "#2c3e50" },
  { name: "Blue", value: "#3498db" },
  { name: "Green", value: "#27ae60" },
  { name: "Red", value: "#e74c3c" },
  { name: "Purple", value: "#8e44ad" },
  { name: "Orange", value: "#f39c12" }
];

// Font options
export const fonts = [
  { name: "Caveat", value: "caveat", family: "Caveat, cursive" },
  { name: "Kalam", value: "kalam", family: "Kalam, cursive" },
  { name: "Architects", value: "architect", family: "Architects Daughter, cursive" },
  { name: "Indie Flower", value: "indie", family: "Indie Flower, cursive" },
  { name: "Marker", value: "marker", family: "Permanent Marker, cursive" },
  { name: "Shadows", value: "shadows", family: "Shadows Into Light, cursive" }
];

export default colors;