/**
 * @fileoverview Modern color palette with light/dark mode support
 */

export const THEMES = {
  dark: {
    background: "#0a0a0f",
    surface: "#12121a",
    surfaceLight: "#1a1a24",
    text: "#f0f0f5",
    textSecondary: "#a0a0b0",
    textMuted: "#707080",
    textLight: "#505060",
    primary: "#8b5cf6",
    primaryLight: "#a78bfa",
    primaryDark: "#7c3aed",
    primaryBg: "rgba(139, 92, 246, 0.1)",
    secondary: "#06b6d4",
    secondaryLight: "#22d3ee",
    secondaryBg: "rgba(6, 182, 212, 0.1)",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    border: "rgba(139, 92, 246, 0.15)",
    borderLight: "rgba(139, 92, 246, 0.08)",
    shadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
    shadowGlow: "0 0 30px rgba(139, 92, 246, 0.15)",
  },
  light: {
    background: "#f8fafc",
    surface: "#ffffff",
    surfaceLight: "#f1f5f9",
    text: "#1e293b",
    textSecondary: "#64748b",
    textMuted: "#94a3b8",
    textLight: "#cbd5e1",
    primary: "#7c3aed",
    primaryLight: "#8b5cf6",
    primaryDark: "#6d28d9",
    primaryBg: "rgba(124, 58, 237, 0.08)",
    secondary: "#0891b2",
    secondaryLight: "#06b6d4",
    secondaryBg: "rgba(8, 145, 178, 0.08)",
    success: "#059669",
    error: "#dc2626",
    warning: "#d97706",
    border: "rgba(124, 58, 237, 0.15)",
    borderLight: "rgba(124, 58, 237, 0.08)",
    shadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    shadowGlow: "0 0 30px rgba(124, 58, 237, 0.1)",
  },
};

// Default palette (dark theme)
export const PALETTE = THEMES.dark;

// Form-specific colors
export const FORM_COLORS = {
  inputBorder: "rgba(139, 92, 246, 0.15)",
  inputText: "#f0f0f5",
  labelText: "#a0a0b0",
};

export const YAML_COLORS = {
  dark: {
    comment: "#6b7280",
    key: "#a78bfa",
    colon: "#9ca3af",
    string: "#34d399",
    bool: "#f472b6",
    number: "#fbbf24",
    plain: "#e5e7eb",
    indent: "#4b5563",
    dash: "#f87171",
  },
  light: {
    comment: "#6b7280",
    key: "#7c3aed",
    colon: "#9ca3af",
    string: "#059669",
    bool: "#db2777",
    number: "#d97706",
    plain: "#1f2937",
    indent: "#d1d5db",
    dash: "#dc2626",
  },
};

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

export const GRADIENTS = {
  primary: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
  primaryDark: "linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)",
  surface: "linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%)",
  glow: "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
};