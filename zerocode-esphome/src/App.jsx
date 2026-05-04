// ESP Home YAML Generator - AI Mode with Modern Design

import { useState, useMemo, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import { useAiGeneration } from "./hooks/useAiGeneration";
import { THEMES, YAML_COLORS, GRADIENTS } from "./constants/colors";
import { EditableYAMLPanel, AIPromptPanel, SecretsPanel, WebFlasher } from "./components/index";
import { generateYAML, downloadYaml } from "./utils/yamlGenerator";

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const colors = THEMES[theme];
  const yamlColors = YAML_COLORS[theme];

  return (
    <ThemeContext.Provider value={{ theme, colors, yamlColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

function generateYAMLLines(yamlStr, yamlColors) {
  return yamlStr.split('\n').map((line, idx) => {
    const trimmed = line.trim();
    let type = 'text';
    if (trimmed.startsWith('#')) type = 'comment';
    else if (trimmed.includes(':')) type = 'key';
    else if (trimmed.startsWith('-')) type = 'value';
    return { text: line, type, num: idx + 1 };
  });
}

function App() {
  const aiGeneration = useAiGeneration();
  const { colors, yamlColors, toggleTheme, theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [showFlashModal, setShowFlashModal] = useState(false);
  const [secrets, setSecrets] = useState({
    wifiSsid: localStorage.getItem("esphome_wifi_ssid") || "",
    wifiPass: localStorage.getItem("esphome_wifi_pass") || "",
    apiKey: localStorage.getItem("esphome_api_key") || "",
  });
  const [webFlasherOpen, setWebFlasherOpen] = useState(false);

  // Save secrets to localStorage
  const handleSecretsChange = useCallback((newSecrets) => {
    setSecrets(newSecrets);
    localStorage.setItem("esphome_wifi_ssid", newSecrets.wifiSsid || "");
    localStorage.setItem("esphome_wifi_pass", newSecrets.wifiPass || "");
    localStorage.setItem("esphome_api_key", newSecrets.apiKey || "");
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(aiGeneration.generatedYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [aiGeneration.generatedYaml]);

  const handleDownload = useCallback(() => {
    downloadYaml(aiGeneration.generatedYaml, "ai-generated");
  }, [aiGeneration.generatedYaml]);

  const handleWebFlash = useCallback(() => {
    setWebFlasherOpen(true);
  }, []);

  const handleFlashToWeb = useCallback(() => {
    window.open("https://web.esphome.io/", "_blank");
    setShowFlashModal(false);
  }, []);

  const yamlLines = useMemo(
    () => generateYAMLLines(aiGeneration.generatedYaml, yamlColors),
    [aiGeneration.generatedYaml, yamlColors]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.background,
        color: colors.text,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${colors.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${colors.primary}; }
        input, select, button, textarea { font-family: inherit; }
        textarea { resize: none; }
      `}</style>

      {/* Background gradient glow */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60vh",
          background: GRADIENTS.glow,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          position: "relative",
          zIndex: 10,
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${colors.borderLight}`,
          backdropFilter: "blur(20px)",
          background: theme === "dark" ? "rgba(10, 10, 15, 0.8)" : "rgba(255, 255, 255, 0.8)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: GRADIENTS.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            ⚡
          </motion.div>
          <div>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 700,
                background: GRADIENTS.primary,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
              }}
            >
              ZeroCode ESPHome
            </h1>
            <p
              style={{
                fontSize: 12,
                color: colors.textSecondary,
                marginTop: 2,
              }}
            >
              AI-Powered YAML Generator
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: `1px solid ${colors.border}`,
              background: colors.surface,
              color: colors.text,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.2s",
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
            <span style={{ fontSize: 13, fontWeight: 500 }}>
              {theme === "dark" ? "Light" : "Dark"}
            </span>
          </motion.button>
        </div>
      </motion.header>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            borderRight: `1px solid ${colors.borderLight}`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: 16 }}>
              <SecretsPanel 
                secrets={secrets}
                onSecretsChange={handleSecretsChange}
              />
            </div>
            <AIPromptPanel
              prompt={aiGeneration.prompt}
              onPromptChange={aiGeneration.setPrompt}
              isGenerating={aiGeneration.isGenerating}
              onGenerate={aiGeneration.generateFromPrompt}
              generatedYaml={aiGeneration.generatedYaml}
              error={aiGeneration.error}
              onClearError={aiGeneration.clearError}
              onCopy={handleCopy}
              onDownload={handleDownload}
              onFlash={handleWebFlash}
              validation={aiGeneration.validation}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <EditableYAMLPanel
            yaml={aiGeneration.generatedYaml}
            onYAMLChange={() => {}}
            lines={yamlLines}
            copied={copied}
            onCopy={handleCopy}
            onDownload={handleDownload}
          />
        </motion.div>
      </div>

      {/* Flash Modal */}
      <AnimatePresence>
        {showFlashModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFlashModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: colors.surface,
                borderRadius: 20,
                padding: 32,
                maxWidth: 480,
                width: "90%",
                border: `1px solid ${colors.border}`,
                boxShadow: colors.shadowGlow,
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                ⚡
              </div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  textAlign: "center",
                  marginBottom: 8,
                  color: colors.text,
                }}
              >
                Flash to Device
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: colors.textSecondary,
                  textAlign: "center",
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                You'll be redirected to the ESPHome Web Flasher. Make sure your device is connected via USB.
              </p>
              <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
                <motion.button
                  onClick={handleFlashToWeb}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "14px 24px",
                    borderRadius: 12,
                    border: "none",
                    background: GRADIENTS.primary,
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Open Web Flasher
                </motion.button>
                <motion.button
                  onClick={() => setShowFlashModal(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "14px 24px",
                    borderRadius: 12,
                    border: `1px solid ${colors.border}`,
                    background: "transparent",
                    color: colors.textSecondary,
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Web Flasher */}
      <WebFlasher
        yaml={aiGeneration.generatedYaml}
        deviceName="esphome-device"
        isOpen={webFlasherOpen}
        onClose={() => setWebFlasherOpen(false)}
      />
    </div>
  );
}

function AppWithProvider() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWithProvider;