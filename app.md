# Mission : Implémentation d'un Générateur IA de Configuration ESPHome

Agis en tant qu'expert Full-Stack et IoT. Ta mission est de modifier le dépôt `github.com/lixteech/esphome-zerocode` pour intégrer un système de génération de configuration assisté par IA.

## 1. Fonctionnalités Clés
- **Interface de saisie** : Ajoute un champ de texte proéminent où l'utilisateur décrit son besoin (ex: "Un capteur de température DHT22 sur le pin D2 et une LED RGB en WS2812B sur le D3").
- **Génération Automatique** : Utilise un appel API (LLM) pour convertir cette description en un fichier YAML valide pour ESPHome.
- **Web Flasher** : Une fois le YAML généré, l'interface doit automatiquement charger la config et ouvrir l'outil de flashage Web (ESP Web Tools) pour injecter le firmware.

## 2. Design & UI
- **Style** : Interface sobre, minimaliste et épurée (Inspiration : Vercel, Linear ou shadcn/ui).
- **UX** : Transition fluide entre la saisie du texte et l'écran de flashage.
- **Feedback** : Indicateurs visuels simples pendant la génération (spinner discret ou barre de progression).

## 3. Contraintes de Code (CRITIQUE)
- **Zéro Commentaire** : Le code doit être auto-explicatif. Ne génère aucun commentaire (`//`, `#`, `/* */`) dans les fichiers source.
- **Modularité** : Sépare logiquement la logique de prompt, l'appel API et l'intégration du Web Flasher.
- **Clean Code** : Utilise des noms de variables et de fonctions explicites pour compenser l'absence de commentaires.

## 4. Étapes attendues
1. Analyse l'arborescence actuelle du repo.
2. Crée ou modifie les composants React/Frontend pour inclure la zone de texte IA.
3. Implémente le bridge vers le compilateur/flasher web d'ESPHome.
4. Applique le style minimaliste CSS/Tailwind.

Commence par analyser la structure actuelle et propose un plan d'action avant de modifier les fichiers.
