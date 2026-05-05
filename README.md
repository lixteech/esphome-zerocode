# ⚡️ ESPHome Zerocode AI

> **L'IA qui transforme vos mots en hardware. Génération et flashage de firmware ESPHome en langage naturel.**

[🚀 Accéder à l'application](https://esphome-zerocode.vercel.app/)

---

## ✨ Le Concept

Fini les copier-coller de YAML et la lecture de documentations interminables. **ESPHome Zerocode AI** utilise l'intelligence artificielle pour comprendre vos besoins et configurer vos microcontrôleurs instantanément.

- **Ancien workflow** : 45 min de lecture + 30 min de code.
- **Workflow AI** : 10 secondes de description + 1 clic pour flasher.

## 🌟 Fonctionnalités

- 🤖 **Text-to-Device** : Décrivez votre projet (ex: *"Un ESP32 avec un capteur DHT22 sur le GPIO4 et une LED WS2812B sur le GPIO5"*).
- 🛠️ **Génération YAML Intelligente** : L'IA génère une configuration optimisée, sans erreurs de syntaxe.
- 🔌 **Web Flasher Intégré** : Flashez votre firmware directement depuis votre navigateur via WebUSB (ESP Web Tools).
- 🎨 **Interface Ultra-Sobre** : Un design épuré, sans distraction, focalisé sur l'efficacité.
- 📱 **Multi-Board** : Support complet ESP32 (S2, S3, C3, C6), ESP8266 et ESP8285.

## 🚀 Démarrage Rapide

1. **Décrivez** : Tapez votre configuration dans le champ de saisie IA.
2. **Générez** : L'IA prépare votre fichier YAML en temps réel.
3. **Connectez** : Branchez votre ESP en USB.
4. **Flashez** : Cliquez sur le bouton de flashage pour injecter le code.

## 🛠️ Stack Technique

- **Frontend** : Next.js / React (Interface minimale).
- **Animations** : Framer Motion.
- **Hardware** : ESP Web Tools pour le flashage USB natif.
- **IA** : Intégration LLM pour la traduction Langage Naturel -> YAML ESPHome.

## 📦 Installation Locale (Développement)

```bash
# 1. Cloner le repo
git clone [https://github.com/lixteech/esphome-zerocode.git](https://github.com/lixteech/esphome-zerocode.git)
cd esphome-zerocode

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur
npm run dev
