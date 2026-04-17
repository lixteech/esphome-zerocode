# 🚀 ZeroCode ESPHome Builder

> **Configurateur visuel zero-code pour générer des configurations ESPHome sans coder**

Une application web interactive et intuitive pour construire des configurations ESPHome pour microcontrôleurs ESP32 et ESP8266 sans écrire une seule ligne de code.

## ✨ Features

- 🔌 **Support complet des cartes ESP** : ESP32, ESP32-S2/S3/C3/C6/H2, ESP8266, ESP8285
- 🧩 **+100 composants** : capteurs (DHT, BMP, BME, DS18B20...), relais, LEDs, NeoPixels, écrans, etc.
- 📡 **Support multi-bus** : GPIO, I²C, UART, SPI, 1-Wire, PWM, ADC
- 🎨 **Interface moderne** : Aperçu 2D du circuit, éditeur YAML en temps réel
- 📋 **Génération YAML automatique** : Export / Téléchargement configuré
- 🔋 **Intégration WiFi & Services** : Configuration Native API, OTA (Over-The-Air)
- 📱 **Responsive Design** : Fonctionne sur desktop et mobile
- 🌐 **Web-based** : Aucune installation requise, utilise web.esphome.io pour flasher

## 🎯 Cas d'usage

```
Configuration classique ESPHome : 45 minutes de lecture + 30 minutes de code
ZeroCode ESPHome Builder : 2-3 minutes sans connaissance technique
```

- Débutants : Créer sa première configuration sans documentation compliquée
- Makers : Prototyper rapidement plusieurs circuits
- Édition/Flux : Générer des configurations pour plusieurs boards identiques
- Intégration Home Assistant : Configuration prête-à-l'emploi

## 🚀 Quick Start

### En ligne (recommandé)
```bash
# Rendez-vous sur :
https://lixteech.github.io/esphome-zerocode/

1. Sélectionnez votre carte (ESP32, ESP8266, etc.)
2. Entrez votre WiFi SSID et password
3. Ajoutez vos composants (boutons, capteurs, relais...)
4. Le YAML se génère en temps réel
5. Copiez le YAML ou Flash directement via Web Installer
```

### En local (développement)

```bash
# 1. Clonez le repo
git clone https://github.com/lixteech/esphome-zerocode.git
cd esphome-zerocode/zerocode-esphome

# 2. Installez les dépendances
npm install

# 3. Lancez le serveur dev
npm run dev

# L'app s'ouvre sur http://localhost:5173
```

## 📦 Installation & Setup

### Prérequis
- Node.js >= 20.19 ou 22.12+
- npm ou yarn
- Un navigateur moderne (Chrome, Firefox, Safari, Edge)

### Dépendances principales

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

## 💻 Scripts disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production
npm run build        # Crée une build de production
npm run preview      # Prévisualise la build en local
npm run deploy       # Déploie sur GitHub Pages

# Linting
npm run lint         # Exécute ESLint
```

## 🏗️ Architecture du projet

```
zerocode-esphome/
├── src/
│   ├── App.jsx              # Composant principal
│   ├── App.css              # Styles
│   ├── main.jsx             # Point d'entrée React
│   ├── index.css            # Styles globaux
│   └── assets/              # Images, icônes
├── public/                  # Fichiers statiques
├── index.html               # Template HTML
├── vite.config.js           # Configuration Vite
├── eslint.config.js         # Configuration ESLint
├── package.json             # Dépendances & scripts
└── README.md                # Cette documentation
```

## 🎨 Stack technologique

| Couche | Technologies |
|--------|-------------|
| **Frontend** | React 19, React Router |
| **Build** | Vite 8, Rolldown |
| **Animations** | Framer Motion |
| **3D** | Three.js, React Three Fiber |
| **Styling** | CSS-in-JS (inline styles) |
| **Linting** | ESLint 9 |
| **Déploiement** | GitHub Pages, gh-pages |

## 📊 Composants supportés

### Capteurs de température
- DHT11, DHT22, DS18B20
- BME280, BME680, BMP280, BMP085
- AHT10, SHT31, SHT4x, HTU21D
- TMP102, LM75, MAX6675, MAX31855

### Capteurs de lumière
- BH1750, TSL2561, TSL2591
- APDS9960, VEML7700, MAX44009

### Capteurs de mouvement
- PIR HC-SR501, RCWL-0516
- LD2410 (mmWave), HC-SR04 (Ultrasonic)
- VL53L0X, VL53L1X (ToF)
- MPU6050, MPU9250, LIS3DH

### Qualité de l'air
- MH-Z19 (CO₂), SCD40/SCD30 (CO₂), SGP30/SGP40 (VOC)
- PMSA003I (PM2.5), MQ-2, MQ-135, SEN55

### Afficheurs
- SSD1306, SH1106 (OLED)
- ILI9341, ST7789 (TFT color)
- LCD1602, e-Paper (Waveshare)
- TM1637, MAX7219 (LED Matrix)

### Sorties
- Relais, LEDs simples
- RGB/RGBW LEDs, NeoPixels, SK6812
- Servos, Moteurs pas-à-pas
- Buzzers, Ventilateurs

### Entrées
- Boutons push, Interrupteurs
- Encodeurs rotatifs
- RFID (PN532, RC522), Capteurs d'empreintes

### Mesure d'énergie
- INA219, INA226, ADS1115
- PZEM004T, CSE7766, HLW8012, BL0937

... et plus de 50 autres composants!

## 🔧 Configuration

### Chemins d'accès

La configuration utilise un `base: '/esphome-zerocode/'` pour GitHub Pages:

```javascript
// vite.config.js
export default defineConfig({
  base: '/esphome-zerocode/',
  plugins: [react()],
})
```

### Génération YAML

L'app génère du YAML ESPHome valide sans chiffrement (API) et sans mot de passe OTA:

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

## 🚀 Déploiement

### GitHub Pages (Production)

```bash
# 1. Configurez votre repo
git remote set-url origin https://github.com/YOUR_USERNAME/esphome-zerocode.git

# 2. Déployez
npm run deploy

# L'app est accessible sur :
# https://YOUR_USERNAME.github.io/esphome-zerocode/
```

### Serveur personnel

```bash
# 1. Build
npm run build

# 2. Servez le dossier dist/ avec votre serveur web
# (nginx, Apache, Express, etc.)
```

## 📝 Exemple d'utilisation

1. **Sélectionner votre board** : ESP32-S3 DevKitC-1
2. **Entrer WiFi** : SSID et password
3. **Ajouter composants** :
   - DHT22 (GPIO 4) pour température/humidité
   - Relais (GPIO 5) pour lumière
   - NeoPixel (GPIO 2, 30 LEDs)
4. **Copier le YAML** généré
5. **Flasher** via [web.esphome.io](https://web.esphome.io/)
6. **Intégrer** dans Home Assistant

## 🤝 Contribution

Les contributions sont bienvenues! Pour contribuer:

1. **Fork** le repository
2. **Créez une branche** (`git checkout -b feature/amazing-feature`)
3. **Committez vos changements** (`git commit -m 'Add amazing feature'`)
4. **Poussez vers la branche** (`git push origin feature/amazing-feature`)
5. **Ouvrez une Pull Request**

### Améliorations futures

- [ ] Support des configurations avancées (templates Python, automations)
- [ ] Sauvegarde/Chargement de configurations
- [ ] Historique des composants
- [ ] Validation en temps réel du YAML
- [ ] Support du français complet
- [ ] Dark/Light mode toggle
- [ ] Export en formats alternatifs (JSON)

## 📄 License

Ce projet est sous licence **MIT**. Voir [LICENSE](LICENSE) pour plus de détails.

---

## 🔗 Ressources utiles

- **ESPHome** : https://esphome.io/
- **ESP32 Datasheet** : https://www.espressif.com/
- **Home Assistant** : https://www.home-assistant.io/
- **Web Flasher** : https://web.esphome.io/

## 📞 Support

- 🐛 **Issue** : Reportez un bug ou demandez une feature
- 💬 **Discussions** : Posez vos questions
- 🌟 **Star** : Si vous aimez, donnez une star ⭐

---

**Fabriqué avec ❤️ pour la communauté ESPHome** • [Visitez l'app](https://lixteech.github.io/esphome-zerocode/)
