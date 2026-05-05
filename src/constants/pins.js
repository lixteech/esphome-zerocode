/**
 * @fileoverview GPIO pin constants and helpers
 *
 * @module constants/pins
 */

/**
 * Pin labels for left side of board
 * @type {string[]}
 */
export const LEFT_PINS = [
  "3V3",
  "EN",
  "36",
  "39",
  "34",
  "35",
  "32",
  "33",
  "25",
];

/**
 * Pin labels for right side of board
 * @type {string[]}
 */
export const RIGHT_PINS = [
  "VIN",
  "GND",
  "23",
  "22",
  "TX",
  "RX",
  "21",
  "19",
  "18",
];

/**
 * Board preview dimensions
 * @type {Object}
 */
export const BOARD_DIMENSIONS = {
  svgWidth: 340,
  svgHeight: 400,
  pcbWidth: 170,
  pcbHeight: 300,
  pinCount: 9,
  pinRadius: 5,
  pinLength: 22,
  usbWidth: 36,
  usbHeight: 16,
  antennaWidth: 20,
  antennaHeight: 60,
  chipWidth: 76,
  chipHeight: 84,
};

/**
 * Compute pin spacing based on PCB height
 * @returns {number} Pin spacing in SVG units
 */
export function getPinSpacing() {
  const { pcbHeight, pinCount } = BOARD_DIMENSIONS;
  return (pcbHeight - 40) / (pinCount - 1);
}

/**
 * Generate GPIO pin options for select dropdown
 * @param {number} maxPins - Maximum number of pins
 * @returns {Array<{value: string, label: string}>} Pin options
 */
export function generateGpioOptions(maxPins = 36) {
  return [...Array(maxPins)].map((_, i) => ({
    value: String(i),
    label: `GPIO${i}`,
  }));
}

/**
 * Check if a pin label is a numeric GPIO
 * @param {string} label - Pin label
 * @returns {boolean} True if numeric GPIO
 */
export function isNumericPin(label) {
  return /^\d+$/.test(label);
}
