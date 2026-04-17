/**
 * @fileoverview Toggle switch component with Framer Motion animations
 *
 * @module components/Form/Toggle
 */

import React from "react";
import { motion } from "framer-motion";
import { PALETTE } from "../../constants/colors";

/**
 * Toggle switch component
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Toggle label
 * @param {string} [props.desc] - Description text
 * @param {boolean} props.value - Current state
 * @param {Function} props.onChange - Change handler
 * @returns {JSX.Element} Toggle component
 */
export function Toggle({ label, desc, value, onChange }) {
  return (
    <motion.button
      onClick={() => onChange(!value)}
      animate={{
        borderColor: value
          ? "rgba(99,102,241,0.6)"
          : "rgba(255,255,255,0.07)",
      }}
      style={{
        width: "100%",
        padding: "14px 16px",
        borderRadius: 10,
        background: value
          ? "rgba(99,102,241,0.1)"
          : "rgba(255,255,255,0.02)",
        border: "1px solid",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "inherit",
        textAlign: "left",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: value ? PALETTE.primaryLight : PALETTE.textMuted,
          }}
        >
          {label}
        </div>
        {desc && (
          <div
            style={{
              fontSize: 12,
              color: PALETTE.textDark,
              marginTop: 2,
            }}
          >
            {desc}
          </div>
        )}
      </div>
      <div
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          padding: 2,
          background: value ? PALETTE.primary : "#1e293b",
          transition: "background 0.2s",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <motion.div
          animate={{ x: value ? 16 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "white",
          }}
        />
      </div>
    </motion.button>
  );
}
