/**
 * @fileoverview Component picker dropdown with search and category filtering
 *
 * @module components/CompPicker
 */

import React, { useState, useCallback, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "../hooks/useClickOutside";
import {
  CATEGORIES,
  searchComponents,
  getComponentsByCategory,
} from "../constants/components";
import { ThemeContext } from "../App";
import { createComponentId } from "../utils/helpers";

/**
 * Input style for search
 * @type {Object}
 */
const getSearchStyle = (colors) => ({
  background: colors.surfaceLight,
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  padding: "7px 12px",
  fontSize: 13,
  width: "100%",
  outline: "none",
  color: colors.text,
  fontFamily: "inherit",
});

/**
 * Category button style
 * @param {boolean} isActive - Whether this category is selected
 * @param {Object} colors - Theme colors
 * @returns {Object} Style object
 */
const getCategoryStyle = (isActive, colors) => ({
  padding: "4px 10px",
  borderRadius: 100,
  border: "none",
  cursor: "pointer",
  background: isActive ? colors.primaryBg : colors.surfaceLight,
  color: isActive ? colors.primaryLight : colors.textSecondary,
  fontSize: 11,
  fontFamily: "inherit",
  transition: "all 0.15s",
});

/**
 * Component picker with search and category tabs
 *
 * @param {Object} props - Component props
 * @param {Function} props.onAdd - Callback when a component is selected
 * @returns {JSX.Element} Component picker
 */
export function CompPicker({ onAdd }) {
  const { colors } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("temperature");
  const [query, setQuery] = useState("");

  const closePicker = useCallback(() => setIsOpen(false), []);
  const ref = useClickOutside(closePicker);

  // Filter components based on search or category
  const items = query
    ? searchComponents(query)
    : getComponentsByCategory(category);

  /**
   * Handle component selection
   * @param {Object} def - Component definition
   */
  const handleSelect = (def) => {
    const newComponent = {
      ...def,
      id: createComponentId(),
      name: def.label,
      gpio: "4",
      interval: "60s",
      i2cSda: "21",
      i2cScl: "22",
      gpioR: "25",
      gpioG: "26",
      gpioB: "27",
      numLeds: "30",
      restoreMode: "RESTORE_DEFAULT_OFF",
      inverted: "false",
    };

    onAdd(newComponent);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "11px 16px",
          borderRadius: 10,
          background: colors.primaryBg,
          border: `1px dashed ${colors.primary}55`,
          color: colors.primary,
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = colors.primaryBg + "20";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = colors.primaryBg;
        }}
      >
        <span style={{ fontSize: 16 }}>+</span> Add Component
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              right: 0,
              zIndex: 200,
              background: colors.surface,
              border: `1px solid ${colors.primary}40`,
              borderRadius: 12,
              boxShadow: colors.shadow,
              overflow: "hidden",
            }}
          >
            {/* Search input */}
            <div
              style={{
                padding: "10px 12px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components..."
                style={getSearchStyle(colors)}
                autoFocus
              />
            </div>

            {/* Category tabs (hidden when searching) */}
            {!query && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 4,
                  padding: "8px 10px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    style={getCategoryStyle(cat.id === category, colors)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}

            {/* Component list */}
            <div
              style={{
                maxHeight: 280,
                overflowY: "auto",
                padding: 6,
              }}
            >
              {items.map((def) => (
                <button
                  key={def.type}
                  onClick={() => handleSelect(def)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: 8,
                    padding: "9px 12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 3,
                    textAlign: "left",
                    fontFamily: "inherit",
                    transition: "all 0.12s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(99,102,241,0.1)";
                    e.currentTarget.style.borderColor =
                      "rgba(99,102,241,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.02)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.04)";
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0 }}>
                    {def.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        color: colors.text,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {def.label}
                    </div>
                    <div
                      style={{ color: colors.textSecondary, fontSize: 11 }}
                    >
                      {def.desc}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: colors.surfaceLight,
                      color: colors.textSecondary,
                      textTransform: "uppercase",
                    }}
                  >
                    {def.bus}
                  </span>
                </button>
              ))}

              {items.length === 0 && (
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: PALETTE.textDark,
                    fontSize: 13,
                  }}
                >
                  No components found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
