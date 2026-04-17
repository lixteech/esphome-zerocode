/**
 * @fileoverview Professional application header with smooth animations
 *
 * @module components/ui/Header
 */

import React from "react";
import { motion } from "framer-motion";
import { PALETTE } from "../../constants/colors";

/**
 * Animated application header - elegant & refined
 *
 * @param {Object} props - Component props
 * @param {Object} props.boardDef - Current board definition
 * @returns {JSX.Element} Header component
 */
export function Header({ boardDef }) {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
        background: "rgba(10,14,39,0.6)",
        backdropFilter: "blur(10px)",
        flexShrink: 0,
      }}
    >
      {/* Logo section */}
      <motion.div 
        style={{ display: "flex", alignItems: "center", gap: 12 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {/* Animated geometric logo */}
        <motion.div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, #6366f1, #a78bfa)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </motion.div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span
            style={{
              fontWeight: 600,
              fontSize: 18,
              color: PALETTE.text,
              letterSpacing: "-0.01em",
            }}
          >
            ZeroCode
          </span>
          <span
            style={{
              fontSize: 13,
              color: PALETTE.textMuted,
            }}
          >
            ESPHome Configurator
          </span>
        </div>
      </motion.div>

      {/* Right section */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {boardDef && (
          <span
            style={{
              fontSize: 13,
              color: PALETTE.textSecondary,
              fontFamily: "var(--font-mono)",
              padding: "4px 10px",
              background: PALETTE.bgTertiary,
              borderRadius: 4,
            }}
          >
            {boardDef.family} | {boardDef.pins} pins
          </span>
        )}

        <button
          onClick={() => window.open("https://esphome.io/", "_blank")}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            background: PALETTE.surface,
            border: `1px solid ${PALETTE.border}`,
            color: PALETTE.textSecondary,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = PALETTE.primary;
            e.currentTarget.style.color = PALETTE.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = PALETTE.border;
            e.currentTarget.style.color = PALETTE.textSecondary;
          }}
        >
          Documentation
        </button>
      </div>
    </motion.header>
  );
}
