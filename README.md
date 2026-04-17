# 🚀 ZeroCode ESPHome Builder

> **Visual zero-code configurator to generate ESPHome configurations without coding**

An interactive and intuitive web application to build ESPHome configurations for ESP32 and ESP8266 microcontrollers without writing a single line of code.

## ✨ Features

- 🔌 **Full ESP board support** : ESP32, ESP32-S2/S3/C3/C6/H2, ESP8266, ESP8285
- 🧩 **100+ components** : sensors (DHT, BMP, BME, DS18B20...), relays, LEDs, NeoPixels, displays, etc.
- 📡 **Multi-bus support** : GPIO, I²C, UART, SPI, 1-Wire, PWM, ADC
- 🎨 **Modern interface** : 2D circuit preview, real-time YAML editor
- 📋 **Automatic YAML generation** : Export / Download configured
- 🔋 **WiFi & Services integration** : Native API configuration, OTA (Over-The-Air)
- 📱 **Responsive Design** : Works on desktop and mobile
- 🌐 **Web-based** : No installation required, uses web.esphome.io for flashing

## 🎯 Use cases

```
Classic ESPHome config : 45 minutes of reading + 30 minutes of coding
ZeroCode ESPHome Builder : 2-3 minutes without technical knowledge
```

- Beginners : Create your first configuration without complicated documentation
- Makers : Quickly prototype multiple circuits
- Production/Workflow : Generate configurations for multiple identical boards
- Home Assistant integration : Ready-to-use configuration

## 🚀 Quick Start

### Online (recommended)
```bash
# Go to:
https://lixteech.github.io/esphome-zerocode/

1. Select your board (ESP32, ESP8266, etc.)
2. Enter your WiFi SSID and password
3. Add your components (buttons, sensors, relays...)
4. YAML generates in real-time
5. Copy YAML or Flash directly via Web Installer
```

### Local (development)

```bash
# 1. Clone the repo
git clone https://github.com/lixteech/esphome-zerocode.git
cd esphome-zerocode/zerocode-esphome

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# App opens on http://localhost:5173
```

## 📦 Installation & Setup

### Requirements
- Node.js >= 20.19 or 22.12+
- npm or yarn
- A modern browser (Chrome, Firefox, Safari, Edge)

### Main dependencies

```json
"dependencies": {
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "@react-three/fiber": "^9.6.0",
  "@react-three/drei": "^10.7.7",
  "three": "^0.184.0",
  "framer-motion": "^12.38.0"
}

"devDependencies": {
  "vite": "^8.0.4",
  "@vitejs/plugin-react": "^6.0.1",
  "gh-pages": "^6.3.0"
}
```

## 💻 Available scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Create production build
npm run preview      # Preview build locally
npm run deploy       # Deploy to GitHub Pages

# Linting
npm run lint         # Run ESLint
```

## 🏗️ Project architecture

```
zerocode-esphome/
├── src/
│   ├── App.jsx              # Main component
│   ├── App.css              # Styles
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles
│   └── assets/              # Images, icons
├── public/                  # Static files
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── package.json             # Dependencies & scripts
└── README.md                # This documentation
```

## 🎨 Technology stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, React Router |
| **Build** | Vite 8, Rolldown |
| **Animations** | Framer Motion |
| **3D** | Three.js, React Three Fiber |
| **Styling** | CSS-in-JS (inline styles) |
| **Linting** | ESLint 9 |
| **Deploy** | GitHub Pages, gh-pages |

## 📊 Supported components

### Temperature sensors
- DHT11, DHT22, DS18B20
- BME280, BME680, BMP280, BMP085
- AHT10, SHT31, SHT4x, HTU21D
- TMP102, LM75, MAX6675, MAX31855

### Light sensors
- BH1750, TSL2561, TSL2591
- APDS9960, VEML7700, MAX44009

### Motion sensors
- PIR HC-SR501, RCWL-0516
- LD2410 (mmWave), HC-SR04 (Ultrasonic)
- VL53L0X, VL53L1X (ToF)
- MPU6050, MPU9250, LIS3DH

### Air quality
- MH-Z19 (CO₂), SCD40/SCD30 (CO₂), SGP30/SGP40 (VOC)
- PMSA003I (PM2.5), MQ-2, MQ-135, SEN55

### Displays
- SSD1306, SH1106 (OLED)
- ILI9341, ST7789 (TFT color)
- LCD1602, e-Paper (Waveshare)
- TM1637, MAX7219 (LED Matrix)

### Outputs
- Relays, simple LEDs
- RGB/RGBW LEDs, NeoPixels, SK6812
- Servos, Stepper motors
- Buzzers, Fans

### Inputs
- Push buttons, Switches
- Rotary encoders
- RFID (PN532, RC522), Fingerprint sensors

### Energy measurement
- INA219, INA226, ADS1115
- PZEM004T, CSE7766, HLW8012, BL0937

... and 50+ more components!

## 🔧 Configuration

### Access paths

The configuration uses a `base: '/esphome-zerocode/'` for GitHub Pages:

```javascript
// vite.config.js
export default defineConfig({
  base: '/esphome-zerocode/',
  plugins: [react()],
})
```

### YAML generation

The app generates valid ESPHome YAML without encryption (API) and without OTA password:

```yaml
esphome:
  name: my-esp-device
  friendly_name: "My ESP Device"

esp32:
  board: esp32dev

wifi:
  ssid: "your_wifi_ssid"
  password: "your_wifi_password"
  ap:
    ssid: "MY_ESP_DEVICE_AP"
    password: "fallback_password"

# ... sensors, switches, lights, etc.
```

## 🚀 Deployment

### GitHub Pages (Production)

```bash
# 1. Configure your repo
git remote set-url origin https://github.com/YOUR_USERNAME/esphome-zerocode.git

# 2. Deploy
npm run deploy

# App is accessible at:
# https://YOUR_USERNAME.github.io/esphome-zerocode/
```

### Personal server

```bash
# 1. Build
npm run build

# 2. Serve the dist/ folder with your web server
# (nginx, Apache, Express, etc.)
```

## 📝 Usage example

1. **Select your board** : ESP32-S3 DevKitC-1
2. **Enter WiFi** : SSID and password
3. **Add components** :
   - DHT22 (GPIO 4) for temperature/humidity
   - Relay (GPIO 5) for light
   - NeoPixel (GPIO 2, 30 LEDs)
4. **Copy the generated YAML**
5. **Flash** via [web.esphome.io](https://web.esphome.io/)
6. **Integrate** into Home Assistant

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create a branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Future improvements

- [ ] Support for advanced configurations (Python templates, automations)
- [ ] Configuration save/load
- [ ] Component history
- [ ] Real-time YAML validation
- [ ] Full English/French support toggle
- [ ] Dark/Light mode toggle
- [ ] Export in alternative formats (JSON)

## 📄 License

This project is under **MIT** license. See [LICENSE](LICENSE) for details.

---

## 🔗 Useful resources

- **ESPHome** : https://esphome.io/
- **ESP32 Datasheet** : https://www.espressif.com/
- **Home Assistant** : https://www.home-assistant.io/
- **Web Flasher** : https://web.esphome.io/

## 📞 Support

- 🐛 **Issue** : Report a bug or request a feature
- 💬 **Discussions** : Ask your questions
- 🌟 **Star** : If you like it, give a star ⭐

---

**Made with ❤️ for the ESPHome community** • [Visit the app](https://lixteech.github.io/esphome-zerocode/)

![Views](https://komarev.com/ghpvc/?username=lixteech&repo=esphome-zerocode&color=green&label=VIEWS)
