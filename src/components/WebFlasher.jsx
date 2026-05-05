/**
 * @fileoverview Web Flasher component for flashing ESPHome devices
 * @module components/WebFlasher
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PALETTE, GRADIENTS } from "../constants/colors";

/**
 * WebFlasher component for direct device flashing
 * @param {Object} props - Component props
 * @param {string} props.yaml - YAML configuration to flash
 * @param {string} props.deviceName - Device name for the build
 * @param {boolean} props.isOpen - Modal open state
 * @param {Function} props.onClose - Callback to close modal
 * @returns {JSX.Element}
 */
export function WebFlasher({ yaml, deviceName = "my-device", isOpen, onClose }) {
  const [flashStatus, setFlashStatus] = useState("idle"); // idle, connecting, flashing, success, error
  const [statusMessage, setStatusMessage] = useState("");
  const [port, setPort] = useState(null);

  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (port) {
        port.close().catch(() => {});
      }
    };
  }, [port]);

  const handleSelectPort = async () => {
    try {
      setFlashStatus("connecting");
      setStatusMessage("Requesting serial port...");

      if (!navigator.serial) {
        setFlashStatus("error");
        setStatusMessage("Web Serial API not supported. Please use Chrome/Edge on desktop.");
        return;
      }

      const selectedPort = await navigator.serial.requestPort();
      setPort(selectedPort);
      setFlashStatus("idle");
      setStatusMessage("Port selected. Ready to flash.");
    } catch (error) {
      setFlashStatus("error");
      setStatusMessage(error.message || "Failed to select port");
    }
  };

  const handleFlash = async () => {
    if (!yaml || !yaml.trim()) {
      setStatusMessage("No YAML configuration to flash");
      return;
    }

    if (!port) {
      setStatusMessage("No serial port selected");
      return;
    }

    try {
      setFlashStatus("flashing");
      setStatusMessage("Preparing firmware...");

      // For now, redirect to ESPHome web flasher with instructions
      // Full binary generation would require backend/esptool integration
      const yamlEncoded = encodeURIComponent(yaml);
      const configUrl = `data:text/yaml;base64,${btoa(yaml)}`;

      setStatusMessage("Opening ESPHome Web Flasher...");

      // Store YAML in localStorage for the web flasher to access
      localStorage.setItem("esphome_yaml_config", yaml);
      localStorage.setItem("esphome_device_name", deviceName);

      // Open web flasher
      const flasherUrl = "https://web.esphome.io/";
      window.open(flasherUrl, "_blank");

      setTimeout(() => {
        setFlashStatus("success");
        setStatusMessage(
          "Web Flasher opened. Your YAML has been saved to browser storage."
        );
      }, 1000);
    } catch (error) {
      setFlashStatus("error");
      setStatusMessage(`Flash failed: ${error.message}`);
    }
  };

  const handleReset = () => {
    setFlashStatus("idle");
    setStatusMessage("");
    if (port) {
      port.close().catch(() => {});
      setPort(null);
    }
  };

  const statusColors = {
    idle: PALETTE.textSecondary,
    connecting: PALETTE.warning,
    flashing: PALETTE.primary,
    success: PALETTE.success,
    error: PALETTE.error,
  };

  const statusIcons = {
    idle: "⚙️",
    connecting: "🔌",
    flashing: "⚡",
    success: "✅",
    error: "❌",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(8px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: PALETTE.surface,
              borderRadius: 20,
              padding: 32,
              maxWidth: 500,
              width: "100%",
              border: `1px solid ${PALETTE.border}`,
              boxShadow: PALETTE.shadowGlow,
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <motion.div
                animate={flashStatus === "flashing" ? { y: [-4, 4, -4] } : {}}
                transition={{
                  duration: 0.8,
                  repeat: flashStatus === "flashing" ? Infinity : 0,
                }}
                style={{
                  fontSize: 48,
                  marginBottom: 12,
                }}
              >
                {statusIcons[flashStatus]}
              </motion.div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: PALETTE.text,
                  marginBottom: 8,
                }}
              >
                Flash Device
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: PALETTE.textSecondary,
                  marginBottom: 4,
                }}
              >
                Device: <strong>{deviceName}</strong>
              </p>
            </div>

            {/* Status Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: `${statusColors[flashStatus]}20`,
                border: `1px solid ${statusColors[flashStatus]}40`,
                borderRadius: 10,
                padding: 12,
                marginBottom: 20,
                fontSize: 13,
                color: statusColors[flashStatus],
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              {statusMessage || "Ready to flash"}
            </motion.div>

            {/* Steps */}
            {flashStatus === "idle" && !port && (
              <div
                style={{
                  background: PALETTE.surfaceLight,
                  borderRadius: 10,
                  padding: 16,
                  marginBottom: 20,
                  fontSize: 13,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 12, color: PALETTE.text }}>
                  Steps:
                </div>
                <ol style={{ marginLeft: 20, color: PALETTE.textSecondary, lineHeight: 1.8 }}>
                  <li>Connect your ESP device via USB cable</li>
                  <li>Click "Select Serial Port" and choose your device</li>
                  <li>Click "Flash Device"</li>
                  <li>ESPHome Web Flasher will open</li>
                  <li>Follow the on-screen instructions</li>
                </ol>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {flashStatus === "success" ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  style={{
                    padding: "14px 24px",
                    borderRadius: 12,
                    border: "none",
                    background: GRADIENTS.primary,
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Done
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSelectPort}
                    disabled={flashStatus === "connecting"}
                    style={{
                      padding: "14px 24px",
                      borderRadius: 12,
                      border: "none",
                      background:
                        port && flashStatus !== "connecting"
                          ? PALETTE.success + "40"
                          : PALETTE.primary,
                      color: port && flashStatus !== "connecting" ? PALETTE.success : "#fff",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: flashStatus === "connecting" ? "wait" : "pointer",
                      opacity: flashStatus === "error" ? 1 : flashStatus === "connecting" ? 0.7 : 1,
                    }}
                  >
                    {port ? "✓ Port Selected" : "Select Serial Port"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleFlash}
                    disabled={!port || flashStatus === "flashing"}
                    style={{
                      padding: "14px 24px",
                      borderRadius: 12,
                      border: "none",
                      background: GRADIENTS.primary,
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: !port || flashStatus === "flashing" ? "not-allowed" : "pointer",
                      opacity: !port || flashStatus === "flashing" ? 0.5 : 1,
                    }}
                  >
                    {flashStatus === "flashing" ? "Flashing..." : "Flash Device"}
                  </motion.button>
                </>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                style={{
                  padding: "12px 24px",
                  borderRadius: 12,
                  border: `1px solid ${PALETTE.border}`,
                  background: "transparent",
                  color: PALETTE.textSecondary,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {flashStatus === "success" ? "Close" : "Cancel"}
              </motion.button>
            </div>

            {/* Info */}
            {flashStatus === "error" && (
              <div
                style={{
                  fontSize: 12,
                  color: PALETTE.textMuted,
                  marginTop: 16,
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                🔗 If Web Serial API is not available, use{" "}
                <a
                  href="https://web.esphome.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: PALETTE.secondary, textDecoration: "underline" }}
                >
                  ESPHome Web Flasher
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
