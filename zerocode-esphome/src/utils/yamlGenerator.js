/**
 * @fileoverview ESPHome YAML configuration generator
 * Converts component selections to valid ESPHome YAML
 *
 * @module utils/yamlGenerator
 */

import { ALL_COMPONENTS, getComponentByType } from "../constants/components";
import { getBoardByValue } from "../constants/boards";

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
 * Check if any component uses I2C bus
 * @param {Array} components - Selected components
 * @returns {boolean} True if I2C is needed
 */
function needsI2C(components) {
  return components.some((c) => {
    const def = getComponentByType(c.type);
    return def?.bus === "i2c";
  });
}

/**
 * Check if any component uses OneWire bus
 * @param {Array} components - Selected components
 * @returns {boolean} True if OneWire is needed
 */
function needsOneWire(components) {
  return components.some((c) => {
    const def = getComponentByType(c.type);
    return def?.bus === "1wire";
  });
}

/**
 * Get first I2C component for pin defaults
 * @param {Array} components - Selected components
 * @returns {Object|null} I2C component or null
 */
function getFirstI2CComponent(components) {
  return (
    components.find((c) => {
      const def = getComponentByType(c.type);
      return def?.bus === "i2c";
    }) || null
  );
}

/**
 * Get first OneWire component for pin defaults
 * @param {Array} components - Selected components
 * @returns {Object|null} OneWire component or null
 */
function getFirstOneWireComponent(components) {
  return (
    components.find((c) => {
      const def = getComponentByType(c.type);
      return def?.bus === "1wire";
    }) || null
  );
}

/**
 * Generate sensor YAML section
 * @param {Array} sensors - Sensor components
 * @returns {string} YAML string
 */
function generateSensorYaml(sensors) {
  if (sensors.length === 0) return "";

  let yaml = "\n# — Sensors ———————————————————————————————————————————————\nsensor:\n";

  for (const component of sensors) {
    const { type, name, gpio, interval } = component;
    const updateInterval = interval || "60s";

    yaml += generateSensorEntry(type, name, gpio, updateInterval, component);
  }

  return yaml;
}

/**
 * Generate individual sensor entry
 * @param {string} type - Sensor type
 * @param {string} name - Sensor name
 * @param {string} gpio - GPIO pin
 * @param {string} interval - Update interval
 * @param {Object} component - Full component object
 * @returns {string} YAML entry
 */
function generateSensorEntry(type, name, gpio, interval, component) {
  const sensorName = name || type;
  const pin = gpio || "4";

  const templates = {
    dht11: `  - platform: dht
    pin: GPIO${pin}
    model: DHT11
    temperature:
      name: "${sensorName} Temperature"
    humidity:
      name: "${sensorName} Humidity"
    update_interval: ${interval}
\n`,
    dht22: `  - platform: dht
    pin: GPIO${pin}
    model: DHT22
    temperature:
      name: "${sensorName} Temperature"
    humidity:
      name: "${sensorName} Humidity"
    update_interval: ${interval}
\n`,
    ds18b20: `  - platform: dallas_temp
    name: "${sensorName}"
    update_interval: ${interval}
\n`,
    bme280: `  - platform: bme280_i2c
    temperature:
      name: "${sensorName} Temperature"
    pressure:
      name: "${sensorName} Pressure"
    humidity:
      name: "${sensorName} Humidity"
    address: 0x76
    update_interval: ${interval}
\n`,
    bme680: `  - platform: bme680_bsec
    temperature:
      name: "${sensorName} Temperature"
    pressure:
      name: "${sensorName} Pressure"
    humidity:
      name: "${sensorName} Humidity"
    iaq:
      name: "${sensorName} IAQ"
    update_interval: ${interval}
\n`,
    bmp280: `  - platform: bmp280
    temperature:
      name: "${sensorName} Temperature"
    pressure:
      name: "${sensorName} Pressure"
    update_interval: ${interval}
\n`,
    bmp085: `  - platform: bmp085
    temperature:
      name: "${sensorName} Temperature"
    pressure:
      name: "${sensorName} Pressure"
    update_interval: ${interval}
\n`,
    aht10: `  - platform: aht10
    temperature:
      name: "${sensorName} Temperature"
    humidity:
      name: "${sensorName} Humidity"
    update_interval: ${interval}
\n`,
    sht31: `  - platform: sht3xd
    temperature:
      name: "${sensorName} Temperature"
    humidity:
      name: "${sensorName} Humidity"
    address: 0x44
    update_interval: ${interval}
\n`,
    sht4x: `  - platform: sht4x
    temperature:
      name: "${sensorName} Temperature"
    humidity:
      name: "${sensorName} Humidity"
    update_interval: ${interval}
\n`,
    htu21d: `  - platform: htu21d
    temperature:
      name: "${sensorName} Temperature"
    humidity:
      name: "${sensorName} Humidity"
    update_interval: ${interval}
\n`,
    tmp102: `  - platform: tmp102
    name: "${sensorName} Temperature"
    update_interval: ${interval}
\n`,
    lm75: `  - platform: lm75
    name: "${sensorName} Temperature"
    update_interval: ${interval}
\n`,
    bh1750: `  - platform: bh1750
    name: "${sensorName} Illuminance"
    address: 0x23
    update_interval: ${interval}
\n`,
    tsl2561: `  - platform: tsl2561
    name: "${sensorName} Illuminance"
    update_interval: ${interval}
\n`,
    tsl2591: `  - platform: tsl2591
    name: "${sensorName} Illuminance"
    update_interval: ${interval}
\n`,
    veml7700: `  - platform: veml7700
    name: "${sensorName} Illuminance"
    update_interval: ${interval}
\n`,
    ldr: `  - platform: adc
    pin: GPIO${component.gpio || "34"}
    name: "${sensorName} Light"
    unit_of_measurement: "%"
    update_interval: ${interval}
\n`,
    hcsr04: `  - platform: ultrasonic
    trigger_pin: GPIO${component.gpioTrig || "12"}
    echo_pin: GPIO${component.gpioEcho || "14"}
    name: "${sensorName} Distance"
    unit_of_measurement: m
    update_interval: ${interval}
\n`,
    vl53l0x: `  - platform: vl53l0x
    name: "${sensorName} Distance"
    update_interval: ${interval}
\n`,
    vl53l1x: `  - platform: vl53l1x
    name: "${sensorName} Distance"
    long_range: true
    update_interval: ${interval}
\n`,
    mpu6050: `  - platform: mpu6050
    address: 0x68
    accel_x:
      name: "${sensorName} Accel X"
    accel_y:
      name: "${sensorName} Accel Y"
    accel_z:
      name: "${sensorName} Accel Z"
    gyro_x:
      name: "${sensorName} Gyro X"
    gyro_y:
      name: "${sensorName} Gyro Y"
    gyro_z:
      name: "${sensorName} Gyro Z"
    temperature:
      name: "${sensorName} Temperature"
    update_interval: ${interval}
\n`,
    ina219: `  - platform: ina219
    address: 0x40
    shunt_resistance: 0.1 ohm
    current:
      name: "${sensorName} Current"
    power:
      name: "${sensorName} Power"
    bus_voltage:
      name: "${sensorName} Bus Voltage"
    update_interval: ${interval}
\n`,
    ina226: `  - platform: ina226
    address: 0x40
    shunt_resistance: 0.1 ohm
    current:
      name: "${sensorName} Current"
    power:
      name: "${sensorName} Power"
    bus_voltage:
      name: "${sensorName} Voltage"
    update_interval: ${interval}
\n`,
    pzem004t: `  - platform: pzemac
    current:
      name: "${sensorName} Current"
    voltage:
      name: "${sensorName} Voltage"
    energy:
      name: "${sensorName} Energy"
    power:
      name: "${sensorName} Power"
    frequency:
      name: "${sensorName} Frequency"
    power_factor:
      name: "${sensorName} Power Factor"
    update_interval: ${interval}
\n`,
    hlw8012: `  - platform: hlw8012
    sel_pin:
      number: GPIO${component.gpioSel || "12"}
      inverted: true
    cf_pin: GPIO${component.gpioCF || "4"}
    cf1_pin: GPIO${component.gpioCF1 || "5"}
    current:
      name: "${sensorName} Current"
    voltage:
      name: "${sensorName} Voltage"
    power:
      name: "${sensorName} Power"
    update_interval: ${interval}
\n`,
    mhz19: `  - platform: mhz19
    co2:
      name: "${sensorName} CO2"
    temperature:
      name: "${sensorName} Temperature"
    update_interval: ${interval}
    automatic_baseline_calibration: false
\n`,
    scd40: `  - platform: scd4x
    co2:
      name: "${sensorName} CO2"
    temperature:
      name: "${sensorName} Temperature"
    humidity:
      name: "${sensorName} Humidity"
    update_interval: ${interval}
\n`,
    scd30: `  - platform: scd30
    co2:
      name: "${sensorName} CO2"
    temperature:
      name: "${sensorName} Temperature"
    humidity:
      name: "${sensorName} Humidity"
    update_interval: ${interval}
\n`,
    sgp30: `  - platform: sgp30
    eco2:
      name: "${sensorName} eCO2"
    tvoc:
      name: "${sensorName} TVOC"
    update_interval: ${interval}
\n`,
    sgp40: `  - platform: sgp4x
    voc:
      name: "${sensorName} VOC Index"
    update_interval: ${interval}
\n`,
    soil: `  - platform: adc
    pin: GPIO${component.gpio || "34"}
    name: "${sensorName} Soil Moisture"
    unit_of_measurement: "%"
    filters:
      - calibrate_linear:
          - 2.32 -> 0
          - 1.05 -> 100
    update_interval: ${interval}
\n`,
    tds: `  - platform: adc
    pin: GPIO${component.gpio || "34"}
    name: "${sensorName} TDS"
    unit_of_measurement: ppm
    update_interval: ${interval}
\n`,
    flow_yfs201: `  - platform: pulse_counter
    pin: GPIO${component.gpio || "14"}
    name: "${sensorName} Water Flow"
    unit_of_measurement: "L/min"
    filters:
      - multiply: 0.00225
    update_interval: ${interval}
\n`,
    rotary: `  - platform: rotary_encoder
    name: "${sensorName}"
    pin_a: GPIO${component.gpioA || "18"}
    pin_b: GPIO${component.gpioB || "19"}
\n`,
    ads1115: `  - platform: ads1115
    multiplexer: 'A0_GND'
    gain: 6.144
    name: "${sensorName}"
    update_interval: ${interval}
\n`,
  };

  return (
    templates[type] ||
    `  - platform: template
    name: "${sensorName}"
    update_interval: ${interval}
\n`
  );
}

/**
 * Generate binary sensor YAML section
 * @param {Array} binaries - Binary sensor components
 * @returns {string} YAML string
 */
function generateBinarySensorYaml(binaries) {
  if (binaries.length === 0) return "";

  let yaml =
    "\n# — Binary Sensors ———————————————————————————————————————\nbinary_sensor:\n";

  for (const component of binaries) {
    const { type, name, gpio, delay } = component;
    const sensorName = name || type;
    const pin = gpio || "4";

    switch (type) {
      case "pir":
        yaml += `  - platform: gpio
    pin: GPIO${pin}
    name: "${sensorName}"
    device_class: motion
    filters:
      - delayed_off: ${delay || "5s"}
\n`;
        break;
      case "button":
      case "switch_gpio":
        yaml += `  - platform: gpio
    pin:
      number: GPIO${pin}
      mode: INPUT_PULLUP
      inverted: true
    name: "${sensorName}"
    filters:
      - delayed_on: 10ms
\n`;
        break;
      case "rain":
        yaml += `  - platform: gpio
    pin:
      number: GPIO${pin}
      inverted: true
    name: "${sensorName}"
    device_class: moisture
\n`;
        break;
      case "water_level":
        yaml += `  - platform: gpio
    pin: GPIO${pin}
    name: "${sensorName}"
    device_class: problem
\n`;
        break;
      case "rcwl0516":
        yaml += `  - platform: gpio
    pin: GPIO${pin}
    name: "${sensorName}"
    device_class: motion
\n`;
        break;
      default:
        yaml += `  - platform: gpio
    pin: GPIO${pin}
    name: "${sensorName}"
\n`;
    }
  }

  return yaml;
}

/**
 * Generate switch YAML section
 * @param {Array} switches - Switch components
 * @returns {string} YAML string
 */
function generateSwitchYaml(switches) {
  if (switches.length === 0) return "";

  let yaml =
    "\n# — Switches ——————————————————————————————————————————————\nswitch:\n";

  for (const component of switches) {
    const { name, gpio, id, restoreMode, inverted } = component;
    const switchName = name || "Relay";
    const pin = gpio || "5";
    const mode = restoreMode || "RESTORE_DEFAULT_OFF";

    yaml += `  - platform: gpio
    pin: GPIO${pin}
    name: "${switchName}"
    id: switch_${id}
    inverted: ${inverted || "false"}
    restore_mode: ${mode}
\n`;
  }

  return yaml;
}

/**
 * Generate light YAML section
 * @param {Array} lights - Light components
 * @returns {string} YAML string
 */
function generateLightYaml(lights) {
  if (lights.length === 0) return "";

  let yaml =
    "\n# — Lights ———————————————————————————————————————————————\nlight:\n";
  let outputYaml = "";

  for (const component of lights) {
    const { type, name, gpio, id, numLeds } = component;
    const lightName = name || type;

    switch (type) {
      case "led":
        yaml += `  - platform: binary
    name: "${lightName}"
    output: output_led_${id}
\n`;
        outputYaml += `  - platform: gpio
    pin: GPIO${gpio || "2"}
    id: output_led_${id}
\n`;
        break;
      case "rgb":
        yaml += `  - platform: rgb
    name: "${lightName}"
    red: output_r_${id}
    green: output_g_${id}
    blue: output_b_${id}
    effects:
      - rainbow:
      - strobe:
      - pulse:
\n`;
        outputYaml += `  - platform: ledc
    pin: GPIO${component.gpioR || "25"}
    id: output_r_${id}
  - platform: ledc
    pin: GPIO${component.gpioG || "26"}
    id: output_g_${id}
  - platform: ledc
    pin: GPIO${component.gpioB || "27"}
    id: output_b_${id}
\n`;
        break;
      case "rgbw":
        yaml += `  - platform: rgbw
    name: "${lightName}"
    red: output_r_${id}
    green: output_g_${id}
    blue: output_b_${id}
    white: output_w_${id}
    effects:
      - rainbow:
      - pulse:
\n`;
        outputYaml += `  - platform: ledc
    pin: GPIO${component.gpioR || "25"}
    id: output_r_${id}
  - platform: ledc
    pin: GPIO${component.gpioG || "26"}
    id: output_g_${id}
  - platform: ledc
    pin: GPIO${component.gpioB || "27"}
    id: output_b_${id}
  - platform: ledc
    pin: GPIO${component.gpioW || "32"}
    id: output_w_${id}
\n`;
        break;
      case "neopixel":
      case "sk6812":
        yaml += `  - platform: neopixelbus
    type: ${type === "sk6812" ? "GRBW" : "GRB"}
    variant: ${type === "sk6812" ? "SK6812" : "WS2812"}
    pin: GPIO${gpio || "2"}
    num_leds: ${numLeds || "30"}
    name: "${lightName}"
    effects:
      - addressable_rainbow:
      - addressable_color_wipe:
      - addressable_fireworks:
\n`;
        break;
    }
  }

  if (outputYaml) {
    yaml += `output:\n${outputYaml}`;
  }

  return yaml;
}

/**
 * Generate fan YAML section
 * @param {Array} fans - Fan components
 * @returns {string} YAML string
 */
function generateFanYaml(fans) {
  if (fans.length === 0) return "";

  let yaml = "fan:\n";
  let outputYaml = "output:\n";

  for (const component of fans) {
    const { name, gpio, id } = component;
    yaml += `  - platform: speed
    output: fan_output_${id}
    name: "${name || "Fan"}"
\n`;
    outputYaml += `  - platform: ledc
    pin: GPIO${gpio || "13"}
    id: fan_output_${id}
\n`;
  }

  return `\n${yaml}${outputYaml}`;
}

/**
 * Generate display YAML section
 * @param {Array} displays - Display components
 * @returns {string} YAML string
 */
function generateDisplayYaml(displays) {
  if (displays.length === 0) return "";

  let yaml =
    "\n# — Displays —————————————————————————————————————————————\n";
  let fontYaml = "";

  for (const component of displays) {
    const { type, name, gpioCS, gpioDC, gpioRST, gpioCLK, gpioDIO } = component;
    const displayName = name || type;

    switch (type) {
      case "ssd1306":
      case "sh1106":
        yaml += `display:
  - platform: ssd1306_i2c
    model: "${
          type === "sh1106" ? "SH1106 128x64" : "SSD1306 128x64"
        }"
    address: 0x3C
    lambda: |-
      it.print(0, 0, id(font_8), "${displayName}");
\nfont:
  - file: "gfonts://Roboto"
    id: font_8
    size: 8
\n`;
        break;
      case "ili9341":
        yaml += `display:
  - platform: ili9xxx
    model: ILI9341
    cs_pin: GPIO${gpioCS || "5"}
    dc_pin: GPIO${gpioDC || "4"}
    reset_pin: GPIO${gpioRST || "22"}
    lambda: |-
      it.fill(Color::BLACK);
      it.print(10, 10, id(font_8), Color(0, 255, 255), "${
          displayName || "Hello ESP!"
        }");
\n`;
        break;
      case "lcd1602":
        yaml += `display:
  - platform: lcd_pcf8574
    dimensions: 16x2
    address: 0x27
    lambda: |-
      it.print("${displayName}");
\n`;
        break;
      case "tm1637":
        yaml += `display:
  - platform: tm1637
    clk_pin: GPIO${gpioCLK || "14"}
    dio_pin: GPIO${gpioDIO || "12"}
    lambda: |-
      it.print("1234");
\n`;
        break;
      default:
        yaml += `# Display: ${displayName} - configure manually
`;
    }
  }

  return yaml;
}

/**
 * Generate complete ESPHome YAML configuration
 * @param {Object} config - Configuration object
 * @param {Object} config.boardDef - Selected board definition
 * @param {string} config.deviceName - Device name
 * @param {string} config.wifiSsid - WiFi SSID
 * @param {string} config.wifiPass - WiFi password
 * @param {Array} config.components - Selected components
 * @param {Object} config.services - Enabled services (api, ota)
 * @returns {string} Complete YAML configuration
 */
export function generateYAML({
  boardDef,
  deviceName,
  wifiSsid,
  wifiPass,
  components,
  services,
}) {
  try {
    // Validate required parameters
    if (!boardDef || typeof boardDef !== "object") {
      throw new Error("Invalid board definition");
    }

    const name = formatDeviceName(deviceName);
    const friendly = formatFriendlyName(deviceName);

    let yaml = `esphome:
  name: ${name}
  friendly_name: "${friendly}"

${boardDef.platform}:
  board: ${boardDef.board}

# — Network ———————————————————————————————————————————————
wifi:
  ssid: "${wifiSsid || "your_wifi_ssid"}"
  password: "${wifiPass || "your_wifi_password"}"
  ap:
    ssid: "${name.toUpperCase().replace(/-/g, "_")}_AP"
    password: "fallback_password"

captive_portal:

# — Core Services ————————————————————————————————————————
logger:
`;

    // Add optional services
    if (services?.api) {
      yaml += "\napi:\n";
    }
    if (services?.ota) {
      yaml += "\nota:\n  platform: esphome\n";
    }

    // Return early if no components
    if (!Array.isArray(components) || components.length === 0) {
      return yaml;
    }

    // Add I2C configuration if needed
    if (needsI2C(components)) {
      const i2cComponent = getFirstI2CComponent(components);
      const sda = i2cComponent?.i2cSda || "21";
      const scl = i2cComponent?.i2cScl || "22";
      yaml += `\ni2c:
  sda: GPIO${sda}
  scl: GPIO${scl}
  scan: true
`;
    }

    // Add OneWire configuration if needed
    if (needsOneWire(components)) {
      const owComponent = getFirstOneWireComponent(components);
      const owPin = owComponent?.gpio || "4";
      yaml += `\none_wire:
  - platform: gpio
    pin: GPIO${owPin}
`;
    }

    // Group components by platform
    const sensors = [];
    const binaries = [];
    const switches = [];
    const lights = [];
    const fans = [];
    const displays = [];

    for (const component of components) {
      const def = getComponentByType(component.type);
      if (!def) continue;

      switch (def.platform) {
        case "sensor":
          sensors.push(component);
          break;
        case "binary":
          binaries.push(component);
          break;
        case "switch":
          switches.push(component);
          break;
        case "light":
          lights.push(component);
          break;
        case "fan":
          fans.push(component);
          break;
        case "display":
          displays.push(component);
          break;
        default:
          // Skip unknown platforms
          break;
      }
    }

    // Add platform-specific sections
    yaml += generateSensorYaml(sensors);
    yaml += generateBinarySensorYaml(binaries);
    yaml += generateSwitchYaml(switches);
    yaml += generateLightYaml(lights);
    yaml += generateFanYaml(fans);
    yaml += generateDisplayYaml(displays);

    return yaml;
  } catch (error) {
    console.error("Error generating YAML:", error);
    return `# Error generating configuration
# ${error.message}
`;
  }
}

/**
 * Download YAML as file
 * @param {string} yaml - YAML content
 * @param {string} deviceName - Device name for filename
 */
export function downloadYaml(yaml, deviceName) {
  try {
    if (!yaml || typeof yaml !== "string") {
      throw new Error("Invalid YAML content");
    }

    const name = formatDeviceName(deviceName) || "esphome";
    const blob = new Blob([yaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.yaml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading YAML:", error);
    alert("Failed to download YAML file");
  }
}

/**
 * Copy YAML to clipboard
 * @param {string} yaml - YAML content
 * @returns {Promise<boolean>} Success status
 */
export async function copyYamlToClipboard(yaml) {
  try {
    if (!yaml || typeof yaml !== "string") {
      throw new Error("Invalid YAML content");
    }

    await navigator.clipboard.writeText(yaml);
    return true;
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    return false;
  }
}
