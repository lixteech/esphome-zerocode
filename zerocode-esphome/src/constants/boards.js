/**
 * @fileoverview Board definitions for ESPHome ZeroCode
 * Contains all supported ESP32/ESP8266 board configurations
 *
 * @module constants/boards
 */

/**
 * Represents a board definition
 * @typedef {Object} BoardDefinition
 * @property {string} value - Unique identifier for the board
 * @property {string} label - Human-readable display name
 * @property {string} platform - ESPHome platform (esp32/esp8266)
 * @property {string} board - ESPHome board identifier
 * @property {string} family - Chip family (ESP32, ESP32-S3, ESP8266, etc.)
 * @property {number} pins - Number of available GPIO pins
 */

/** @type {BoardDefinition[]} */
export const BOARD_DB = [
  // ESP32
  {
    value: "esp32",
    label: "ESP32 DevKit v1",
    platform: "esp32",
    board: "esp32dev",
    family: "ESP32",
    pins: 36,
  },
  {
    value: "esp32_wroom32",
    label: "ESP32-WROOM-32E",
    platform: "esp32",
    board: "esp32dev",
    family: "ESP32",
    pins: 36,
  },
  {
    value: "esp32_wrover",
    label: "ESP32-WROVER-B (PSRAM)",
    platform: "esp32",
    board: "esp32dev",
    family: "ESP32",
    pins: 36,
  },
  {
    value: "esp32_pico",
    label: "ESP32-PICO-D4",
    platform: "esp32",
    board: "pico32",
    family: "ESP32",
    pins: 32,
  },
  {
    value: "esp32_cam",
    label: "ESP32-CAM (AI-Thinker)",
    platform: "esp32",
    board: "esp32cam",
    family: "ESP32",
    pins: 16,
  },
  {
    value: "esp32_poe",
    label: "OLIMEX ESP32-POE",
    platform: "esp32",
    board: "esp32-poe",
    family: "ESP32",
    pins: 32,
  },
  {
    value: "ttgo_display",
    label: "TTGO T-Display 1.14\"",
    platform: "esp32",
    board: "ttgo-t-display-1.14inch",
    family: "ESP32",
    pins: 32,
  },
  {
    value: "ttgo_t7",
    label: "TTGO T7 v1.4",
    platform: "esp32",
    board: "ttgo-lora32-v1",
    family: "ESP32",
    pins: 32,
  },
  {
    value: "m5stack_core",
    label: "M5Stack Core",
    platform: "esp32",
    board: "m5stack-core-esp32",
    family: "ESP32",
    pins: 16,
  },
  {
    value: "m5stack_atom",
    label: "M5Stack Atom Lite",
    platform: "esp32",
    board: "m5stack-atom",
    family: "ESP32",
    pins: 6,
  },
  {
    value: "m5stack_stamp",
    label: "M5Stack StampS3",
    platform: "esp32",
    board: "m5stack-stamps3",
    family: "ESP32-S3",
    pins: 20,
  },
  {
    value: "cyd",
    label: "CYD ESP32-2432S028",
    platform: "esp32",
    board: "esp32dev",
    family: "ESP32",
    pins: 36,
  },
  {
    value: "cyd2usb",
    label: "CYD2 ESP32-2432S028 v2",
    platform: "esp32",
    board: "esp32dev",
    family: "ESP32",
    pins: 36,
  },

  // ESP32-S2
  {
    value: "esp32s2",
    label: "ESP32-S2 (LiLyGO Mini)",
    platform: "esp32",
    board: "lolin_s2_mini",
    family: "ESP32-S2",
    pins: 36,
  },
  {
    value: "esp32s2_devkit",
    label: "ESP32-S2 DevKit M-1",
    platform: "esp32",
    board: "esp32-s2-saola-1",
    family: "ESP32-S2",
    pins: 36,
  },

  // ESP32-S3
  {
    value: "esp32s3",
    label: "ESP32-S3 DevKitC-1",
    platform: "esp32",
    board: "esp32-s3-devkitc-1",
    family: "ESP32-S3",
    pins: 36,
  },
  {
    value: "esp32s3_xiao",
    label: "Seeed XIAO ESP32-S3",
    platform: "esp32",
    board: "seeed_xiao_esp32s3",
    family: "ESP32-S3",
    pins: 11,
  },
  {
    value: "esp32s3_lipo",
    label: "LilyGO T-Display S3",
    platform: "esp32",
    board: "lilygo-t-display-s3",
    family: "ESP32-S3",
    pins: 20,
  },
  {
    value: "esp32s3_zero",
    label: "WeAct ESP32-S3 Zero",
    platform: "esp32",
    board: "esp32-s3-devkitc-1",
    family: "ESP32-S3",
    pins: 20,
  },

  // ESP32-C3
  {
    value: "esp32c3",
    label: "ESP32-C3 (XIAO Seeed)",
    platform: "esp32",
    board: "seeed_xiao_esp32c3",
    family: "ESP32-C3",
    pins: 11,
  },
  {
    value: "esp32c3_mini",
    label: "ESP32-C3 SuperMini",
    platform: "esp32",
    board: "esp32-c3-devkitm-1",
    family: "ESP32-C3",
    pins: 13,
  },
  {
    value: "esp32c3_devkit",
    label: "ESP32-C3 DevKitM-1",
    platform: "esp32",
    board: "esp32-c3-devkitm-1",
    family: "ESP32-C3",
    pins: 22,
  },

  // ESP32-C6
  {
    value: "esp32c6",
    label: "ESP32-C6 DevKitC-1",
    platform: "esp32",
    board: "esp32-c6-devkitc-1",
    family: "ESP32-C6",
    pins: 22,
  },
  {
    value: "esp32c6_xiao",
    label: "Seeed XIAO ESP32-C6",
    platform: "esp32",
    board: "seeed_xiao_esp32c6",
    family: "ESP32-C6",
    pins: 11,
  },

  // ESP32-H2
  {
    value: "esp32h2",
    label: "ESP32-H2 DevKitM-1",
    platform: "esp32",
    board: "esp32-h2-devkitm-1",
    family: "ESP32-H2",
    pins: 20,
  },

  // ESP8266
  {
    value: "esp8266",
    label: "ESP8266 NodeMCU v2",
    platform: "esp8266",
    board: "nodemcuv2",
    family: "ESP8266",
    pins: 16,
  },
  {
    value: "d1mini",
    label: "Wemos D1 Mini",
    platform: "esp8266",
    board: "d1_mini",
    family: "ESP8266",
    pins: 11,
  },
  {
    value: "d1mini_pro",
    label: "Wemos D1 Mini Pro",
    platform: "esp8266",
    board: "d1_mini_pro",
    family: "ESP8266",
    pins: 11,
  },
  {
    value: "esp01",
    label: "ESP-01 / ESP-01S",
    platform: "esp8266",
    board: "esp01",
    family: "ESP8266",
    pins: 4,
  },
  {
    value: "esp8285",
    label: "ESP8285 (Sonoff Basic)",
    platform: "esp8266",
    board: "esp8285",
    family: "ESP8285",
    pins: 8,
  },
  {
    value: "sonoff_mini",
    label: "Sonoff Mini R2",
    platform: "esp8266",
    board: "esp8285",
    family: "ESP8285",
    pins: 4,
  },
];

/**
 * Unique board families for grouping
 * @type {string[]}
 */
export const BOARD_FAMILIES = [...new Set(BOARD_DB.map((b) => b.family))];

/**
 * Finds a board definition by its value
 * @param {string} value - Board value to search for
 * @returns {BoardDefinition|undefined} The board definition or undefined
 */
export function getBoardByValue(value) {
  return BOARD_DB.find((b) => b.value === value);
}

/**
 * Gets all boards for a specific family
 * @param {string} family - Family name to filter by
 * @returns {BoardDefinition[]} Array of matching boards
 */
export function getBoardsByFamily(family) {
  return BOARD_DB.filter((b) => b.family === family);
}
