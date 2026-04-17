import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   MASSIVE COMPONENT DATABASE - Open Source Ready
   ============================================================ */
const COMPONENT_DB = {
  temperature: [
    { type:"dht11",      label:"DHT11",           icon:"🌡️", desc:"Temperature & Humidity",           bus:"gpio",  platform:"sensor",  tags:["temp","humidity"] },
    { type:"dht22",      label:"DHT22 / AM2302",   icon:"🌡️", desc:"High precision Temp & Humidity",   bus:"gpio",  platform:"sensor",  tags:["temp","humidity"] },
    { type:"ds18b20",    label:"DS18B20",           icon:"🌡️", desc:"OneWire waterproof temperature",   bus:"1wire", platform:"sensor",  tags:["temp","waterproof"] },
    { type:"bme280",     label:"BME280",            icon:"🌤️", desc:"Temp / Humidity / Pressure I²C",   bus:"i2c",   platform:"sensor",  tags:["temp","humidity","pressure"] },
    { type:"bme680",     label:"BME680",            icon:"🌫️", desc:"Temp / Humidity / Pressure / Gas", bus:"i2c",   platform:"sensor",  tags:["temp","humidity","pressure","gas"] },
    { type:"bmp280",     label:"BMP280",            icon:"🏔️", desc:"Pressure & Temperature I²C",       bus:"i2c",   platform:"sensor",  tags:["temp","pressure"] },
    { type:"bmp085",     label:"BMP085/BMP180",     icon:"🏔️", desc:"Barometric pressure I²C",          bus:"i2c",   platform:"sensor",  tags:["temp","pressure"] },
    { type:"aht10",      label:"AHT10 / AHT20",     icon:"💧", desc:"Temp & Humidity I²C",               bus:"i2c",   platform:"sensor",  tags:["temp","humidity"] },
    { type:"sht31",      label:"SHT31",             icon:"🌡️", desc:"High accuracy Temp & Humidity",    bus:"i2c",   platform:"sensor",  tags:["temp","humidity"] },
    { type:"sht4x",      label:"SHT40/SHT41/SHT45", icon:"🌡️", desc:"Ultra precision Temp & Humidity", bus:"i2c",   platform:"sensor",  tags:["temp","humidity"] },
    { type:"htu21d",     label:"HTU21D",            icon:"💧", desc:"Temp & Humidity I²C",               bus:"i2c",   platform:"sensor",  tags:["temp","humidity"] },
    { type:"tmp102",     label:"TMP102",            icon:"🌡️", desc:"Digital temperature I²C",          bus:"i2c",   platform:"sensor",  tags:["temp"] },
    { type:"lm75",       label:"LM75",              icon:"🌡️", desc:"Temperature I²C",                  bus:"i2c",   platform:"sensor",  tags:["temp"] },
    { type:"max6675",    label:"MAX6675",           icon:"🔥", desc:"Thermocouple K-type SPI",           bus:"spi",   platform:"sensor",  tags:["temp","thermocouple"] },
    { type:"max31855",   label:"MAX31855",          icon:"🔥", desc:"Thermocouple SPI",                  bus:"spi",   platform:"sensor",  tags:["temp","thermocouple"] },
    { type:"ntc",        label:"NTC Thermistor",    icon:"🌡️", desc:"Analog NTC temperature",           bus:"adc",   platform:"sensor",  tags:["temp","analog"] },
  ],
  light: [
    { type:"bh1750",     label:"BH1750",            icon:"☀️", desc:"Ambient light lux I²C",            bus:"i2c",   platform:"sensor",  tags:["light","lux"] },
    { type:"tsl2561",    label:"TSL2561",           icon:"☀️", desc:"Luminosity I²C",                   bus:"i2c",   platform:"sensor",  tags:["light","lux"] },
    { type:"tsl2591",    label:"TSL2591",           icon:"☀️", desc:"High dynamic range light I²C",     bus:"i2c",   platform:"sensor",  tags:["light","lux"] },
    { type:"apds9960",   label:"APDS9960",          icon:"🌈", desc:"Gesture / Light / Color / Proximity", bus:"i2c", platform:"sensor", tags:["light","gesture","proximity"] },
    { type:"veml7700",   label:"VEML7700",          icon:"☀️", desc:"Ambient light I²C",                bus:"i2c",   platform:"sensor",  tags:["light","lux"] },
    { type:"ldr",        label:"LDR Photoresistor", icon:"💡", desc:"Analog light sensor",              bus:"adc",   platform:"sensor",  tags:["light","analog"] },
    { type:"max44009",   label:"MAX44009",          icon:"☀️", desc:"Ultra-low power light I²C",        bus:"i2c",   platform:"sensor",  tags:["light","lux"] },
  ],
  motion: [
    { type:"pir",        label:"HC-SR501 PIR",      icon:"👁️", desc:"Passive infrared motion",         bus:"gpio",  platform:"binary",  tags:["motion","pir"] },
    { type:"rcwl0516",   label:"RCWL-0516",         icon:"📡", desc:"Microwave radar motion",           bus:"gpio",  platform:"binary",  tags:["motion","radar"] },
    { type:"ld2410",     label:"HLK-LD2410",        icon:"📡", desc:"mmWave presence sensor UART",      bus:"uart",  platform:"sensor",  tags:["motion","mmwave","presence"] },
    { type:"hcsr04",     label:"HC-SR04 Ultrasonic",icon:"📏", desc:"Distance measurement",             bus:"gpio",  platform:"sensor",  tags:["distance","ultrasonic"] },
    { type:"vl53l0x",    label:"VL53L0X",           icon:"📏", desc:"Time-of-flight distance I²C",      bus:"i2c",   platform:"sensor",  tags:["distance","tof"] },
    { type:"vl53l1x",    label:"VL53L1X",           icon:"📏", desc:"Long range ToF I²C",               bus:"i2c",   platform:"sensor",  tags:["distance","tof"] },
    { type:"apds9960p",  label:"APDS9960 Proximity",icon:"👆", desc:"Proximity detection I²C",         bus:"i2c",   platform:"sensor",  tags:["proximity"] },
    { type:"mpu6050",    label:"MPU-6050",          icon:"🎮", desc:"6-axis IMU Accel+Gyro I²C",        bus:"i2c",   platform:"sensor",  tags:["imu","accelerometer","gyroscope"] },
    { type:"mpu9250",    label:"MPU-9250",          icon:"🎮", desc:"9-axis IMU I²C",                   bus:"i2c",   platform:"sensor",  tags:["imu","compass"] },
    { type:"qmc5883l",   label:"QMC5883L Compass",  icon:"🧭", desc:"3-axis magnetometer I²C",         bus:"i2c",   platform:"sensor",  tags:["compass","magnetic"] },
    { type:"lis3dh",     label:"LIS3DH",            icon:"🎮", desc:"3-axis accelerometer I²C",        bus:"i2c",   platform:"sensor",  tags:["accelerometer"] },
  ],
  air_quality: [
    { type:"mhz19",      label:"MH-Z19",            icon:"💨", desc:"CO₂ NDIR sensor UART",             bus:"uart",  platform:"sensor",  tags:["co2","air"] },
    { type:"scd40",      label:"SCD40 / SCD41",     icon:"🌬️", desc:"True CO₂ photoacoustic I²C",       bus:"i2c",   platform:"sensor",  tags:["co2","air","humidity","temp"] },
    { type:"scd30",      label:"SCD30",             icon:"🌬️", desc:"CO₂ / Temp / Humidity I²C",        bus:"i2c",   platform:"sensor",  tags:["co2","air"] },
    { type:"sgp30",      label:"SGP30",             icon:"🌫️", desc:"VOC & eCO₂ I²C",                   bus:"i2c",   platform:"sensor",  tags:["voc","co2","air"] },
    { type:"sgp40",      label:"SGP40",             icon:"🌫️", desc:"VOC index I²C",                    bus:"i2c",   platform:"sensor",  tags:["voc","air"] },
    { type:"ccs811",     label:"CCS811",            icon:"🏭", desc:"VOC & eCO₂ I²C",                   bus:"i2c",   platform:"sensor",  tags:["voc","co2","air"] },
    { type:"pmsa003i",   label:"PMSA003I",          icon:"🌫️", desc:"PM1/PM2.5/PM10 I²C",               bus:"i2c",   platform:"sensor",  tags:["pm25","dust","air"] },
    { type:"sen0177",    label:"SEN0177 PMSA003",   icon:"🌫️", desc:"Particle sensor UART",             bus:"uart",  platform:"sensor",  tags:["pm25","dust"] },
    { type:"mics4514",   label:"MICS-4514",         icon:"🏭", desc:"CO & NO₂ analog",                  bus:"adc",   platform:"sensor",  tags:["co","no2","gas"] },
    { type:"mq2",        label:"MQ-2 Gas",          icon:"🔥", desc:"LPG / Propane / Hydrogen",         bus:"adc",   platform:"sensor",  tags:["gas","analog"] },
    { type:"mq135",      label:"MQ-135 Air Quality",icon:"🌫️", desc:"Ammonia / Benzene / CO₂",          bus:"adc",   platform:"sensor",  tags:["air","gas","analog"] },
    { type:"sen55",      label:"SEN55",             icon:"🌬️", desc:"PM / NOx / VOC / Temp / RH I²C",   bus:"i2c",   platform:"sensor",  tags:["pm25","voc","air"] },
  ],
  water: [
    { type:"soil",       label:"Capacitive Soil",   icon:"🌱", desc:"Soil moisture analog",             bus:"adc",   platform:"sensor",  tags:["moisture","soil","garden"] },
    { type:"rain",       label:"Rain Sensor",       icon:"🌧️", desc:"Rain detection analog",            bus:"adc",   platform:"binary",  tags:["rain","weather"] },
    { type:"water_level",label:"Water Level",       icon:"💧", desc:"Float switch / level",             bus:"gpio",  platform:"binary",  tags:["water","level"] },
    { type:"flow_yfs201",label:"YF-S201 Flow",      icon:"🚿", desc:"Water flow pulse sensor",          bus:"gpio",  platform:"sensor",  tags:["flow","water"] },
    { type:"atlas_ph",   label:"Atlas pH",          icon:"🧪", desc:"pH probe I²C",                    bus:"i2c",   platform:"sensor",  tags:["ph","water","chemistry"] },
    { type:"tds",        label:"TDS Meter",         icon:"💧", desc:"Total dissolved solids analog",    bus:"adc",   platform:"sensor",  tags:["tds","water","quality"] },
    { type:"turbidity",  label:"Turbidity",         icon:"🌊", desc:"Water turbidity analog",           bus:"adc",   platform:"sensor",  tags:["turbidity","water"] },
    { type:"mlx90614",   label:"MLX90614",          icon:"🌡️", desc:"Non-contact IR temperature I²C",  bus:"i2c",   platform:"sensor",  tags:["temp","ir","contactless"] },
  ],
  power: [
    { type:"ina219",     label:"INA219",            icon:"⚡", desc:"Current / Voltage / Power I²C",   bus:"i2c",   platform:"sensor",  tags:["current","voltage","power"] },
    { type:"ina226",     label:"INA226",            icon:"⚡", desc:"High-side power monitor I²C",     bus:"i2c",   platform:"sensor",  tags:["current","voltage","power"] },
    { type:"ina3221",    label:"INA3221",           icon:"⚡", desc:"3-channel power monitor I²C",     bus:"i2c",   platform:"sensor",  tags:["current","voltage","power"] },
    { type:"pzem004t",   label:"PZEM-004T",         icon:"🔌", desc:"AC power meter UART",              bus:"uart",  platform:"sensor",  tags:["ac","power","energy"] },
    { type:"cse7766",    label:"CSE7766",           icon:"🔌", desc:"AC power measure UART (Sonoff)",   bus:"uart",  platform:"sensor",  tags:["ac","power","energy"] },
    { type:"hlw8012",    label:"HLW8012",           icon:"🔌", desc:"AC power measure GPIO (Sonoff)",   bus:"gpio",  platform:"sensor",  tags:["ac","power","energy"] },
    { type:"bl0937",     label:"BL0937",            icon:"🔌", desc:"AC energy monitor GPIO",           bus:"gpio",  platform:"sensor",  tags:["ac","power","energy"] },
    { type:"ads1115",    label:"ADS1115",           icon:"📊", desc:"16-bit ADC 4-ch I²C",             bus:"i2c",   platform:"sensor",  tags:["adc","analog","precision"] },
    { type:"ads1015",    label:"ADS1015",           icon:"📊", desc:"12-bit ADC 4-ch I²C",             bus:"i2c",   platform:"sensor",  tags:["adc","analog"] },
  ],
  displays: [
    { type:"ssd1306",    label:"SSD1306 OLED",      icon:"🖥️", desc:"128x64 OLED I²C/SPI",             bus:"i2c",   platform:"display", tags:["display","oled"] },
    { type:"ssd1327",    label:"SSD1327 OLED",      icon:"🖥️", desc:"128x128 grayscale OLED I²C",      bus:"i2c",   platform:"display", tags:["display","oled"] },
    { type:"sh1106",     label:"SH1106 OLED",       icon:"🖥️", desc:"132x64 OLED I²C",                 bus:"i2c",   platform:"display", tags:["display","oled"] },
    { type:"ili9341",    label:"ILI9341 TFT",       icon:"📱", desc:"2.4\" 320x240 TFT SPI",           bus:"spi",   platform:"display", tags:["display","tft","color"] },
    { type:"st7789",     label:"ST7789 TFT",        icon:"📱", desc:"240x240 TFT SPI",                 bus:"spi",   platform:"display", tags:["display","tft","color"] },
    { type:"epaper",     label:"Waveshare e-Paper", icon:"📄", desc:"E-ink display SPI",               bus:"spi",   platform:"display", tags:["display","epaper"] },
    { type:"tm1637",     label:"TM1637 7-seg",      icon:"🔢", desc:"4-digit 7-segment display GPIO",  bus:"gpio",  platform:"display", tags:["display","7segment"] },
    { type:"max7219",    label:"MAX7219 Matrix",    icon:"⬛", desc:"8x8 LED matrix SPI",              bus:"spi",   platform:"display", tags:["display","matrix"] },
    { type:"lcd1602",    label:"LCD 1602 / 2004",   icon:"📟", desc:"Character LCD I²C (PCF8574)",     bus:"i2c",   platform:"display", tags:["display","lcd"] },
  ],
  outputs: [
    { type:"relay",      label:"Relay Module",      icon:"⚡", desc:"GPIO relay switch",               bus:"gpio",  platform:"switch",  tags:["relay","switch","ac"] },
    { type:"led",        label:"Single LED",        icon:"💡", desc:"GPIO LED output",                 bus:"gpio",  platform:"switch",  tags:["led","light"] },
    { type:"rgb",        label:"RGB LED",           icon:"🌈", desc:"PWM RGB light",                   bus:"pwm",   platform:"light",   tags:["rgb","led","color"] },
    { type:"rgbw",       label:"RGBW LED",          icon:"🌈", desc:"PWM RGBW light",                  bus:"pwm",   platform:"light",   tags:["rgbw","led","color"] },
    { type:"neopixel",   label:"NeoPixel / WS2812", icon:"💫", desc:"Addressable LED strip GPIO",      bus:"gpio",  platform:"light",   tags:["neopixel","ws2812","addressable"] },
    { type:"sk6812",     label:"SK6812 RGBW",       icon:"💫", desc:"RGBW addressable strip GPIO",     bus:"gpio",  platform:"light",   tags:["sk6812","addressable"] },
    { type:"servo",      label:"Servo Motor",       icon:"🔧", desc:"PWM servo control",               bus:"pwm",   platform:"output",  tags:["servo","motor","pwm"] },
    { type:"stepper",    label:"Stepper Motor",     icon:"⚙️", desc:"A4988 / DRV8825 stepper",        bus:"gpio",  platform:"output",  tags:["stepper","motor"] },
    { type:"buzzer",     label:"Passive Buzzer",    icon:"🔔", desc:"PWM tone generator",              bus:"pwm",   platform:"output",  tags:["buzzer","sound","tone"] },
    { type:"fan",        label:"PWM Fan",           icon:"🌀", desc:"PWM fan speed control",           bus:"pwm",   platform:"fan",     tags:["fan","pwm","cooling"] },
    { type:"dac",        label:"DAC Output",        icon:"🔊", desc:"Analog voltage output",           bus:"dac",   platform:"output",  tags:["dac","analog"] },
  ],
  network: [
    { type:"button",     label:"Push Button",       icon:"🔘", desc:"Physical button GPIO",            bus:"gpio",  platform:"binary",  tags:["button","input"] },
    { type:"switch_gpio",label:"Toggle Switch",     icon:"🎚️", desc:"Toggle switch GPIO",              bus:"gpio",  platform:"binary",  tags:["switch","input"] },
    { type:"rotary",     label:"Rotary Encoder",    icon:"🎛️", desc:"Rotary encoder GPIO",             bus:"gpio",  platform:"sensor",  tags:["encoder","rotary","input"] },
    { type:"pn532",      label:"PN532 NFC",         icon:"📶", desc:"NFC/RFID reader I²C/SPI",         bus:"i2c",   platform:"binary",  tags:["nfc","rfid"] },
    { type:"rc522",      label:"RC522 RFID",        icon:"📶", desc:"RFID reader SPI",                 bus:"spi",   platform:"binary",  tags:["rfid","nfc"] },
    { type:"fingerprint",label:"R503 Fingerprint",  icon:"👆", desc:"Fingerprint sensor UART",         bus:"uart",  platform:"binary",  tags:["fingerprint","biometric"] },
  ],
};

const ALL_COMPONENTS = Object.values(COMPONENT_DB).flat();

/* ============================================================
   YAML GENERATOR - Clean output, no HTML tags
   ============================================================ */
const generateYAML = ({ boardType, deviceName, wifiSsid, wifiPass, components, services }) => {
  const boardMap = { esp32:"esp32dev", esp32s2:"lolin_s2_mini", esp32c3:"seeed_xiao_esp32c3", esp32s3:"esp32-s3-devkitc-1", esp8266:"nodemcuv2", esp8285:"esp8285" };
  const platformMap = { esp32:"esp32", esp32s2:"esp32", esp32c3:"esp32", esp32s3:"esp32", esp8266:"esp8266", esp8285:"esp8266" };
  const name = deviceName || "my-device";
  const friendly = name.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  let y = `esphome:
  name: ${name}
  friendly_name: "${friendly}"

${platformMap[boardType] || "esp32"}:
  board: ${boardMap[boardType] || "esp32dev"}

# — Network ————————————————————————————————————————————————
wifi:
  ssid: "${wifiSsid || "your_wifi_ssid"}"
  password: "${wifiPass || "your_wifi_password"}"
  ap:
    ssid: "${name.toUpperCase().replace(/-/g,"_")}_AP"
    password: "fallback_password"

captive_portal:

# — Core Services ——————————————————————————————————————————
logger:
`;

  if (services?.api)  y += `\napi:\n  encryption:\n    key: !secret api_key\n`;
  if (services?.ota)  y += `\nota:\n  platform: esphome\n  password: !secret ota_password\n`;

  if (components.length === 0) return y;

  // I2C bus
  const hasI2C = components.some(c => ALL_COMPONENTS.find(d => d.type === c.type)?.bus === "i2c");
  if (hasI2C) {
    const sda = components.find(c => ALL_COMPONENTS.find(d => d.type === c.type)?.bus === "i2c")?.i2cSda || "21";
    const scl = components.find(c => ALL_COMPONENTS.find(d => d.type === c.type)?.bus === "i2c")?.i2cScl || "22";
    y += `\ni2c:\n  sda: GPIO${sda}\n  scl: GPIO${scl}\n  scan: true\n`;
  }

  // OneWire bus
  const hasOW = components.some(c => ALL_COMPONENTS.find(d => d.type === c.type)?.bus === "1wire");
  if (hasOW) {
    const owPin = components.find(c => ALL_COMPONENTS.find(d => d.type === c.type)?.bus === "1wire")?.gpio || "4";
    y += `\none_wire:\n  - platform: gpio\n    pin: GPIO${owPin}\n`;
  }

  // Sensors
  const sensors = components.filter(c => {
    const def = ALL_COMPONENTS.find(d => d.type === c.type);
    return def?.platform === "sensor";
  });
  if (sensors.length > 0) {
    y += `\n# — Sensors ———————————————————————————————————————————————\nsensor:\n`;
    sensors.forEach(c => {
      const interval = c.interval || "60s";
      switch(c.type) {
        case "dht11": case "dht22":
          y += `  - platform: dht\n    pin: GPIO${c.gpio||"4"}\n    model: ${c.type.toUpperCase()}\n    temperature:\n      name: "${c.name||"Temperature"}"\n    humidity:\n      name: "${(c.name||"Humidity")} Humidity"\n    update_interval: ${interval}\n\n`;
          break;
        case "ds18b20":
          y += `  - platform: dallas_temp\n    name: "${c.name||"Temperature"}"\n    update_interval: ${interval}\n\n`;
          break;
        case "bme280":
          y += `  - platform: bme280_i2c\n    temperature:\n      name: "${c.name||"BME280 Temperature"}"\n    pressure:\n      name: "${c.name||"BME280"} Pressure"\n    humidity:\n      name: "${c.name||"BME280"} Humidity"\n    address: 0x76\n    update_interval: ${interval}\n\n`;
          break;
        case "bme680":
          y += `  - platform: bme680_bsec\n    temperature:\n      name: "${c.name||"BME680 Temperature"}"\n    pressure:\n      name: "${c.name||"BME680"} Pressure"\n    humidity:\n      name: "${c.name||"BME680"} Humidity"\n    iaq:\n      name: "${c.name||"BME680"} IAQ"\n    update_interval: ${interval}\n\n`;
          break;
        case "bmp280": case "bmp085":
          y += `  - platform: ${c.type === "bmp085" ? "bmp085" : "bmp280"}\n    temperature:\n      name: "${c.name||"Temperature"}"\n    pressure:\n      name: "${c.name||"Pressure"}"\n    update_interval: ${interval}\n\n`;
          break;
        case "aht10":
          y += `  - platform: aht10\n    temperature:\n      name: "${c.name||"AHT10 Temperature"}"\n    humidity:\n      name: "${c.name||"AHT10"} Humidity"\n    update_interval: ${interval}\n\n`;
          break;
        case "sht31":
          y += `  - platform: sht3xd\n    temperature:\n      name: "${c.name||"SHT31 Temperature"}"\n    humidity:\n      name: "${c.name||"SHT31"} Humidity"\n    address: 0x44\n    update_interval: ${interval}\n\n`;
          break;
        case "sht4x":
          y += `  - platform: sht4x\n    temperature:\n      name: "${c.name||"SHT4x Temperature"}"\n    humidity:\n      name: "${c.name||"SHT4x"} Humidity"\n    update_interval: ${interval}\n\n`;
          break;
        case "htu21d":
          y += `  - platform: htu21d\n    temperature:\n      name: "${c.name||"HTU21D Temperature"}"\n    humidity:\n      name: "${c.name||"HTU21D"} Humidity"\n    update_interval: ${interval}\n\n`;
          break;
        case "tmp102":
          y += `  - platform: tmp102\n    name: "${c.name||"TMP102 Temperature"}"\n    update_interval: ${interval}\n\n`;
          break;
        case "lm75":
          y += `  - platform: lm75\n    name: "${c.name||"LM75 Temperature"}"\n    update_interval: ${interval}\n\n`;
          break;
        case "ntc":
          y += `  - platform: ntc\n    sensor: adc_ntc_${c.id}\n    name: "${c.name||"NTC Temperature"}"\n    calibration:\n      b_constant: 3950\n      reference_temperature: 25°C\n      reference_resistance: 10kOhm\n\n`;
          break;
        case "bh1750":
          y += `  - platform: bh1750\n    name: "${c.name||"Illuminance"}"\n    address: 0x23\n    update_interval: ${interval}\n\n`;
          break;
        case "tsl2561":
          y += `  - platform: tsl2561\n    name: "${c.name||"TSL2561 Illuminance"}"\n    update_interval: ${interval}\n\n`;
          break;
        case "tsl2591":
          y += `  - platform: tsl2591\n    name: "${c.name||"TSL2591 Illuminance"}"\n    update_interval: ${interval}\n\n`;
          break;
        case "veml7700":
          y += `  - platform: veml7700\n    name: "${c.name||"VEML7700 Illuminance"}"\n    update_interval: ${interval}\n\n`;
          break;
        case "ldr":
          y += `  - platform: adc\n    pin: GPIO${c.gpio||"34"}\n    name: "${c.name||"LDR Light"}"\n    unit_of_measurement: "%"\n    update_interval: ${interval}\n\n`;
          break;
        case "hcsr04":
          y += `  - platform: ultrasonic\n    trigger_pin: GPIO${c.gpioTrig||"12"}\n    echo_pin: GPIO${c.gpioEcho||"14"}\n    name: "${c.name||"Distance"}"\n    unit_of_measurement: m\n    update_interval: ${interval}\n\n`;
          break;
        case "vl53l0x":
          y += `  - platform: vl53l0x\n    name: "${c.name||"ToF Distance"}"\n    update_interval: ${interval}\n\n`;
          break;
        case "vl53l1x":
          y += `  - platform: vl53l1x\n    name: "${c.name||"ToF Distance"}"\n    long_range: true\n    update_interval: ${interval}\n\n`;
          break;
        case "mpu6050":
          y += `  - platform: mpu6050\n    address: 0x68\n    accel_x:\n      name: "${c.name||"MPU6050"} Accel X"\n    accel_y:\n      name: "${c.name||"MPU6050"} Accel Y"\n    accel_z:\n      name: "${c.name||"MPU6050"} Accel Z"\n    gyro_x:\n      name: "${c.name||"MPU6050"} Gyro X"\n    gyro_y:\n      name: "${c.name||"MPU6050"} Gyro Y"\n    gyro_z:\n      name: "${c.name||"MPU6050"} Gyro Z"\n    temperature:\n      name: "${c.name||"MPU6050"} Temperature"\n    update_interval: ${interval}\n\n`;
          break;
        case "ina219":
          y += `  - platform: ina219\n    address: 0x40\n    shunt_resistance: 0.1 ohm\n    current:\n      name: "${c.name||"INA219"} Current"\n    power:\n      name: "${c.name||"INA219"} Power"\n    bus_voltage:\n      name: "${c.name||"INA219"} Bus Voltage"\n    update_interval: ${interval}\n\n`;
          break;
        case "ina226":
          y += `  - platform: ina226\n    address: 0x40\n    shunt_resistance: 0.1 ohm\n    current:\n      name: "${c.name||"INA226"} Current"\n    power:\n      name: "${c.name||"INA226"} Power"\n    bus_voltage:\n      name: "${c.name||"INA226"} Voltage"\n    update_interval: ${interval}\n\n`;
          break;
        case "pzem004t":
          y += `  - platform: pzemac\n    current:\n      name: "${c.name||"PZEM"} Current"\n    voltage:\n      name: "${c.name||"PZEM"} Voltage"\n    energy:\n      name: "${c.name||"PZEM"} Energy"\n    power:\n      name: "${c.name||"PZEM"} Power"\n    frequency:\n      name: "${c.name||"PZEM"} Frequency"\n    power_factor:\n      name: "${c.name||"PZEM"} Power Factor"\n    update_interval: ${interval}\n\n`;
          break;
        case "hlw8012":
          y += `  - platform: hlw8012\n    sel_pin:\n      number: GPIO${c.gpioSel||"12"}\n      inverted: true\n    cf_pin: GPIO${c.gpioCF||"4"}\n    cf1_pin: GPIO${c.gpioCF1||"5"}\n    current:\n      name: "${c.name||"HLW8012"} Current"\n    voltage:\n      name: "${c.name||"HLW8012"} Voltage"\n    power:\n      name: "${c.name||"HLW8012"} Power"\n    update_interval: ${interval}\n\n`;
          break;
        case "mhz19":
          y += `  - platform: mhz19\n    co2:\n      name: "${c.name||"MH-Z19 CO2"}"\n    temperature:\n      name: "${c.name||"MH-Z19"} Temperature"\n    update_interval: ${interval}\n    automatic_baseline_calibration: false\n\n`;
          break;
        case "scd40": case "scd41":
          y += `  - platform: scd4x\n    co2:\n      name: "${c.name||"SCD4x CO2"}"\n    temperature:\n      name: "${c.name||"SCD4x"} Temperature"\n    humidity:\n      name: "${c.name||"SCD4x"} Humidity"\n    update_interval: ${interval}\n\n`;
          break;
        case "scd30":
          y += `  - platform: scd30\n    co2:\n      name: "${c.name||"SCD30 CO2"}"\n    temperature:\n      name: "${c.name||"SCD30"} Temperature"\n    humidity:\n      name: "${c.name||"SCD30"} Humidity"\n    update_interval: ${interval}\n\n`;
          break;
        case "sgp30":
          y += `  - platform: sgp30\n    eco2:\n      name: "${c.name||"SGP30 eCO2"}"\n    tvoc:\n      name: "${c.name||"SGP30"} TVOC"\n    update_interval: ${interval}\n\n`;
          break;
        case "sgp40":
          y += `  - platform: sgp4x\n    voc:\n      name: "${c.name||"SGP40 VOC Index"}"\n    update_interval: ${interval}\n\n`;
          break;
        case "soil":
          y += `  - platform: adc\n    pin: GPIO${c.gpio||"34"}\n    name: "${c.name||"Soil Moisture"}"\n    unit_of_measurement: "%"\n    filters:\n      - calibrate_linear:\n          - 2.32 -> 0\n          - 1.05 -> 100\n    update_interval: ${interval}\n\n`;
          break;
        case "tds":
          y += `  - platform: adc\n    pin: GPIO${c.gpio||"34"}\n    name: "${c.name||"TDS"}"\n    unit_of_measurement: ppm\n    update_interval: ${interval}\n\n`;
          break;
        case "flow_yfs201":
          y += `  - platform: pulse_counter\n    pin: GPIO${c.gpio||"14"}\n    name: "${c.name||"Water Flow"}"\n    unit_of_measurement: "L/min"\n    filters:\n      - multiply: 0.00225\n    update_interval: ${interval}\n\n`;
          break;
        case "rotary":
          y += `  - platform: rotary_encoder\n    name: "${c.name||"Rotary Encoder"}"\n    pin_a: GPIO${c.gpioA||"18"}\n    pin_b: GPIO${c.gpioB||"19"}\n\n`;
          break;
        case "ads1115":
          y += `  - platform: ads1115\n    multiplexer: 'A0_GND'\n    gain: 6.144\n    name: "${c.name||"ADS1115"}"\n    update_interval: ${interval}\n\n`;
          break;
        default:
          y += `  - platform: template\n    name: "${c.name||c.type}"\n    update_interval: ${interval}\n\n`;
      }
    });
  }

  // Binary sensors
  const binaries = components.filter(c => {
    const def = ALL_COMPONENTS.find(d => d.type === c.type);
    return def?.platform === "binary";
  });
  if (binaries.length > 0) {
    y += `# — Binary Sensors ————————————————————————————————————————\nbinary_sensor:\n`;
    binaries.forEach(c => {
      switch(c.type) {
        case "pir":
          y += `  - platform: gpio\n    pin: GPIO${c.gpio||"14"}\n    name: "${c.name||"Motion"}"\n    device_class: motion\n    filters:\n      - delayed_off: ${c.delay||"5s"}\n\n`;
          break;
        case "button": case "switch_gpio":
          y += `  - platform: gpio\n    pin:\n      number: GPIO${c.gpio||"0"}\n      mode: INPUT_PULLUP\n      inverted: true\n    name: "${c.name||"Button"}"\n    filters:\n      - delayed_on: 10ms\n\n`;
          break;
        case "rain":
          y += `  - platform: gpio\n    pin:\n      number: GPIO${c.gpio||"13"}\n      inverted: true\n    name: "${c.name||"Rain Sensor"}"\n    device_class: moisture\n\n`;
          break;
        case "water_level":
          y += `  - platform: gpio\n    pin: GPIO${c.gpio||"15"}\n    name: "${c.name||"Water Level"}"\n    device_class: problem\n\n`;
          break;
        case "rcwl0516":
          y += `  - platform: gpio\n    pin: GPIO${c.gpio||"14"}\n    name: "${c.name||"Radar Motion"}"\n    device_class: motion\n\n`;
          break;
        default:
          y += `  - platform: gpio\n    pin: GPIO${c.gpio||"4"}\n    name: "${c.name||c.type}"\n\n`;
      }
    });
  }

  // Outputs / lights / switches
  const switches = components.filter(c => ALL_COMPONENTS.find(d => d.type === c.type)?.platform === "switch");
  if (switches.length > 0) {
    y += `# — Switches ——————————————————————————————————————————————\nswitch:\n`;
    switches.forEach(c => {
      y += `  - platform: gpio\n    pin: GPIO${c.gpio||"5"}\n    name: "${c.name||"Relay"}"\n    id: switch_${c.id}\n    inverted: ${c.inverted||"false"}\n    restore_mode: ${c.restoreMode||"RESTORE_DEFAULT_OFF"}\n\n`;
    });
  }

  const lights = components.filter(c => ["led","rgb","rgbw","neopixel","sk6812"].includes(c.type));
  if (lights.length > 0) {
    y += `# — Lights ————————————————————————————————————————————————\nlight:\n`;
    lights.forEach(c => {
      if (c.type === "led") {
        y += `  - platform: binary\n    name: "${c.name||"LED"}"\n    output: output_led_${c.id}\n\n`;
      } else if (c.type === "rgb") {
        y += `  - platform: rgb\n    name: "${c.name||"RGB Light"}"\n    red: output_r_${c.id}\n    green: output_g_${c.id}\n    blue: output_b_${c.id}\n    effects:\n      - rainbow:\n      - strobe:\n      - pulse:\n\n`;
      } else if (c.type === "rgbw") {
        y += `  - platform: rgbw\n    name: "${c.name||"RGBW Light"}"\n    red: output_r_${c.id}\n    green: output_g_${c.id}\n    blue: output_b_${c.id}\n    white: output_w_${c.id}\n    effects:\n      - rainbow:\n      - pulse:\n\n`;
      } else if (c.type === "neopixel" || c.type === "sk6812") {
        y += `  - platform: neopixelbus\n    type: ${c.type === "sk6812" ? "GRBW" : "GRB"}\n    variant: ${c.type === "sk6812" ? "SK6812" : "WS2812"}\n    pin: GPIO${c.gpio||"2"}\n    num_leds: ${c.numLeds||"30"}\n    name: "${c.name||"LED Strip"}"\n    effects:\n      - addressable_rainbow:\n      - addressable_color_wipe:\n      - addressable_fireworks:\n\n`;
      }
    });

    // Outputs for lights
    const hasOutputs = lights.filter(c => ["led","rgb","rgbw"].includes(c.type));
    if (hasOutputs.length > 0) {
      y += `output:\n`;
      hasOutputs.forEach(c => {
        if (c.type === "led") {
          y += `  - platform: gpio\n    pin: GPIO${c.gpio||"2"}\n    id: output_led_${c.id}\n\n`;
        } else if (c.type === "rgb") {
          y += `  - platform: ledc\n    pin: GPIO${c.gpioR||"25"}\n    id: output_r_${c.id}\n  - platform: ledc\n    pin: GPIO${c.gpioG||"26"}\n    id: output_g_${c.id}\n  - platform: ledc\n    pin: GPIO${c.gpioB||"27"}\n    id: output_b_${c.id}\n\n`;
        } else if (c.type === "rgbw") {
          y += `  - platform: ledc\n    pin: GPIO${c.gpioR||"25"}\n    id: output_r_${c.id}\n  - platform: ledc\n    pin: GPIO${c.gpioG||"26"}\n    id: output_g_${c.id}\n  - platform: ledc\n    pin: GPIO${c.gpioB||"27"}\n    id: output_b_${c.id}\n  - platform: ledc\n    pin: GPIO${c.gpioW||"32"}\n    id: output_w_${c.id}\n\n`;
        }
      });
    }
  }

  // Servos & fans
  const servos = components.filter(c => c.type === "servo");
  if (servos.length > 0) {
    y += `servo:\n`;
    servos.forEach(c => {
      y += `  - id: servo_${c.id}\n    output: servo_output_${c.id}\n    name: "${c.name||"Servo"}"\n\n`;
    });
    y += `output:\n`;
    servos.forEach(c => {
      y += `  - platform: ledc\n    pin: GPIO${c.gpio||"13"}\n    id: servo_output_${c.id}\n    frequency: 50Hz\n\n`;
    });
  }

  const fans = components.filter(c => c.type === "fan");
  if (fans.length > 0) {
    y += `fan:\n`;
    fans.forEach(c => {
      y += `  - platform: speed\n    output: fan_output_${c.id}\n    name: "${c.name||"Fan"}"\n\n`;
    });
    y += `output:\n`;
    fans.forEach(c => {
      y += `  - platform: ledc\n    pin: GPIO${c.gpio||"13"}\n    id: fan_output_${c.id}\n\n`;
    });
  }

  // Displays
  const displays = components.filter(c => ALL_COMPONENTS.find(d => d.type === c.type)?.platform === "display");
  if (displays.length > 0) {
    y += `# — Displays ——————————————————————————————————————————————\n`;
    displays.forEach(c => {
      switch(c.type) {
        case "ssd1306": case "sh1106":
          y += `display:\n  - platform: ${c.type === "sh1106" ? "ssd1306_i2c" : "ssd1306_i2c"}\n    model: "${c.type === "sh1106" ? "SH1106 128x64" : "SSD1306 128x64"}"\n    address: 0x3C\n    lambda: |-\n      it.print(0, 0, id(font_8), "${c.name||"ESPHome"}");\n\nfont:\n  - file: "gfonts://Roboto"\n    id: font_8\n    size: 8\n\n`;
          break;
        case "ssd1327":
          y += `display:\n  - platform: ssd1327_i2c\n    model: "SSD1327 128x128"\n    address: 0x3C\n    lambda: |-\n      it.print(0, 0, id(font_8), "${c.name||"ESPHome"}");\n\n`;
          break;
        case "ili9341":
          y += `display:\n  - platform: ili9xxx\n    model: ILI9341\n    cs_pin: GPIO${c.gpioCS||"5"}\n    dc_pin: GPIO${c.gpioDC||"4"}\n    reset_pin: GPIO${c.gpioRST||"22"}\n    lambda: |-\n      it.fill(Color::BLACK);\n      it.print(10, 10, id(font_8), Color(0, 255, 255), "${c.name||"Hello ESP!"}");\n\n`;
          break;
        case "lcd1602":
          y += `display:\n  - platform: lcd_pcf8574\n    dimensions: 16x2\n    address: 0x27\n    lambda: |-\n      it.print("${c.name||"ESPHome"}");\n\n`;
          break;
        case "tm1637":
          y += `display:\n  - platform: tm1637\n    clk_pin: GPIO${c.gpioCLK||"14"}\n    dio_pin: GPIO${c.gpioDIO||"12"}\n    lambda: |-\n      it.print("1234");\n\n`;
          break;
        default:
          y += `# Display: ${c.name||c.type} - configure manually\n`;
      }
    });
  }

  return y;
};

/* ============================================================
   YAML HIGHLIGHTER - returns array of React elements (NO dangerouslySetInnerHTML)
   ============================================================ */
const C = {
  comment:  "#6272a4",
  key:      "#79c0ff",
  colon:    "#8b949e",
  string:   "#a5d6ff",
  bool:     "#ff7b72",
  number:   "#f9c74f",
  secret:   "#d2a8ff",
  anchor:   "#ffa657",
  plain:    "#c9d1d9",
  indent:   "#1e3a5a",
  dash:     "#ff7b72",
};

function YAMLLine({ line, num }) {
  if (line.trim().startsWith("#")) {
    return (
      <div style={{ display:"flex", minHeight:20 }}>
        <span style={{ minWidth:40, textAlign:"right", paddingRight:12, color:C.indent, userSelect:"none", flexShrink:0 }}>{num}</span>
        <span style={{ paddingLeft:16, color:C.comment, fontStyle:"italic" }}>{line}</span>
      </div>
    );
  }

  // tokenize
  const tokens = [];
  let rest = line;

  // leading spaces
  const leadMatch = rest.match(/^(\s*)(- )?/);
  const leading = leadMatch[1] || "";
  const dash = leadMatch[2] || "";
  rest = rest.slice(leading.length + dash.length);

  // key: value pattern
  const kvMatch = rest.match(/^([\w.-]+)(:)(.*)/);
  if (kvMatch) {
    const [, key, colon, val] = kvMatch;
    tokens.push(<span key="lead" style={{ whiteSpace:"pre" }}>{leading}</span>);
    if (dash) tokens.push(<span key="dash" style={{ color:C.dash }}>{dash}</span>);
    tokens.push(<span key="key" style={{ color:C.key }}>{key}</span>);
    tokens.push(<span key="colon" style={{ color:C.colon }}>:</span>);
    // value
    const v = val.trimStart();
    const space = val.slice(0, val.length - v.length);
    if (!v) {
      // no value
    } else if (v.startsWith("!secret")) {
      tokens.push(<span key="sp" style={{ whiteSpace:"pre" }}>{space}</span>);
      tokens.push(<span key="sec" style={{ color:C.secret }}>{v}</span>);
    } else if (v === "true" || v === "false") {
      tokens.push(<span key="sp" style={{ whiteSpace:"pre" }}>{space}</span>);
      tokens.push(<span key="bool" style={{ color:C.bool }}>{v}</span>);
    } else if (v.startsWith('"')) {
      tokens.push(<span key="sp" style={{ whiteSpace:"pre" }}>{space}</span>);
      tokens.push(<span key="str" style={{ color:C.string }}>{v}</span>);
    } else if (/^0x[0-9a-fA-F]+$/.test(v)) {
      tokens.push(<span key="sp" style={{ whiteSpace:"pre" }}>{space}</span>);
      tokens.push(<span key="hex" style={{ color:C.number }}>{v}</span>);
    } else if (/^-?\d/.test(v)) {
      tokens.push(<span key="sp" style={{ whiteSpace:"pre" }}>{space}</span>);
      tokens.push(<span key="num" style={{ color:C.number }}>{v}</span>);
    } else {
      tokens.push(<span key="sp" style={{ whiteSpace:"pre" }}>{space}</span>);
      tokens.push(<span key="val" style={{ color:C.plain }}>{v}</span>);
    }
  } else {
    // plain line
    tokens.push(<span key="plain" style={{ whiteSpace:"pre", color:C.plain }}>{line}</span>);
  }

  return (
    <div style={{ display:"flex", minHeight:20 }}>
      <span style={{ minWidth:40, textAlign:"right", paddingRight:12, color:C.indent, userSelect:"none", flexShrink:0 }}>{num}</span>
      <span style={{ paddingLeft:16 }}>{tokens}</span>
    </div>
  );
}

/* ============================================================
   3D BOARD
   ============================================================ */
function PinDot({ pos, active, color="#00ffff", label }) {
  const m = useRef();
  useFrame(s => {
    if (!m.current) return;
    const t = active ? 1 + 0.35 * Math.sin(s.clock.elapsedTime * 4) : 0.7;
    m.current.scale.setScalar(t);
  });
  return (
    <group position={pos}>
      <mesh ref={m}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color={active ? color : "#0d2233"} emissive={active ? color : "#000"} emissiveIntensity={active ? 2.5 : 0} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

const PINS = [
  { id:"0", x:-1.75, y:1.1 },{ id:"2", x:-1.75, y:0.8 },{ id:"4", x:-1.75, y:0.5 },
  { id:"5", x:-1.75, y:0.2 },{ id:"12", x:-1.75, y:-0.1 },{ id:"13", x:-1.75, y:-0.4 },
  { id:"14", x:-1.75, y:-0.7 },{ id:"16", x:-1.75, y:-1.0 },
  { id:"15", x:1.75, y:1.1 },{ id:"17", x:1.75, y:0.8 },{ id:"18", x:1.75, y:0.5 },
  { id:"19", x:1.75, y:0.2 },{ id:"21", x:1.75, y:-0.1 },{ id:"22", x:1.75, y:-0.4 },
  { id:"23", x:1.75, y:-0.7 },{ id:"25", x:1.75, y:-1.0 },
];

function Board({ activeGpios, glow }) {
  const g = useRef();
  useFrame(s => {
    if (!g.current) return;
    g.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.25) * 0.12;
    g.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.18) * 0.04;
  });
  const activeSet = new Set(activeGpios);
  return (
    <group ref={g}>
      <RoundedBox args={[4, 2.8, 0.1]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#091520" metalness={0.25} roughness={0.75} />
      </RoundedBox>
      {/* traces */}
      {[[0,.4,0,2.5,.006],[0,-.3,0,1.8,.006],[-.5,0,0,1.2,.006]].map(([x,y,z,w,h],i)=>(
        <mesh key={i} position={[x,y,0.052]}>
          <boxGeometry args={[w,h,0.001]} />
          <meshBasicMaterial color="#132a1a" transparent opacity={0.7} />
        </mesh>
      ))}
      {/* chip */}
      <RoundedBox args={[0.85, 0.85, 0.1]} radius={0.04} position={[0,0,0.06]}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.15} />
      </RoundedBox>
      <mesh position={[0,0,0.115]}>
        <boxGeometry args={[0.7,0.7,0.001]} />
        <meshBasicMaterial color="#111" />
      </mesh>
      {/* USB */}
      <RoundedBox args={[0.45, 0.22, 0.18]} radius={0.02} position={[0,1.51,0.04]}>
        <meshStandardMaterial color="#222" metalness={0.95} roughness={0.1} />
      </RoundedBox>
      {/* antenna */}
      <mesh position={[1.4, 0.2, 0.06]}>
        <boxGeometry args={[0.55,0.07,0.015]} />
        <meshStandardMaterial color="#151f2a" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* pins */}
      {PINS.map(p => (
        <PinDot key={p.id} pos={[p.x, p.y, 0.06]} active={activeSet.has(p.id)} />
      ))}
      {/* glow aura */}
      {glow && <mesh><sphereGeometry args={[3,32,32]} /><meshBasicMaterial color="#00ffff" transparent opacity={0.04} side={THREE.BackSide} /></mesh>}
      <pointLight position={[2,2,2]} color="#00e5ff" intensity={glow?4:1.2} />
      <pointLight position={[-2,-1,2]} color="#7c3aed" intensity={0.9} />
    </group>
  );
}

/* ============================================================
   UI COMPONENTS
   ============================================================ */
const inp = {
  background:"rgba(255,255,255,0.04)",
  border:"1px solid rgba(255,255,255,0.08)",
  borderRadius:8,
  padding:"10px 14px",
  color:"#e2e8f0",
  fontSize:14,
  width:"100%",
  outline:"none",
  fontFamily:"inherit",
  transition:"border-color .2s",
};

function Field({ label, value, onChange, type="text", placeholder }) {
  return (
    <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <span style={{ fontSize:11, color:"#475569", letterSpacing:".07em", textTransform:"uppercase" }}>{label}</span>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={inp}
        onFocus={e=>{e.target.style.borderColor="rgba(99,102,241,.6)";e.target.style.boxShadow="0 0 0 3px rgba(99,102,241,.1)"}}
        onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,.08)";e.target.style.boxShadow="none"}}
      />
    </label>
  );
}

function Sel({ label, value, onChange, options }) {
  return (
    <label style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <span style={{ fontSize:11, color:"#475569", letterSpacing:".07em", textTransform:"uppercase" }}>{label}</span>
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{ ...inp, appearance:"none", cursor:"pointer", background:"rgba(8,15,28,.95)" }}>
        {options.map(o=><option key={o.v} value={o.v} style={{background:"#0a1220"}}>{o.l}</option>)}
      </select>
    </label>
  );
}

function Toggle({ label, desc, value, onChange }) {
  return (
    <motion.button
      onClick={() => onChange(!value)}
      animate={{ borderColor: value ? "rgba(99,102,241,.6)" : "rgba(255,255,255,.07)" }}
      style={{
        width:"100%", padding:"14px 16px", borderRadius:10,
        background: value ? "rgba(99,102,241,.1)" : "rgba(255,255,255,.02)",
        border:"1px solid", cursor:"pointer",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        fontFamily:"inherit", textAlign:"left",
      }}
    >
      <div>
        <div style={{ fontSize:14, fontWeight:600, color: value ? "#a5b4fc" : "#94a3b8" }}>{label}</div>
        <div style={{ fontSize:12, color:"#334155", marginTop:2 }}>{desc}</div>
      </div>
      <div style={{
        width:36, height:20, borderRadius:10, padding:2,
        background: value ? "#6366f1" : "#1e293b",
        transition:"background .2s", flexShrink:0,
        display:"flex", alignItems:"center",
      }}>
        <motion.div animate={{ x: value ? 16 : 0 }} transition={{ type:"spring", stiffness:400, damping:28 }}
          style={{ width:16, height:16, borderRadius:"50%", background:"white" }} />
      </div>
    </motion.button>
  );
}

const CATEGORIES = Object.keys(COMPONENT_DB).map(k => ({
  id: k, label: k.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase())
}));

function CompPicker({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState("temperature");
  const [q, setQ] = useState("");
  const ref = useRef();

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const items = q
    ? ALL_COMPONENTS.filter(c =>
        c.label.toLowerCase().includes(q.toLowerCase()) ||
        c.desc.toLowerCase().includes(q.toLowerCase()) ||
        c.tags?.some(t => t.includes(q.toLowerCase()))
      )
    : COMPONENT_DB[cat] || [];

  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button onClick={()=>setOpen(!open)} style={{
        width:"100%", padding:"11px 16px", borderRadius:10,
        background:"rgba(99,102,241,.07)", border:"1px dashed rgba(99,102,241,.35)",
        color:"#818cf8", fontSize:13, cursor:"pointer", fontFamily:"inherit",
        display:"flex", alignItems:"center", justifyContent:"center", gap:8,
        transition:"all .2s",
      }}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(99,102,241,.14)"}
        onMouseLeave={e=>e.currentTarget.style.background="rgba(99,102,241,.07)"}
      >
        <span style={{fontSize:16}}>+</span> Ajouter un composant
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:-6,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-6,scale:.97}}
            transition={{duration:.18}}
            style={{
              position:"absolute", top:"calc(100% + 6px)", left:0, right:0, zIndex:200,
              background:"#0c1524", border:"1px solid rgba(99,102,241,.25)",
              borderRadius:12, boxShadow:"0 20px 60px rgba(0,0,0,.7)", overflow:"hidden",
            }}>
            <div style={{ padding:"10px 12px", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Rechercher..." style={{
                ...inp, padding:"7px 12px", fontSize:13, width:"100%",
                background:"rgba(255,255,255,.04)",
              }} />
            </div>

            {!q && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:4, padding:"8px 10px", borderBottom:"1px solid rgba(255,255,255,.04)" }}>
                {CATEGORIES.map(c => (
                  <button key={c.id} onClick={()=>setCat(c.id)} style={{
                    padding:"4px 10px", borderRadius:100, border:"none", cursor:"pointer",
                    background: cat===c.id ? "rgba(99,102,241,.25)" : "rgba(255,255,255,.04)",
                    color: cat===c.id ? "#a5b4fc" : "#475569", fontSize:11, fontFamily:"inherit",
                    transition:"all .15s",
                  }}>{c.label}</button>
                ))}
              </div>
            )}

            <div style={{ maxHeight:280, overflowY:"auto", padding:6 }}>
              {items.map(def => (
                <button key={def.type} onClick={()=>{
                  onAdd({...def, id:Date.now(), name:def.label, gpio:"4", interval:"60s",
                    i2cSda:"21", i2cScl:"22", gpioR:"25", gpioG:"26", gpioB:"27",
                    numLeds:"30", restoreMode:"RESTORE_DEFAULT_OFF", inverted:"false",
                  });
                  setOpen(false); setQ("");
                }} style={{
                  width:"100%", background:"rgba(255,255,255,.02)", border:"1px solid rgba(255,255,255,.04)",
                  borderRadius:8, padding:"9px 12px", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:10, marginBottom:3,
                  textAlign:"left", fontFamily:"inherit", transition:"all .12s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(99,102,241,.1)";e.currentTarget.style.borderColor="rgba(99,102,241,.3)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.02)";e.currentTarget.style.borderColor="rgba(255,255,255,.04)"}}
                >
                  <span style={{fontSize:20,flexShrink:0}}>{def.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{color:"#e2e8f0",fontSize:13,fontWeight:600}}>{def.label}</div>
                    <div style={{color:"#475569",fontSize:11}}>{def.desc}</div>
                  </div>
                  <span style={{
                    fontSize:10, padding:"2px 6px", borderRadius:4,
                    background:"rgba(255,255,255,.04)", color:"#334155",
                  }}>{def.bus}</span>
                </button>
              ))}
              {items.length === 0 && <div style={{padding:"20px",textAlign:"center",color:"#334155",fontSize:13}}>Aucun résultat</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CompCard({ comp, onRemove, onChange }) {
  const [open, setOpen] = useState(false);
  const def = ALL_COMPONENTS.find(d => d.type === comp.type) || {};
  const gpios = [...Array(36)].map((_,i)=>({v:String(i),l:`GPIO${i}`}));

  return (
    <motion.div layout initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.96}}
      style={{
        background:"rgba(255,255,255,.025)", border:"1px solid rgba(255,255,255,.06)",
        borderRadius:10, overflow:"hidden", marginBottom:6,
      }}>
      <div onClick={()=>setOpen(!open)} style={{
        display:"flex", alignItems:"center", padding:"10px 12px", cursor:"pointer", gap:10,
      }}>
        <span style={{fontSize:18}}>{def.icon}</span>
        <div style={{flex:1}}>
          <div style={{color:"#e2e8f0",fontSize:13,fontWeight:600}}>{comp.name||def.label}</div>
          <div style={{color:"#334155",fontSize:11,fontFamily:"monospace"}}>{comp.type} · {def.bus}</div>
        </div>
        <motion.span animate={{rotate:open?180:0}} style={{color:"#334155"}}>▾</motion.span>
        <button onClick={e=>{e.stopPropagation();onRemove();}} style={{
          background:"rgba(239,68,68,.08)", border:"1px solid rgba(239,68,68,.15)",
          borderRadius:6, padding:"3px 8px", cursor:"pointer", color:"#ef4444", fontSize:16, lineHeight:1,
        }}>×</button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
            transition={{duration:.2}} style={{overflow:"hidden"}}>
            <div style={{padding:"4px 12px 12px",borderTop:"1px solid rgba(255,255,255,.04)",display:"grid",gap:8}}>
              <Field label="Nom" value={comp.name||""} onChange={v=>onChange({...comp,name:v})} placeholder={def.label} />
              {def.bus==="gpio" && <Sel label="GPIO Pin" value={comp.gpio||"4"} onChange={v=>onChange({...comp,gpio:v})} options={gpios} />}
              {def.bus==="1wire" && <Sel label="GPIO OneWire" value={comp.gpio||"4"} onChange={v=>onChange({...comp,gpio:v})} options={gpios} />}
              {def.bus==="adc" && <Sel label="GPIO ADC" value={comp.gpio||"34"} onChange={v=>onChange({...comp,gpio:v})} options={gpios} />}
              {def.bus==="pwm" && comp.type!=="rgb" && comp.type!=="rgbw" && <Sel label="GPIO PWM" value={comp.gpio||"13"} onChange={v=>onChange({...comp,gpio:v})} options={gpios} />}
              {comp.type==="rgb" && (
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
                  <Sel label="R" value={comp.gpioR||"25"} onChange={v=>onChange({...comp,gpioR:v})} options={gpios} />
                  <Sel label="G" value={comp.gpioG||"26"} onChange={v=>onChange({...comp,gpioG:v})} options={gpios} />
                  <Sel label="B" value={comp.gpioB||"27"} onChange={v=>onChange({...comp,gpioB:v})} options={gpios} />
                </div>
              )}
              {comp.type==="rgbw" && (
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5}}>
                  <Sel label="R" value={comp.gpioR||"25"} onChange={v=>onChange({...comp,gpioR:v})} options={gpios} />
                  <Sel label="G" value={comp.gpioG||"26"} onChange={v=>onChange({...comp,gpioG:v})} options={gpios} />
                  <Sel label="B" value={comp.gpioB||"27"} onChange={v=>onChange({...comp,gpioB:v})} options={gpios} />
                  <Sel label="W" value={comp.gpioW||"32"} onChange={v=>onChange({...comp,gpioW:v})} options={gpios} />
                </div>
              )}
              {(comp.type==="neopixel"||comp.type==="sk6812") && (
                <>
                  <Sel label="GPIO Data" value={comp.gpio||"2"} onChange={v=>onChange({...comp,gpio:v})} options={gpios} />
                  <Field label="Nb LEDs" value={comp.numLeds||"30"} onChange={v=>onChange({...comp,numLeds:v})} placeholder="30" />
                </>
              )}
              {def.bus==="i2c" && (
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                  <Sel label="SDA" value={comp.i2cSda||"21"} onChange={v=>onChange({...comp,i2cSda:v})} options={gpios} />
                  <Sel label="SCL" value={comp.i2cScl||"22"} onChange={v=>onChange({...comp,i2cScl:v})} options={gpios} />
                </div>
              )}
              {comp.type==="hcsr04" && (
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                  <Sel label="Trigger" value={comp.gpioTrig||"12"} onChange={v=>onChange({...comp,gpioTrig:v})} options={gpios} />
                  <Sel label="Echo" value={comp.gpioEcho||"14"} onChange={v=>onChange({...comp,gpioEcho:v})} options={gpios} />
                </div>
              )}
              {def.platform==="sensor" && def.bus!=="uart" && (
                <Field label="Interval" value={comp.interval||"60s"} onChange={v=>onChange({...comp,interval:v})} placeholder="60s" />
              )}
              {(comp.type==="relay"||comp.type==="led") && (
                <Sel label="Restore Mode" value={comp.restoreMode||"RESTORE_DEFAULT_OFF"}
                  onChange={v=>onChange({...comp,restoreMode:v})}
                  options={[
                    {v:"RESTORE_DEFAULT_OFF",l:"Restore → OFF"},
                    {v:"RESTORE_DEFAULT_ON",l:"Restore → ON"},
                    {v:"ALWAYS_OFF",l:"Always OFF"},
                    {v:"ALWAYS_ON",l:"Always ON"},
                  ]}
                />
              )}
              {comp.type==="pir" && <Field label="Delayed Off" value={comp.delay||"5s"} onChange={v=>onChange({...comp,delay:v})} placeholder="5s" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [boardType, setBoardType]   = useState("esp32");
  const [deviceName, setDeviceName] = useState("my-esp-device");
  const [wifiSsid, setWifiSsid]     = useState("");
  const [wifiPass, setWifiPass]     = useState("");
  const [components, setComponents] = useState([]);
  const [services, setServices]     = useState({ api:true, ota:true });
  const [copied, setCopied]         = useState(false);
  const [glow, setGlow]             = useState(false);

  const config = useMemo(()=>({ boardType, deviceName, wifiSsid, wifiPass, components, services }),[boardType,deviceName,wifiSsid,wifiPass,components,services]);
  const yaml   = useMemo(()=>generateYAML(config),[config]);
  const lines  = useMemo(()=>yaml.split("\n"),[yaml]);

  const activeGpios = useMemo(()=>
    components.flatMap(c=>[c.gpio,c.gpioR,c.gpioG,c.gpioB,c.gpioW,c.gpioTrig,c.gpioEcho].filter(Boolean))
  ,[components]);

  const copy = async () => {
    await navigator.clipboard.writeText(yaml);
    setCopied(true); setTimeout(()=>setCopied(false),2000);
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([yaml],{type:"text/yaml"}));
    a.download = `${deviceName||"esphome"}.yaml`;
    a.click();
    setGlow(true); setTimeout(()=>setGlow(false),3000);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#080e1a", color:"#e2e8f0", display:"flex", flexDirection:"column", fontFamily:"'JetBrains Mono','Fira Code',monospace", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px;height:3px}
        ::-webkit-scrollbar-thumb{background:rgba(99,102,241,.35);border-radius:2px}
        input,select,button{font-family:inherit}
        input[type=password]{letter-spacing:.12em}
      `}</style>

      {/* NAV */}
      <header style={{
        height:52, display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 20px", borderBottom:"1px solid rgba(255,255,255,.06)",
        background:"rgba(8,14,26,.85)", backdropFilter:"blur(16px)", flexShrink:0, zIndex:10,
      }}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,#6366f1,#00e5ff)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 16px rgba(99,102,241,.45)",fontSize:14}}>⚡</div>
          <span style={{fontWeight:700,fontSize:15,letterSpacing:"-.02em"}}>Zero<span style={{color:"#6366f1"}}>Code</span> <span style={{color:"#334155",fontWeight:400,fontSize:13}}>ESPHome</span></span>
          <span style={{marginLeft:6,padding:"2px 7px",borderRadius:100,background:"rgba(99,102,241,.1)",border:"1px solid rgba(99,102,241,.2)",fontSize:10,color:"#818cf8",letterSpacing:".08em"}}>BUILDER</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <a href="https://github.com/your-org/zerocode-esphome" target="_blank" rel="noreferrer"
            style={{padding:"5px 12px",borderRadius:7,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",color:"#64748b",fontSize:12,textDecoration:"none",display:"flex",alignItems:"center",gap:5}}>
            ⭐ Open Source
          </a>
          <button onClick={()=>window.open("https://web.esphome.io/","_blank")} style={{
            padding:"6px 14px",borderRadius:7,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",border:"none",color:"white",fontSize:12,cursor:"pointer",fontWeight:600,
            boxShadow:"0 0 16px rgba(99,102,241,.3)",
          }}>⚡ Flash via Web</button>
        </div>
      </header>

      {/* 3-COL LAYOUT */}
      <div style={{ flex:1, display:"grid", gridTemplateColumns:"340px 1fr 420px", height:"calc(100vh - 52px)", overflow:"hidden" }}>

        {/* LEFT — FORM */}
        <div style={{ borderRight:"1px solid rgba(255,255,255,.05)", display:"flex", flexDirection:"column", overflow:"hidden", background:"rgba(6,11,20,.7)" }}>
          {/* Header */}
          <div style={{ padding:"16px 20px 12px", borderBottom:"1px solid rgba(255,255,255,.04)", flexShrink:0 }}>
            <div style={{ fontSize:11, color:"#6366f1", letterSpacing:".1em", textTransform:"uppercase", marginBottom:2 }}>Configuration</div>
            <div style={{ fontSize:12, color:"#334155" }}>Génère du YAML ESPHome sans coder</div>
          </div>

          <div style={{ flex:1, overflowY:"auto", padding:"16px 20px", display:"flex", flexDirection:"column", gap:20 }}>
            {/* Board */}
            <section>
              <div style={{ fontSize:10, color:"#6366f1", letterSpacing:".1em", textTransform:"uppercase", marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
                <span>⚙️</span> NOM DU MODULE
              </div>
              <div style={{ display:"grid", gap:10 }}>
                <Sel label="Type de carte" value={boardType} onChange={setBoardType} options={[
                  {v:"esp32",   l:"ESP32 (DevKit v1)"},
                  {v:"esp32s2", l:"ESP32-S2 (LiLyGO)"},
                  {v:"esp32c3", l:"ESP32-C3 (XIAO)"},
                  {v:"esp32s3", l:"ESP32-S3 (DevKitC)"},
                  {v:"esp8266", l:"ESP8266 (NodeMCU v2)"},
                  {v:"esp8285", l:"ESP8285 (Sonoff Basic)"},
                ]} />
                <Field label="Nom de l'appareil" value={deviceName} onChange={setDeviceName} placeholder="my-esp-device" />
              </div>
            </section>

            {/* WiFi */}
            <section>
              <div style={{ fontSize:10, color:"#0ea5e9", letterSpacing:".1em", textTransform:"uppercase", marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
                <span>📶</span> CONNEXION WIFI
                {wifiSsid.length>2 && <div style={{ width:6,height:6,borderRadius:"50%",background:"#10b981",boxShadow:"0 0 6px #10b981",marginLeft:"auto" }} />}
              </div>
              <div style={{ display:"grid", gap:10 }}>
                <Field label="" value={wifiSsid} onChange={setWifiSsid} placeholder="your_wifi_ssid" />
                <Field label="" value={wifiPass} onChange={setWifiPass} placeholder="••••••••" type="password" />
              </div>
            </section>

            {/* Services */}
            <section>
              <div style={{ fontSize:10, color:"#8b5cf6", letterSpacing:".1em", textTransform:"uppercase", marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
                <span>🛡️</span> SERVICES
              </div>
              <div style={{ display:"grid", gap:8 }}>
                <Toggle label="Native API" desc="Pour Home Assistant" value={services.api} onChange={v=>setServices(s=>({...s,api:v}))} />
                <Toggle label="Over-the-Air" desc="Mises à jour sans fil" value={services.ota} onChange={v=>setServices(s=>({...s,ota:v}))} />
              </div>
            </section>

            {/* Components */}
            <section>
              <div style={{ fontSize:10, color:"#a78bfa", letterSpacing:".1em", textTransform:"uppercase", marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
                <span>🧩</span> COMPOSANTS
                <span style={{ marginLeft:"auto", background:"rgba(139,92,246,.12)", border:"1px solid rgba(139,92,246,.2)", borderRadius:100, padding:"1px 8px", fontSize:10, color:"#a78bfa" }}>
                  {components.length} / {ALL_COMPONENTS.length} dispo
                </span>
              </div>
              <AnimatePresence mode="popLayout">
                {components.map(c=>(
                  <CompCard key={c.id} comp={c}
                    onRemove={()=>setComponents(p=>p.filter(x=>x.id!==c.id))}
                    onChange={u=>setComponents(p=>p.map(x=>x.id===u.id?u:x))}
                  />
                ))}
              </AnimatePresence>
              <CompPicker onAdd={c=>setComponents(p=>[...p,c])} />
            </section>
          </div>

          {/* Bottom actions */}
          <div style={{ padding:"12px 20px", borderTop:"1px solid rgba(255,255,255,.05)", display:"flex", gap:8, flexShrink:0 }}>
            <button onClick={download} style={{
              flex:1, padding:10, borderRadius:8, cursor:"pointer",
              background:"rgba(99,102,241,.08)", border:"1px solid rgba(99,102,241,.2)",
              color:"#a5b4fc", fontSize:12, fontFamily:"inherit",
              display:"flex",alignItems:"center",justifyContent:"center",gap:6,
            }}>⬇ Export YAML</button>
            <button onClick={()=>window.open("https://web.esphome.io/","_blank")} style={{
              flex:1, padding:10, borderRadius:8, cursor:"pointer",
              background:"linear-gradient(135deg,rgba(99,102,241,.2),rgba(139,92,246,.15))",
              border:"1px solid rgba(139,92,246,.3)",
              color:"#c4b5fd", fontSize:12, fontFamily:"inherit", fontWeight:600,
              display:"flex",alignItems:"center",justifyContent:"center",gap:6,
            }}>⚡ Flash Web</button>
          </div>
        </div>

        {/* CENTER — 3D */}
        <div style={{ position:"relative", background:"#060c18" }}>
          <div style={{ position:"absolute", top:14, left:"50%", transform:"translateX(-50%)", zIndex:5, textAlign:"center", pointerEvents:"none" }}>
            <div style={{ fontSize:11, color:"#1e3a5a", letterSpacing:".1em", textTransform:"uppercase" }}>{boardType?.toUpperCase()} Preview</div>
            {activeGpios.length>0 && <div style={{ fontSize:10, color:"#00e5ff", fontFamily:"monospace", marginTop:3 }}>{activeGpios.length} GPIO actif{activeGpios.length>1?"s":""}</div>}
          </div>
          <Canvas camera={{ position:[0,0,4.8], fov:48 }} style={{ width:"100%", height:"100%" }}>
            <color attach="background" args={["#060c18"]} />
            <Stars radius={80} depth={50} count={1800} factor={3} saturation={0} fade speed={0.4} />
            <ambientLight intensity={0.25} />
            <directionalLight position={[4,4,4]} intensity={0.7} />
            <Board activeGpios={activeGpios} glow={glow} />
            <OrbitControls enablePan={false} minDistance={2.5} maxDistance={9} dampingFactor={0.06} enableDamping />
          </Canvas>
          <div style={{ position:"absolute", bottom:14, right:14, fontSize:10, color:"#1e3a5a", fontFamily:"monospace" }}>
            drag · scroll
          </div>
        </div>

        {/* RIGHT — YAML */}
        <div style={{ borderLeft:"1px solid rgba(255,255,255,.05)", display:"flex", flexDirection:"column", background:"rgba(5,9,18,.8)", overflow:"hidden" }}>
          {/* Header */}
          <div style={{ padding:"12px 16px 10px", borderBottom:"1px solid rgba(255,255,255,.04)", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
            <div>
              <div style={{ fontSize:11, color:"#334155", letterSpacing:".08em", textTransform:"uppercase" }}>YAML Output</div>
              <div style={{ fontSize:10, color:"#1e3a5a", fontFamily:"monospace", marginTop:2 }}>{lines.length} lignes</div>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              <button onClick={copy} style={{
                padding:"5px 12px", borderRadius:6, cursor:"pointer",
                background: copied ? "rgba(16,185,129,.12)" : "rgba(255,255,255,.04)",
                border: copied ? "1px solid rgba(16,185,129,.35)" : "1px solid rgba(255,255,255,.07)",
                color: copied ? "#10b981" : "#475569", fontSize:11,
                fontFamily:"inherit", display:"flex", alignItems:"center", gap:5, transition:"all .2s",
              }}>
                {copied ? "✓ Copié" : "⎘ Copier"}
              </button>
              <button onClick={download} style={{
                padding:"5px 12px", borderRadius:6, cursor:"pointer",
                background:"rgba(99,102,241,.08)", border:"1px solid rgba(99,102,241,.2)",
                color:"#818cf8", fontSize:11, fontFamily:"inherit", display:"flex", alignItems:"center", gap:5,
              }}>⬇ Sauver</button>
            </div>
          </div>

          {/* Fake titlebar */}
          <div style={{ padding:"8px 14px", borderBottom:"1px solid rgba(255,255,255,.04)", display:"flex", alignItems:"center", gap:6, background:"rgba(0,0,0,.2)", flexShrink:0 }}>
            <div style={{ width:10,height:10,borderRadius:"50%",background:"#ff5f57" }} />
            <div style={{ width:10,height:10,borderRadius:"50%",background:"#febc2e" }} />
            <div style={{ width:10,height:10,borderRadius:"50%",background:"#28c840" }} />
            <span style={{ marginLeft:8, fontSize:11, color:"#334155", fontFamily:"monospace" }}>{deviceName||"my-device"}.yaml</span>
          </div>

          {/* Code */}
          <div style={{ flex:1, overflowY:"auto", fontSize:12.5, lineHeight:"20px", padding:"12px 0 20px 0", background:"rgba(4,8,16,.6)" }}>
            {lines.map((line, i) => (
              <YAMLLine key={i} line={line} num={i+1} />
            ))}
          </div>

          {/* Status bar */}
          <div style={{ padding:"5px 14px", borderTop:"1px solid rgba(255,255,255,.04)", background:"rgba(0,0,0,.3)", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
            <span style={{ fontSize:10, color:"#1e3a5a", fontFamily:"monospace" }}>YAML · UTF-8 · {yaml.length} chars</span>
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <div style={{ width:5,height:5,borderRadius:"50%",background:"#10b981",boxShadow:"0 0 5px #10b981" }} />
              <span style={{ fontSize:10, color:"#10b981", fontFamily:"monospace" }}>Valid</span>
            </div>
          </div>
        </div>
      </div>

      {/* Export glow border */}
      <AnimatePresence>
        {glow && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{ position:"fixed",inset:0,zIndex:50,pointerEvents:"none",
              border:"2px solid rgba(0,229,255,.25)",
              boxShadow:"inset 0 0 60px rgba(0,229,255,.06)",
            }} />
        )}
      </AnimatePresence>
    </div>
  );
}