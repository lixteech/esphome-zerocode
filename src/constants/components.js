/**
 * @fileoverview Component definitions for ESPHome ZeroCode
 * Organized by category with metadata for UI rendering
 *
 * @module constants/components
 */

/**
 * Represents a sensor/component definition
 * @typedef {Object} ComponentDefinition
 * @property {string} type - Unique type identifier
 * @property {string} label - Display name
 * @property {string} icon - Unicode icon/emoji
 * @property {string} desc - Description of functionality
 * @property {string} bus - Communication bus (gpio, i2c, spi, uart, 1wire, adc, pwm)
 * @property {string} platform - ESPHome platform type
 * @property {string[]} tags - Search tags for filtering
 */

/**
 * Component database organized by category
 * @type {Record<string, ComponentDefinition[]>}
 */
export const COMPONENT_DB = {
  temperature: [
    {
      type: "dht11",
      label: "DHT11",
      icon: "🌡️",
      desc: "Temperature & Humidity",
      bus: "gpio",
      platform: "sensor",
      tags: ["temp", "humidity"],
    },
    {
      type: "dht22",
      label: "DHT22 / AM2302",
      icon: "🌡️",
      desc: "High precision Temp & Humidity",
      bus: "gpio",
      platform: "sensor",
      tags: ["temp", "humidity"],
    },
    {
      type: "ds18b20",
      label: "DS18B20",
      icon: "🌡️",
      desc: "OneWire waterproof temperature",
      bus: "1wire",
      platform: "sensor",
      tags: ["temp", "waterproof"],
    },
    {
      type: "bme280",
      label: "BME280",
      icon: "🌤️",
      desc: "Temp / Humidity / Pressure I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["temp", "humidity", "pressure"],
    },
    {
      type: "bme680",
      label: "BME680",
      icon: "🌫️",
      desc: "Temp / Humidity / Pressure / Gas",
      bus: "i2c",
      platform: "sensor",
      tags: ["temp", "humidity", "pressure", "gas"],
    },
    {
      type: "bmp280",
      label: "BMP280",
      icon: "🏔️",
      desc: "Pressure & Temperature I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["temp", "pressure"],
    },
    {
      type: "bmp085",
      label: "BMP085/BMP180",
      icon: "🏔️",
      desc: "Barometric pressure I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["temp", "pressure"],
    },
    {
      type: "aht10",
      label: "AHT10 / AHT20",
      icon: "💧",
      desc: "Temp & Humidity I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["temp", "humidity"],
    },
    {
      type: "sht31",
      label: "SHT31",
      icon: "🌡️",
      desc: "High accuracy Temp & Humidity",
      bus: "i2c",
      platform: "sensor",
      tags: ["temp", "humidity"],
    },
    {
      type: "sht4x",
      label: "SHT40/SHT41/SHT45",
      icon: "🌡️",
      desc: "Ultra precision Temp & Humidity",
      bus: "i2c",
      platform: "sensor",
      tags: ["temp", "humidity"],
    },
    {
      type: "htu21d",
      label: "HTU21D",
      icon: "💧",
      desc: "Temp & Humidity I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["temp", "humidity"],
    },
    {
      type: "tmp102",
      label: "TMP102",
      icon: "🌡️",
      desc: "Digital temperature I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["temp"],
    },
    {
      type: "lm75",
      label: "LM75",
      icon: "🌡️",
      desc: "Temperature I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["temp"],
    },
    {
      type: "max6675",
      label: "MAX6675",
      icon: "🔥",
      desc: "Thermocouple K-type SPI",
      bus: "spi",
      platform: "sensor",
      tags: ["temp", "thermocouple"],
    },
    {
      type: "max31855",
      label: "MAX31855",
      icon: "🔥",
      desc: "Thermocouple SPI",
      bus: "spi",
      platform: "sensor",
      tags: ["temp", "thermocouple"],
    },
    {
      type: "ntc",
      label: "NTC Thermistor",
      icon: "🌡️",
      desc: "Analog NTC temperature",
      bus: "adc",
      platform: "sensor",
      tags: ["temp", "analog"],
    },
  ],

  light: [
    {
      type: "bh1750",
      label: "BH1750",
      icon: "☀️",
      desc: "Ambient light lux I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["light", "lux"],
    },
    {
      type: "tsl2561",
      label: "TSL2561",
      icon: "☀️",
      desc: "Luminosity I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["light", "lux"],
    },
    {
      type: "tsl2591",
      label: "TSL2591",
      icon: "☀️",
      desc: "High dynamic range light I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["light", "lux"],
    },
    {
      type: "apds9960",
      label: "APDS9960",
      icon: "🌈",
      desc: "Gesture / Light / Color / Proximity",
      bus: "i2c",
      platform: "sensor",
      tags: ["light", "gesture", "proximity"],
    },
    {
      type: "veml7700",
      label: "VEML7700",
      icon: "☀️",
      desc: "Ambient light I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["light", "lux"],
    },
    {
      type: "ldr",
      label: "LDR Photoresistor",
      icon: "💡",
      desc: "Analog light sensor",
      bus: "adc",
      platform: "sensor",
      tags: ["light", "analog"],
    },
    {
      type: "max44009",
      label: "MAX44009",
      icon: "☀️",
      desc: "Ultra-low power light I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["light", "lux"],
    },
  ],

  motion: [
    {
      type: "pir",
      label: "HC-SR501 PIR",
      icon: "👁️",
      desc: "Passive infrared motion",
      bus: "gpio",
      platform: "binary",
      tags: ["motion", "pir"],
    },
    {
      type: "rcwl0516",
      label: "RCWL-0516",
      icon: "📡",
      desc: "Microwave radar motion",
      bus: "gpio",
      platform: "binary",
      tags: ["motion", "radar"],
    },
    {
      type: "ld2410",
      label: "HLK-LD2410",
      icon: "📡",
      desc: "mmWave presence sensor UART",
      bus: "uart",
      platform: "sensor",
      tags: ["motion", "mmwave", "presence"],
    },
    {
      type: "hcsr04",
      label: "HC-SR04 Ultrasonic",
      icon: "📏",
      desc: "Distance measurement",
      bus: "gpio",
      platform: "sensor",
      tags: ["distance", "ultrasonic"],
    },
    {
      type: "vl53l0x",
      label: "VL53L0X",
      icon: "📏",
      desc: "Time-of-flight distance I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["distance", "tof"],
    },
    {
      type: "vl53l1x",
      label: "VL53L1X",
      icon: "📏",
      desc: "Long range ToF I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["distance", "tof"],
    },
    {
      type: "mpu6050",
      label: "MPU-6050",
      icon: "🎮",
      desc: "6-axis IMU Accel+Gyro I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["imu", "accelerometer", "gyroscope"],
    },
    {
      type: "mpu9250",
      label: "MPU-9250",
      icon: "🎮",
      desc: "9-axis IMU I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["imu", "compass"],
    },
    {
      type: "qmc5883l",
      label: "QMC5883L Compass",
      icon: "🧭",
      desc: "3-axis magnetometer I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["compass", "magnetic"],
    },
    {
      type: "lis3dh",
      label: "LIS3DH",
      icon: "🎮",
      desc: "3-axis accelerometer I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["accelerometer"],
    },
  ],

  air_quality: [
    {
      type: "mhz19",
      label: "MH-Z19",
      icon: "💨",
      desc: "CO₂ NDIR sensor UART",
      bus: "uart",
      platform: "sensor",
      tags: ["co2", "air"],
    },
    {
      type: "scd40",
      label: "SCD40 / SCD41",
      icon: "🌬️",
      desc: "True CO₂ photoacoustic I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["co2", "air", "humidity", "temp"],
    },
    {
      type: "scd30",
      label: "SCD30",
      icon: "🌬️",
      desc: "CO₂ / Temp / Humidity I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["co2", "air"],
    },
    {
      type: "sgp30",
      label: "SGP30",
      icon: "🌫️",
      desc: "VOC & eCO₂ I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["voc", "co2", "air"],
    },
    {
      type: "sgp40",
      label: "SGP40",
      icon: "🌫️",
      desc: "VOC index I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["voc", "air"],
    },
    {
      type: "ccs811",
      label: "CCS811",
      icon: "🏭",
      desc: "VOC & eCO₂ I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["voc", "co2", "air"],
    },
    {
      type: "pmsa003i",
      label: "PMSA003I",
      icon: "🌫️",
      desc: "PM1/PM2.5/PM10 I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["pm25", "dust", "air"],
    },
    {
      type: "mq2",
      label: "MQ-2 Gas",
      icon: "🔥",
      desc: "LPG / Propane / Hydrogen",
      bus: "adc",
      platform: "sensor",
      tags: ["gas", "analog"],
    },
    {
      type: "mq135",
      label: "MQ-135 Air Quality",
      icon: "🌫️",
      desc: "Ammonia / Benzene / CO₂",
      bus: "adc",
      platform: "sensor",
      tags: ["air", "gas", "analog"],
    },
    {
      type: "sen55",
      label: "SEN55",
      icon: "🌬️",
      desc: "PM / NOx / VOC / Temp / RH I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["pm25", "voc", "air"],
    },
  ],

  water: [
    {
      type: "soil",
      label: "Capacitive Soil",
      icon: "🌱",
      desc: "Soil moisture analog",
      bus: "adc",
      platform: "sensor",
      tags: ["moisture", "soil", "garden"],
    },
    {
      type: "rain",
      label: "Rain Sensor",
      icon: "🌧️",
      desc: "Rain detection analog",
      bus: "adc",
      platform: "binary",
      tags: ["rain", "weather"],
    },
    {
      type: "water_level",
      label: "Water Level",
      icon: "💧",
      desc: "Float switch / level",
      bus: "gpio",
      platform: "binary",
      tags: ["water", "level"],
    },
    {
      type: "flow_yfs201",
      label: "YF-S201 Flow",
      icon: "🚿",
      desc: "Water flow pulse sensor",
      bus: "gpio",
      platform: "sensor",
      tags: ["flow", "water"],
    },
    {
      type: "tds",
      label: "TDS Meter",
      icon: "💧",
      desc: "Total dissolved solids analog",
      bus: "adc",
      platform: "sensor",
      tags: ["tds", "water", "quality"],
    },
    {
      type: "mlx90614",
      label: "MLX90614",
      icon: "🌡️",
      desc: "Non-contact IR temperature I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["temp", "ir", "contactless"],
    },
  ],

  power: [
    {
      type: "ina219",
      label: "INA219",
      icon: "⚡",
      desc: "Current / Voltage / Power I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["current", "voltage", "power"],
    },
    {
      type: "ina226",
      label: "INA226",
      icon: "⚡",
      desc: "High-side power monitor I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["current", "voltage", "power"],
    },
    {
      type: "pzem004t",
      label: "PZEM-004T",
      icon: "🔌",
      desc: "AC power meter UART",
      bus: "uart",
      platform: "sensor",
      tags: ["ac", "power", "energy"],
    },
    {
      type: "cse7766",
      label: "CSE7766",
      icon: "🔌",
      desc: "AC power measure UART (Sonoff)",
      bus: "uart",
      platform: "sensor",
      tags: ["ac", "power", "energy"],
    },
    {
      type: "hlw8012",
      label: "HLW8012",
      icon: "🔌",
      desc: "AC power measure GPIO (Sonoff)",
      bus: "gpio",
      platform: "sensor",
      tags: ["ac", "power", "energy"],
    },
    {
      type: "bl0937",
      label: "BL0937",
      icon: "🔌",
      desc: "AC energy monitor GPIO",
      bus: "gpio",
      platform: "sensor",
      tags: ["ac", "power", "energy"],
    },
    {
      type: "ads1115",
      label: "ADS1115",
      icon: "📊",
      desc: "16-bit ADC 4-ch I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["adc", "analog", "precision"],
    },
    {
      type: "ads1015",
      label: "ADS1015",
      icon: "📊",
      desc: "12-bit ADC 4-ch I²C",
      bus: "i2c",
      platform: "sensor",
      tags: ["adc", "analog"],
    },
  ],

  displays: [
    {
      type: "ssd1306",
      label: "SSD1306 OLED",
      icon: "🖥️",
      desc: "128x64 OLED I²C/SPI",
      bus: "i2c",
      platform: "display",
      tags: ["display", "oled"],
    },
    {
      type: "ssd1327",
      label: "SSD1327 OLED",
      icon: "🖥️",
      desc: "128x128 grayscale OLED I²C",
      bus: "i2c",
      platform: "display",
      tags: ["display", "oled"],
    },
    {
      type: "sh1106",
      label: "SH1106 OLED",
      icon: "🖥️",
      desc: "132x64 OLED I²C",
      bus: "i2c",
      platform: "display",
      tags: ["display", "oled"],
    },
    {
      type: "ili9341",
      label: "ILI9341 TFT",
      icon: "📱",
      desc: "2.4\" 320x240 TFT SPI",
      bus: "spi",
      platform: "display",
      tags: ["display", "tft", "color"],
    },
    {
      type: "st7789",
      label: "ST7789 TFT",
      icon: "📱",
      desc: "240x240 TFT SPI",
      bus: "spi",
      platform: "display",
      tags: ["display", "tft", "color"],
    },
    {
      type: "epaper",
      label: "Waveshare e-Paper",
      icon: "📄",
      desc: "E-ink display SPI",
      bus: "spi",
      platform: "display",
      tags: ["display", "epaper"],
    },
    {
      type: "tm1637",
      label: "TM1637 7-seg",
      icon: "🔢",
      desc: "4-digit 7-segment display GPIO",
      bus: "gpio",
      platform: "display",
      tags: ["display", "7segment"],
    },
    {
      type: "max7219",
      label: "MAX7219 Matrix",
      icon: "⬛",
      desc: "8x8 LED matrix SPI",
      bus: "spi",
      platform: "display",
      tags: ["display", "matrix"],
    },
    {
      type: "lcd1602",
      label: "LCD 1602 / 2004",
      icon: "📟",
      desc: "Character LCD I²C (PCF8574)",
      bus: "i2c",
      platform: "display",
      tags: ["display", "lcd"],
    },
  ],

  outputs: [
    {
      type: "relay",
      label: "Relay Module",
      icon: "⚡",
      desc: "GPIO relay switch",
      bus: "gpio",
      platform: "switch",
      tags: ["relay", "switch", "ac"],
    },
    {
      type: "led",
      label: "Single LED",
      icon: "💡",
      desc: "GPIO LED output",
      bus: "gpio",
      platform: "switch",
      tags: ["led", "light"],
    },
    {
      type: "rgb",
      label: "RGB LED",
      icon: "🌈",
      desc: "PWM RGB light",
      bus: "pwm",
      platform: "light",
      tags: ["rgb", "led", "color"],
    },
    {
      type: "rgbw",
      label: "RGBW LED",
      icon: "🌈",
      desc: "PWM RGBW light",
      bus: "pwm",
      platform: "light",
      tags: ["rgbw", "led", "color"],
    },
    {
      type: "neopixel",
      label: "NeoPixel / WS2812",
      icon: "💫",
      desc: "Addressable LED strip GPIO",
      bus: "gpio",
      platform: "light",
      tags: ["neopixel", "ws2812", "addressable"],
    },
    {
      type: "sk6812",
      label: "SK6812 RGBW",
      icon: "💫",
      desc: "RGBW addressable strip GPIO",
      bus: "gpio",
      platform: "light",
      tags: ["sk6812", "addressable"],
    },
    {
      type: "servo",
      label: "Servo Motor",
      icon: "🔧",
      desc: "PWM servo control",
      bus: "pwm",
      platform: "output",
      tags: ["servo", "motor", "pwm"],
    },
    {
      type: "stepper",
      label: "Stepper Motor",
      icon: "⚙️",
      desc: "A4988 / DRV8825 stepper",
      bus: "gpio",
      platform: "output",
      tags: ["stepper", "motor"],
    },
    {
      type: "buzzer",
      label: "Passive Buzzer",
      icon: "🔔",
      desc: "PWM tone generator",
      bus: "pwm",
      platform: "output",
      tags: ["buzzer", "sound", "tone"],
    },
    {
      type: "fan",
      label: "PWM Fan",
      icon: "🌀",
      desc: "PWM fan speed control",
      bus: "pwm",
      platform: "fan",
      tags: ["fan", "pwm", "cooling"],
    },
  ],

  inputs: [
    {
      type: "button",
      label: "Push Button",
      icon: "🔘",
      desc: "Physical button GPIO",
      bus: "gpio",
      platform: "binary",
      tags: ["button", "input"],
    },
    {
      type: "switch_gpio",
      label: "Toggle Switch",
      icon: "🎚️",
      desc: "Toggle switch GPIO",
      bus: "gpio",
      platform: "binary",
      tags: ["switch", "input"],
    },
    {
      type: "rotary",
      label: "Rotary Encoder",
      icon: "🎛️",
      desc: "Rotary encoder GPIO",
      bus: "gpio",
      platform: "sensor",
      tags: ["encoder", "rotary", "input"],
    },
    {
      type: "pn532",
      label: "PN532 NFC",
      icon: "📶",
      desc: "NFC/RFID reader I²C/SPI",
      bus: "i2c",
      platform: "binary",
      tags: ["nfc", "rfid"],
    },
    {
      type: "rc522",
      label: "RC522 RFID",
      icon: "📶",
      desc: "RFID reader SPI",
      bus: "spi",
      platform: "binary",
      tags: ["rfid", "nfc"],
    },
    {
      type: "fingerprint",
      label: "R503 Fingerprint",
      icon: "👆",
      desc: "Fingerprint sensor UART",
      bus: "uart",
      platform: "binary",
      tags: ["fingerprint", "biometric"],
    },
  ],
};

/**
 * Flattened list of all components for search
 * @type {ComponentDefinition[]}
 */
export const ALL_COMPONENTS = Object.values(COMPONENT_DB).flat();

/**
 * Category labels for UI display
 * @type {Array<{id: string, label: string}>}
 */
export const CATEGORIES = Object.keys(COMPONENT_DB).map((k) => ({
  id: k,
  label: k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
}));

/**
 * Find a component definition by type
 * @param {string} type - Component type to search
 * @returns {ComponentDefinition|undefined} Component definition or undefined
 */
export function getComponentByType(type) {
  return ALL_COMPONENTS.find((d) => d.type === type);
}

/**
 * Find components by search query
 * @param {string} query - Search term
 * @returns {ComponentDefinition[]} Matching components
 */
export function searchComponents(query) {
  const q = query.toLowerCase();
  return ALL_COMPONENTS.filter(
    (c) =>
      c.label.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.tags?.some((t) => t.includes(q))
  );
}

/**
 * Get components by category
 * @param {string} category - Category ID
 * @returns {ComponentDefinition[]} Components in category
 */
export function getComponentsByCategory(category) {
  return COMPONENT_DB[category] || [];
}
