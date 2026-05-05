/**
 * @fileoverview Secrets and configuration panel for WiFi and API keys
 * @module components/SecretsPanel
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PALETTE, FORM_COLORS } from "../constants/colors";

const LABEL_STYLE = {
  fontSize: 13,
  fontWeight: 500,
  color: FORM_COLORS.labelText,
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const INPUT_STYLE = {
  background: PALETTE.surfaceLight,
  border: `1px solid ${FORM_COLORS.inputBorder}`,
  borderRadius: 8,
  padding: "10px 12px",
  color: FORM_COLORS.inputText,
  fontSize: 14,
  width: "100%",
  outline: "none",
  fontFamily: "monospace",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

const BUTTON_STYLE = {
  padding: "10px 16px",
  borderRadius: 8,
  border: "none",
  background: PALETTE.primary,
  color: "#fff",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s",
};

/**
 * SecretsPanel component for managing WiFi and API credentials
 * @param {Object} props - Component props
 * @param {Object} props.secrets - Secrets object {wifiSsid, wifiPass, apiKey}
 * @param {Function} props.onSecretsChange - Callback when secrets change
 * @returns {JSX.Element}
 */
export function SecretsPanel({ secrets = {}, onSecretsChange }) {
  const [showSecrets, setShowSecrets] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleChange = (key, value) => {
    onSecretsChange?.({
      ...secrets,
      [key]: value,
    });
  };

  const handleCopySecrets = () => {
    const secretsYaml = `secrets:
  wifi_ssid: "${secrets.wifiSsid || 'your_ssid'}"
  wifi_password: "${secrets.wifiPass || 'your_password'}"
  api_key: "${secrets.apiKey || 'your_api_key'}"`;
    navigator.clipboard.writeText(secretsYaml);
  };

  const handleClearSecrets = () => {
    if (confirm("Clear all secrets?")) {
      onSecretsChange?.({
        wifiSsid: "",
        wifiPass: "",
        apiKey: "",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: PALETTE.surfaceLight,
        border: `1px solid ${PALETTE.border}`,
        borderRadius: 12,
        padding: isCollapsed ? "12px 16px" : "16px",
        marginBottom: 16,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🔐</span>
          <span style={{ fontWeight: 600, fontSize: 14, color: PALETTE.text }}>
            Secrets & Configuration
          </span>
        </div>
        <motion.div
          animate={{ rotate: isCollapsed ? -90 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 18 }}
        >
          ▼
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={false}
        animate={{ height: isCollapsed ? 0 : "auto" }}
        transition={{ duration: 0.2 }}
        style={{ overflow: "hidden" }}
      >
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {/* WiFi SSID */}
          <div>
            <label style={LABEL_STYLE}>WiFi SSID</label>
            <input
              type="text"
              placeholder="Your WiFi network name"
              value={secrets.wifiSsid || ""}
              onChange={(e) => handleChange("wifiSsid", e.target.value)}
              style={INPUT_STYLE}
            />
          </div>

          {/* WiFi Password */}
          <div>
            <label style={LABEL_STYLE}>WiFi Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showSecrets ? "text" : "password"}
                placeholder="Your WiFi password"
                value={secrets.wifiPass || ""}
                onChange={(e) => handleChange("wifiPass", e.target.value)}
                style={{
                  ...INPUT_STYLE,
                  paddingRight: 40,
                }}
              />
              <button
                onClick={() => setShowSecrets(!showSecrets)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16,
                  color: FORM_COLORS.inputText,
                }}
              >
                {showSecrets ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* API Key */}
          <div>
            <label style={LABEL_STYLE}>API Key (Optional)</label>
            <input
              type={showSecrets ? "text" : "password"}
              placeholder="Your ESPHome API encryption key"
              value={secrets.apiKey || ""}
              onChange={(e) => handleChange("apiKey", e.target.value)}
              style={INPUT_STYLE}
            />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopySecrets}
              style={{
                ...BUTTON_STYLE,
                flex: 1,
                background: PALETTE.secondary,
              }}
            >
              📋 Copy Secrets YAML
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearSecrets}
              style={{
                ...BUTTON_STYLE,
                background: "rgba(239, 68, 68, 0.2)",
                color: PALETTE.error,
                border: `1px solid ${PALETTE.error}`,
              }}
            >
              Clear
            </motion.button>
          </div>

          {/* Info */}
          <div
            style={{
              fontSize: 12,
              color: PALETTE.textMuted,
              background: "rgba(139, 92, 246, 0.05)",
              padding: 10,
              borderRadius: 6,
              lineHeight: 1.5,
            }}
          >
            💡 Secrets are stored locally in your browser and not sent to any server.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
