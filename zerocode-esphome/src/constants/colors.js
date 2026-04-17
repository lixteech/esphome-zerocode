/**
 * @fileoverview Color constants for UI theming
 *
 * @module constants/colors
 */

/**
 * YAML syntax highlighting colors
 * @type {Object<string, string>}
 */
export const YAML_COLORS = {
  comment: "#6272a4",
  key: "#79c0ff",
  colon: "#8b949e",
  string: "#a5d6ff",
  bool: "#ff7b72",
  number: "#f9c74f",
  plain: "#c9d1d9",
  indent: "#1e3a5a",
  dash: "#ff7b72",
};

/**
 * Board family color themes for 2D preview
 * @typedef {Object} FamilyColors
 * @property {string} pcb - PCB background color
 * @property {string} chip - Chip/microcontroller color
 * @property {string} accent - Accent/highlight color
 * @property {string} glow - Glow effect color
 */

/**
 * Color themes for each ESP family
 * @type {Record<string, FamilyColors>}
 */
export const FAMILY_COLORS = {
  ESP32: {
    pcb: "#0a2218",
    chip: "#0d2f10",
    accent: "#00e5a0",
    glow: "#00ff88",
  },
  "ESP32-S2": {
    pcb: "#0a1a2e",
    chip: "#0d1f3c",
    accent: "#00b4ff",
    glow: "#00cfff",
  },
  "ESP32-S3": {
    pcb: "#150d2e",
    chip: "#1a0f3a",
    accent: "#a855f7",
    glow: "#c084fc",
  },
  "ESP32-C3": {
    pcb: "#1a120a",
    chip: "#2a1a08",
    accent: "#fb923c",
    glow: "#fdba74",
  },
  "ESP32-C6": {
    pcb: "#0a1a1a",
    chip: "#0d2a2a",
    accent: "#2dd4bf",
    glow: "#5eead4",
  },
  "ESP32-H2": {
    pcb: "#1a0a12",
    chip: "#2a0d1a",
    accent: "#f472b6",
    glow: "#f9a8d4",
  },
  ESP8266: {
    pcb: "#1a150a",
    chip: "#2a1f08",
    accent: "#facc15",
    glow: "#fde047",
  },
  ESP8285: {
    pcb: "#1a150a",
    chip: "#2a1f08",
    accent: "#f59e0b",
    glow: "#fcd34d",
  },
};

/**
 * Default color palette for form elements
 * @type {Object<string, string>}
 */
export const FORM_COLORS = {
  inputBackground: "rgba(255,255,255,0.04)",
  inputBorder: "rgba(255,255,255,0.08)",
  inputText: "#e2e8f0",
  labelText: "#475569",
  focusBorder: "rgba(99,102,241,0.6)",
  focusShadow: "0 0 0 3px rgba(99,102,241,0.1)",
  activeBackground: "rgba(99,102,241,0.1)",
  accentPurple: "#6366f1",
  accentBlue: "#818cf8",
  muted: "#334155",
};

/**
 * Default color palette
 * @type {Object<string, string>}
 */
export const PALETTE = {
  background: "#080e1a",
  surface: "#0a1220",
  surfaceLight: "rgba(255,255,255,0.02)",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  textDark: "#334155",
  primary: "#6366f1",
  primaryLight: "#a5b4fc",
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  border: "rgba(255,255,255,0.06)",
  borderLight: "rgba(255,255,255,0.04)",
};
