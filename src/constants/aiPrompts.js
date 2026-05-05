export const SYSTEM_PROMPT = `You are an ESPHome configuration expert. Generate valid ESPHome YAML configurations based on user descriptions.

Rules:
- Output ONLY valid YAML, no markdown code blocks
- Use standard ESPHome syntax and components
- Include esphome, platform (esp32/esp8266), wifi, and logger sections
- Add api and ota services by default
- Use GPIO pin numbers (e.g., GPIO4, GPIO21)
- Include proper indentation (2 spaces)
- Keep device names in kebab-case
- Add friendly_name for all sensors/outputs
- Include update_interval for sensors (default 60s)

Component mappings:
- DHT11/DHT22 → dht platform
- DS18B20 → dallas_temp platform with one_wire
- BME280/BME680 → bme280_i2c/bme680_bsec with i2c
- PIR motion → gpio binary_sensor with device_class: motion
- Relay/Switch → gpio switch
- LED/RGB → rgb/neopixel light
- SSD1306 → ssd1306_i2c display

Output format:
esphome:
  name: device-name
  friendly_name: "Device Name"

esp32:
  board: esp32dev

wifi:
  ssid: "your_wifi_ssid"
  password: "your_wifi_password"

api:
ota:
  platform: esphome

logger:

[component sections based on user request]`;

export const EXAMPLE_PROMPTS = [
  {
    label: "Température & Humidité",
    text: "Un capteur de température DHT22 sur le pin D2",
  },
  {
    label: "Détecteur de mouvement",
    text: "Un capteur PIR HC-SR501 sur le pin D4 pour détecter le mouvement",
  },
  {
    label: "LED RGB",
    text: "Une bande LED WS2812B (NeoPixel) de 30 LEDs sur le pin D5",
  },
  {
    label: "Station météo complète",
    text: "Un capteur BME280 I2C pour température, humidité et pression sur SDA=21, SCL=22",
  },
  {
    label: "Relay & LED",
    text: "Un relay sur le pin D12 et une LED sur le pin D2",
  },
];

export const COMPONENT_HINTS = {
  temperature: [
    "DHT11/DHT22 - Température & Humidité (GPIO)",
    "DS18B20 - Température OneWire (GPIO)",
    "BME280 - Temp/Hum/Pression I2C",
    "BME680 - Temp/Hum/Pression/Gas I2C",
  ],
  motion: [
    "HC-SR501 - PIR motion (GPIO)",
    "RCWL-0516 - Microwave radar (GPIO)",
  ],
  light: [
    "LED simple - GPIO",
    "RGB LED - 3 GPIO pins",
    "NeoPixel/WS2812B - Addressable strip (GPIO)",
  ],
  display: [
    "SSD1306 - OLED 128x64 I2C",
    "LCD1602 - Character LCD I2C",
  ],
  power: [
    "Relay - Switch output (GPIO)",
    "Servo motor - PWM (GPIO)",
  ],
};

export function buildPrompt(userPrompt, existingConfig = null) {
  let prompt = userPrompt;

  if (existingConfig) {
    prompt += `\n\nExisting configuration (modify or extend):\n${existingConfig}`;
  }

  return prompt;
}

export function extractComponentsFromPrompt(prompt) {
  const components = [];
  const lowerPrompt = prompt.toLowerCase();

  const patterns = [
    { regex: /dht11|dht22|am2302/i, type: "dht", category: "sensor" },
    { regex: /ds18b20|dallas/i, type: "ds18b20", category: "sensor" },
    { regex: /bme280/i, type: "bme280", category: "sensor" },
    { regex: /bme680/i, type: "bme680", category: "sensor" },
    { regex: /pir|hc-sr501/i, type: "pir", category: "binary_sensor" },
    { regex: /relay/i, type: "relay", category: "switch" },
    { regex: /led|ws2812|neopixel/i, type: "neopixel", category: "light" },
    { regex: /rgb/i, type: "rgb", category: "light" },
    { regex: /ssd1306|oled/i, type: "ssd1306", category: "display" },
  ];

  for (const pattern of patterns) {
    if (pattern.regex.test(lowerPrompt)) {
      components.push({
        type: pattern.type,
        category: pattern.category,
      });
    }
  }

  return components;
}

export function suggestPins(components) {
  const suggestions = {};
  const usedPins = new Set();
  const defaultPins = ["4", "5", "12", "13", "14", "16", "17", "18", "19", "21", "22", "23", "25", "26", "27", "32", "33"];

  let pinIndex = 0;

  for (const comp of components) {
    if (comp.type === "dht" || comp.type === "pir" || comp.type === "relay") {
      suggestions[comp.type] = defaultPins[pinIndex % defaultPins.length];
      usedPins.add(defaultPins[pinIndex % defaultPins.length]);
      pinIndex++;
    } else if (comp.type === "neopixel") {
      suggestions[comp.type] = defaultPins[pinIndex % defaultPins.length];
      usedPins.add(defaultPins[pinIndex % defaultPins.length]);
      pinIndex++;
    } else if (comp.type === "rgb") {
      suggestions[comp.type + "_r"] = defaultPins[pinIndex % defaultPins.length];
      usedPins.add(defaultPins[pinIndex % defaultPins.length]);
      pinIndex++;
      suggestions[comp.type + "_g"] = defaultPins[pinIndex % defaultPins.length];
      usedPins.add(defaultPins[pinIndex % defaultPins.length]);
      pinIndex++;
      suggestions[comp.type + "_b"] = defaultPins[pinIndex % defaultPins.length];
      usedPins.add(defaultPins[pinIndex % defaultPins.length]);
      pinIndex++;
    } else if (comp.type === "bme280" || comp.type === "bme680" || comp.type === "ssd1306") {
      suggestions[comp.type + "_sda"] = "21";
      suggestions[comp.type + "_scl"] = "22";
    }
  }

  return suggestions;
}