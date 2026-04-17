/**
 * @fileoverview Component configuration card with expandable settings
 *
 * @module components/CompCard
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getComponentByType } from "../constants/components";
import { generateGpioOptions } from "../constants/pins";
import { Field } from "./Form/Field";
import { Select } from "./Form/Select";
import { PALETTE } from "../constants/colors";

/**
 * GPIO options for select dropdowns
 * @type {Array<{value: string, label: string}>}
 */
const GPIO_OPTIONS = generateGpioOptions(36);

/**
 * Restore mode options for switches
 * @type {Array<{value: string, label: string}>}
 */
const RESTORE_MODE_OPTIONS = [
  { value: "RESTORE_DEFAULT_OFF", label: "Restore → OFF" },
  { value: "RESTORE_DEFAULT_ON", label: "Restore → ON" },
  { value: "ALWAYS_OFF", label: "Always OFF" },
  { value: "ALWAYS_ON", label: "Always ON" },
];

/**
 * Editable component card
 *
 * @param {Object} props - Component props
 * @param {Object} props.comp - Component configuration
 * @param {Function} props.onRemove - Remove handler
 * @param {Function} props.onChange - Change handler for updates
 * @returns {JSX.Element} Component card
 */
export function CompCard({ comp, onRemove, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const def = getComponentByType(comp.type);

  if (!def) {
    console.warn(`Unknown component type: ${comp.type}`);
    return null;
  }

  /**
   * Update a specific field
   * @param {string} field - Field name
   * @param {string} value - New value
   */
  const updateField = (field, value) => {
    onChange({ ...comp, [field]: value });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 6,
      }}
    >
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 12px",
          cursor: "pointer",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 18 }}>{def.icon}</span>
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: PALETTE.text,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {comp.name || def.label}
          </div>
          <div
            style={{
              color: PALETTE.textDark,
              fontSize: 11,
              fontFamily: "monospace",
            }}
          >
            {comp.type} · {def.bus}
          </div>
        </div>

        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          style={{ color: PALETTE.textDark }}
        >
          ▾
        </motion.span>

        {/* Remove button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.15)",
            borderRadius: 6,
            padding: "3px 8px",
            cursor: "pointer",
            color: PALETTE.error,
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      {/* Expanded settings */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "4px 12px 12px",
                borderTop: "1px solid rgba(255,255,255,0.04)",
                display: "grid",
                gap: 8,
              }}
            >
              {/* Common fields */}
              <Field
                label="Name"
                value={comp.name || ""}
                onChange={(v) => updateField("name", v)}
                placeholder={def.label}
              />

              {/* Bus-specific pin fields */}
              {def.bus === "gpio" && (
                <Select
                  label="GPIO Pin"
                  value={comp.gpio || "4"}
                  onChange={(v) => updateField("gpio", v)}
                  options={GPIO_OPTIONS}
                />
              )}

              {def.bus === "1wire" && (
                <Select
                  label="GPIO OneWire"
                  value={comp.gpio || "4"}
                  onChange={(v) => updateField("gpio", v)}
                  options={GPIO_OPTIONS}
                />
              )}

              {def.bus === "adc" && (
                <Select
                  label="GPIO ADC"
                  value={comp.gpio || "34"}
                  onChange={(v) => updateField("gpio", v)}
                  options={GPIO_OPTIONS}
                />
              )}

              {def.bus === "pwm" &&
                comp.type !== "rgb" &&
                comp.type !== "rgbw" && (
                  <Select
                    label="GPIO PWM"
                    value={comp.gpio || "13"}
                    onChange={(v) => updateField("gpio", v)}
                    options={GPIO_OPTIONS}
                  />
                )}

              {/* RGB LED pins */}
              {comp.type === "rgb" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 6,
                  }}
                >
                  <Select
                    label="R"
                    value={comp.gpioR || "25"}
                    onChange={(v) => updateField("gpioR", v)}
                    options={GPIO_OPTIONS}
                  />
                  <Select
                    label="G"
                    value={comp.gpioG || "26"}
                    onChange={(v) => updateField("gpioG", v)}
                    options={GPIO_OPTIONS}
                  />
                  <Select
                    label="B"
                    value={comp.gpioB || "27"}
                    onChange={(v) => updateField("gpioB", v)}
                    options={GPIO_OPTIONS}
                  />
                </div>
              )}

              {/* RGBW LED pins */}
              {comp.type === "rgbw" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: 5,
                  }}
                >
                  <Select
                    label="R"
                    value={comp.gpioR || "25"}
                    onChange={(v) => updateField("gpioR", v)}
                    options={GPIO_OPTIONS}
                  />
                  <Select
                    label="G"
                    value={comp.gpioG || "26"}
                    onChange={(v) => updateField("gpioG", v)}
                    options={GPIO_OPTIONS}
                  />
                  <Select
                    label="B"
                    value={comp.gpioB || "27"}
                    onChange={(v) => updateField("gpioB", v)}
                    options={GPIO_OPTIONS}
                  />
                  <Select
                    label="W"
                    value={comp.gpioW || "32"}
                    onChange={(v) => updateField("gpioW", v)}
                    options={GPIO_OPTIONS}
                  />
                </div>
              )}

              {/* NeoPixel settings */}
              {(comp.type === "neopixel" || comp.type === "sk6812") && (
                <>
                  <Select
                    label="GPIO Data"
                    value={comp.gpio || "2"}
                    onChange={(v) => updateField("gpio", v)}
                    options={GPIO_OPTIONS}
                  />
                  <Field
                    label="LED Count"
                    value={comp.numLeds || "30"}
                    onChange={(v) => updateField("numLeds", v)}
                    placeholder="30"
                  />
                </>
              )}

              {/* I2C pins */}
              {def.bus === "i2c" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 6,
                  }}
                >
                  <Select
                    label="SDA"
                    value={comp.i2cSda || "21"}
                    onChange={(v) => updateField("i2cSda", v)}
                    options={GPIO_OPTIONS}
                  />
                  <Select
                    label="SCL"
                    value={comp.i2cScl || "22"}
                    onChange={(v) => updateField("i2cScl", v)}
                    options={GPIO_OPTIONS}
                  />
                </div>
              )}

              {/* HC-SR04 pins */}
              {comp.type === "hcsr04" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 6,
                  }}
                >
                  <Select
                    label="Trigger"
                    value={comp.gpioTrig || "12"}
                    onChange={(v) => updateField("gpioTrig", v)}
                    options={GPIO_OPTIONS}
                  />
                  <Select
                    label="Echo"
                    value={comp.gpioEcho || "14"}
                    onChange={(v) => updateField("gpioEcho", v)}
                    options={GPIO_OPTIONS}
                  />
                </div>
              )}

              {/* Update interval for sensors (not UART) */}
              {def.platform === "sensor" && def.bus !== "uart" && (
                <Field
                  label="Update Interval"
                  value={comp.interval || "60s"}
                  onChange={(v) => updateField("interval", v)}
                  placeholder="60s"
                />
              )}

              {/* Restore mode for switches/outputs */}
              {(comp.type === "relay" || comp.type === "led") && (
                <Select
                  label="Restore Mode"
                  value={comp.restoreMode || "RESTORE_DEFAULT_OFF"}
                  onChange={(v) => updateField("restoreMode", v)}
                  options={RESTORE_MODE_OPTIONS}
                />
              )}

              {/* PIR delay */}
              {comp.type === "pir" && (
                <Field
                  label="Delayed Off"
                  value={comp.delay || "5s"}
                  onChange={(v) => updateField("delay", v)}
                  placeholder="5s"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
