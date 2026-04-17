/**
 * @fileoverview 2D SVG board preview component showing ESP32/ESP8266 pinout
 *
 * @module components/BoardPreview
 */

import React, { useState, useEffect } from "react";
import { FAMILY_COLORS } from "../constants/colors";
import {
  LEFT_PINS,
  RIGHT_PINS,
  BOARD_DIMENSIONS,
  getPinSpacing,
  isNumericPin,
} from "../constants/pins";

/**
 * Board preview component
 *
 * @param {Object} props - Component props
 * @param {Object} props.boardDef - Board definition object
 * @param {string} props.boardDef.family - Chip family
 * @param {string} props.boardDef.board - Board identifier
 * @param {string} props.boardDef.label - Display label
 * @param {Array<string>} props.activeGpios - Active GPIO pin numbers
 * @returns {JSX.Element} SVG board preview
 */
export function BoardPreview({ boardDef, activeGpios }) {
  const [tick, setTick] = useState(0);

  // Animation tick for glow pulse effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTick((t) => t + 1);
    }, 80);
    return () => clearInterval(intervalId);
  }, []);

  // Guard against missing board definition
  if (!boardDef) {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${BOARD_DIMENSIONS.svgWidth} ${BOARD_DIMENSIONS.svgHeight}`}
      >
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill="#475569"
          fontSize="12"
        >
          No board selected
        </text>
      </svg>
    );
  }

  const theme = FAMILY_COLORS[boardDef.family] || FAMILY_COLORS["ESP32"];
  const activeSet = new Set(activeGpios.map(String));

  const {
    svgWidth: W,
    svgHeight: H,
    pcbWidth,
    pcbHeight,
    pinRadius: PIN_R,
    pinLength: PIN_LEN,
  } = BOARD_DIMENSIONS;

  const cx = W / 2;
  const cy = H / 2;
  const PCB_X = cx - pcbWidth / 2;
  const PCB_Y = cy - pcbHeight / 2;
  const PIN_SPACING = getPinSpacing();

  // Pulse animation value (0 to 1)
  const pulse = (Math.sin(tick * 0.18) + 1) / 2;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="bg-grad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={theme.glow} stopOpacity="0.06" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="chip-grad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={theme.accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={theme.chip} stopOpacity="1" />
        </radialGradient>
        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-soft">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <rect width={W} height={H} fill="url(#bg-grad)" />

      {/* PCB board */}
      <rect
        x={PCB_X}
        y={PCB_Y}
        width={pcbWidth}
        height={pcbHeight}
        rx={10}
        ry={10}
        fill={theme.pcb}
        stroke={theme.accent}
        strokeWidth="1"
        strokeOpacity="0.35"
      />

      {/* PCB grid lines */}
      {[0.25, 0.5, 0.75].map((t, i) => (
        <line
          key={`h-${i}`}
          x1={PCB_X + 10}
          y1={PCB_Y + pcbHeight * t}
          x2={PCB_X + pcbWidth - 10}
          y2={PCB_Y + pcbHeight * t}
          stroke={theme.accent}
          strokeWidth="0.3"
          strokeOpacity="0.12"
        />
      ))}
      {[0.33, 0.66].map((t, i) => (
        <line
          key={`v-${i}`}
          x1={PCB_X + pcbWidth * t}
          y1={PCB_Y + 10}
          x2={PCB_X + pcbWidth * t}
          y2={PCB_Y + pcbHeight - 10}
          stroke={theme.accent}
          strokeWidth="0.3"
          strokeOpacity="0.12"
        />
      ))}

      {/* USB connector */}
      <rect
        x={cx - 18}
        y={PCB_Y - 14}
        width={36}
        height={16}
        rx={4}
        fill="#1a1a1a"
        stroke="#333"
        strokeWidth="1"
      />
      <rect
        x={cx - 12}
        y={PCB_Y - 11}
        width={24}
        height={10}
        rx={2}
        fill="#111"
        stroke="#222"
        strokeWidth="0.5"
      />

      {/* Antenna */}
      <rect
        x={PCB_X + pcbWidth - 24}
        y={cy - 30}
        width={20}
        height={60}
        rx={4}
        fill={theme.chip}
        stroke={theme.accent}
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />
      <text
        x={PCB_X + pcbWidth - 14}
        y={cy + 4}
        textAnchor="middle"
        fontSize="6"
        fill={theme.accent}
        opacity="0.5"
        fontFamily="monospace"
        transform={`rotate(-90,${PCB_X + pcbWidth - 14},${cy})`}
      >
        ANTENNA
      </text>

      {/* Main chip */}
      <rect
        x={cx - 38}
        y={cy - 42}
        width={76}
        height={84}
        rx={6}
        fill="url(#chip-grad)"
        stroke={theme.accent}
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      {/* Chip mark */}
      <circle
        cx={cx - 28}
        cy={cy - 32}
        r={4}
        fill={theme.accent}
        opacity="0.25"
      />
      {/* Chip label */}
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill={theme.accent}
        opacity="0.9"
        fontFamily="monospace"
      >
        {boardDef.family}
      </text>
      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fontSize="7"
        fill={theme.accent}
        opacity="0.55"
        fontFamily="monospace"
      >
        {boardDef.board?.slice(0, 12)}
      </text>
      {/* Chip glow pulse */}
      <rect
        x={cx - 38}
        y={cy - 42}
        width={76}
        height={84}
        rx={6}
        fill={theme.glow}
        opacity={0.04 + pulse * 0.04}
      />

      {/* LED status dot */}
      <circle
        cx={PCB_X + 16}
        cy={PCB_Y + 16}
        r={4}
        fill={activeGpios.length > 0 ? theme.glow : "#1a2a1a"}
        filter={activeGpios.length > 0 ? "url(#glow-strong)" : "none"}
        opacity={activeGpios.length > 0 ? 0.7 + pulse * 0.3 : 0.4}
      />

      {/* Left pins */}
      {LEFT_PINS.map((label, i) => {
        const py = PCB_Y + 20 + i * PIN_SPACING;
        const active = isNumericPin(label) && activeSet.has(label);
        return (
          <g key={`l-${i}`}>
            <line
              x1={PCB_X}
              y1={py}
              x2={PCB_X - PIN_LEN}
              y2={py}
              stroke={active ? theme.glow : "#1a2e1a"}
              strokeWidth={active ? 2 : 1}
              filter={active ? "url(#glow-soft)" : "none"}
            />
            <circle
              cx={PCB_X - PIN_LEN}
              cy={py}
              r={PIN_R}
              fill={active ? theme.glow : "#0d1a10"}
              stroke={active ? theme.glow : "#1e3020"}
              strokeWidth="1"
              filter={active ? "url(#glow-strong)" : "none"}
              opacity={active ? 0.7 + pulse * 0.3 : 1}
            />
            <text
              x={PCB_X - PIN_LEN - 8}
              y={py + 3.5}
              textAnchor="end"
              fontSize="7.5"
              fill={active ? theme.accent : "#2d4030"}
              fontFamily="monospace"
              fontWeight={active ? "700" : "400"}
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Right pins */}
      {RIGHT_PINS.map((label, i) => {
        const py = PCB_Y + 20 + i * PIN_SPACING;
        const active = isNumericPin(label) && activeSet.has(label);
        return (
          <g key={`r-${i}`}>
            <line
              x1={PCB_X + pcbWidth}
              y1={py}
              x2={PCB_X + pcbWidth + PIN_LEN}
              y2={py}
              stroke={active ? theme.glow : "#1a2e1a"}
              strokeWidth={active ? 2 : 1}
              filter={active ? "url(#glow-soft)" : "none"}
            />
            <circle
              cx={PCB_X + pcbWidth + PIN_LEN}
              cy={py}
              r={PIN_R}
              fill={active ? theme.glow : "#0d1a10"}
              stroke={active ? theme.glow : "#1e3020"}
              strokeWidth="1"
              filter={active ? "url(#glow-strong)" : "none"}
              opacity={active ? 0.7 + pulse * 0.3 : 1}
            />
            <text
              x={PCB_X + pcbWidth + PIN_LEN + 8}
              y={py + 3.5}
              textAnchor="start"
              fontSize="7.5"
              fill={active ? theme.accent : "#2d4030"}
              fontFamily="monospace"
              fontWeight={active ? "700" : "400"}
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Family badge */}
      <rect
        x={PCB_X + 6}
        y={PCB_Y + pcbHeight - 22}
        width={pcbWidth - 12}
        height={16}
        rx={4}
        fill={theme.accent}
        opacity="0.08"
      />
      <text
        x={cx}
        y={PCB_Y + pcbHeight - 12}
        textAnchor="middle"
        fontSize="8"
        fill={theme.accent}
        opacity="0.5"
        fontFamily="monospace"
      >
        {boardDef.label}
      </text>
    </svg>
  );
}
