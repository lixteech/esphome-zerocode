/**
 * @fileoverview Utility helper functions
 *
 * @module utils/helpers
 */

/**
 * Format device name for YAML (kebab-case, no spaces)
 * @param {string} name - Raw device name
 * @returns {string} Formatted device name
 */
export function formatDeviceName(name) {
  if (!name || typeof name !== "string") return "my-device";
  return name.replace(/\s+/g, "-").toLowerCase();
}

/**
 * Format friendly name (Title Case with spaces)
 * @param {string} name - Device name
 * @returns {string} Friendly name for display
 */
export function formatFriendlyName(name) {
  const clean = formatDeviceName(name);
  return clean
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Extract active GPIO pins from components
 * @param {Array} components - Component configurations
 * @returns {string[]} Array of active GPIO pin numbers as strings
 */
export function extractActiveGpios(components) {
  if (!Array.isArray(components)) return [];

  const gpios = new Set();

  for (const component of components) {
    const pinFields = [
      "gpio",
      "gpioR",
      "gpioG",
      "gpioB",
      "gpioW",
      "gpioTrig",
      "gpioEcho",
      "gpioA",
      "gpioB",
      "gpioCS",
      "gpioDC",
      "gpioRST",
      "gpioCLK",
      "gpioDIO",
      "gpioSel",
      "gpioCF",
      "gpioCF1",
    ];

    for (const field of pinFields) {
      if (component[field]) {
        gpios.add(String(component[field]));
      }
    }
  }

  return Array.from(gpios);
}

/**
 * Generate board options for select dropdown
 * @returns {Array<{value: string, label: string}>} Board options
 */
export function generateBoardOptions() {
  const { BOARD_DB } = require("../constants/boards");
  return BOARD_DB.map((b) => ({
    value: b.value,
    label: `[${b.family}] ${b.label}`,
  }));
}

/**
 * Create a unique ID for components
 * @returns {number} Timestamp-based ID
 */
export function createComponentId() {
  return Date.now();
}

/**
 * Deep clone an object
 * @template T
 * @param {T} obj - Object to clone
 * @returns {T} Cloned object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Validate WiFi SSID (basic check)
 * @param {string} ssid - SSID string
 * @returns {boolean} True if valid
 */
export function isValidSSID(ssid) {
  if (!ssid || typeof ssid !== "string") return false;
  return ssid.length > 0 && ssid.length <= 32;
}

/**
 * Validate device name (alphanumeric, dash, underscore only)
 * @param {string} name - Device name
 * @returns {boolean} True if valid
 */
export function isValidDeviceName(name) {
  if (!name || typeof name !== "string") return false;
  return /^[a-zA-Z0-9_-]+$/.test(name) && name.length > 0 && name.length <= 63;
}
