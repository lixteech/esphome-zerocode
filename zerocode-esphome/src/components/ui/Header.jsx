/**
 * @fileoverview Application header with navigation and board info
 *
 * @module components/ui/Header
 */

import React from "react";
import { PALETTE } from "../../constants/colors";

/**
 * Application header component
 *
 * @param {Object} props - Component props
 * @param {Object} props.boardDef - Current board definition
 * @param {string} props.boardDef.family - Board family name
 * @param {number} props.boardDef.pins - Number of pins
 * @returns {JSX.Element} Header component
 */
export function Header({ boardDef }) {
  return (
    <header
      style={{
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(8,14,26,0.85)",
        backdropFilter: "blur(16px)",
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      {/* Logo section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: "linear-gradient(135deg,#6366f1,#00e5ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 16px rgba(99,102,241,0.45)",
            fontSize: 14,
          }}
        >
          ⚡
        </div>
        <span
          style={{
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: "-0.02em",
          }}
        >
          Zero
          <span style={{ color: PALETTE.primary }}>Code</span>{" "}
          <span
            style={{
              color: PALETTE.textDark,
              fontWeight: 400,
              fontSize: 13,
            }}
          >
            ESPHome
          </span>
        </span>
        <span
          style={{
            marginLeft: 6,
            padding: "2px 7px",
            borderRadius: 100,
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.2)",
            fontSize: 10,
            color: PALETTE.accentBlue,
            letterSpacing: "0.08em",
          }}
        >
          BUILDER
        </span>
      </div>

      {/* Board info and actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: PALETTE.textDark,
            fontFamily: "monospace",
          }}
        >
          {boardDef?.family} · {boardDef?.pins} pins
        </span>

        <button
          onClick={() =>
            window.open("https://web.esphome.io/", "_blank")
          }
          style={{
            padding: "6px 14px",
            borderRadius: 7,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            border: "none",
            color: "white",
            fontSize: 12,
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: "0 0 16px rgba(99,102,241,0.3)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 0 20px rgba(99,102,241,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow =
              "0 0 16px rgba(99,102,241,0.3)";
          }}
        >
          ⚡ Flash via Web
        </button>
      </div>
    </header>
  );
}
