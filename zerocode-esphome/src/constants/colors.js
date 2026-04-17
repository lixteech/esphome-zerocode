/**
 * @fileoverview Professional color palette for ESPHome ZeroCode
 * Neutral, accessible colors without flashy gradients
 *
 * @module constants/colors
 */

/**
 * YAML syntax highlighting - subtle professional colors
 * @type {Object<string, string>}
 */
export const YAML_COLORS = {
  comment: "#6b7280",      // Gray 500
  key: "#2563eb",          // Blue 600
  colon: "#9ca3af",        // Gray 400
  string: "#059669",       // Emerald 600
  bool: "#7c3aed",         // Violet 600
  number: "#d97706",       // Amber 600
  plain: "#1f2937",        // Gray 800
  indent: "#d1d5db",         // Gray 300
  dash: "#dc2626",         // Red 600
};

/**
 * Board family colors - muted professional tones
 * @typedef {Object} FamilyColors
 * @property {string} pcb - PCB background
 * @property {string} chip - Chip color
 * @property {string} accent - Accent color
 * @property {string} glow - Glow effect
 */

export const FAMILY_COLORS = {
  "ESP32":    { pcb: "#374151", chip: "#1f2937", accent: "#3b82f6", glow: "#60a5fa" },
  "ESP32-S2": { pcb: "#374151", chip: "#1f2937", accent: "#6366f1", glow: "#818cf8" },
  "ESP32-S3": { pcb: "#374151", chip: "#1f2937", accent: "#8b5cf6", glow: "#a78bfa" },
  "ESP32-C3": { pcb: "#374151", chip: "#1f2937", accent: "#f59e0b", glow: "#fbbf24" },
  "ESP32-C6": { pcb: "#374151", chip: "#1f2937", accent: "#14b8a6", glow: "#2dd4bf" },
  "ESP32-H2": { pcb: "#374151", chip: "#1f2937", accent: "#ec4899", glow: "#f472b6" },
  "ESP8266":  { pcb: "#374151", chip: "#1f2937", accent: "#84cc16", glow: "#a3e635" },
  "ESP8285":  { pcb: "#374151", chip: "#1f2937", accent: "#65a30d", glow: "#84cc16" },
};

/**
 * Professional form colors - neutral grays with single blue accent
 * @type {Object<string, string>}
 */
export const FORM_COLORS = {
  inputBackground: "#ffffff",
  inputBorder: "#d1d5db",
  inputText: "#1f2937",
  labelText: "#4b5563",
  focusBorder: "#2563eb",
  focusShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
  activeBackground: "#eff6ff",
  accentPurple: "#2563eb",     // Single blue accent
  accentBlue: "#3b82f6",
  muted: "#9ca3af",
};

/**
 * Clean professional palette
 * @type {Object<string, string>}
 */
export const PALETTE = {
  background: "#f3f4f6",       // Gray 100 - light neutral
  surface: "#ffffff",          // White
  surfaceLight: "#f9fafb",     // Gray 50
  bgTertiary: "#f3f4f6",       // Gray 100
  text: "#111827",             // Gray 900
  textSecondary: "#4b5563",    // Gray 600
  textMuted: "#6b7280",        // Gray 500
  textLight: "#9ca3af",        // Gray 400
  primary: "#2563eb",          // Blue 600
  primaryLight: "#3b82f6",     // Blue 500
  primaryDark: "#1d4ed8",      // Blue 700
  primaryBg: "#eff6ff",        // Blue 50
  success: "#059669",          // Emerald 600
  error: "#dc2626",            // Red 600
  warning: "#d97706",          // Amber 600
  border: "#e5e7eb",           // Gray 200
  borderLight: "#f3f4f6",      // Gray 100
  shadow: "0 1px 3px rgba(0,0,0,0.1)",
  shadowMd: "0 4px 6px -1px rgba(0,0,0,0.1)",
};
