/**
 * @fileoverview Form input field component - professional style
 *
 * @module components/Form/Field
 */

import React from "react";
import { PALETTE } from "../../constants/colors";

/**
 * Label style - clean and minimal
 * @type {Object}
 */
const LABEL_STYLE = {
  fontSize: 13,
  fontWeight: 500,
  color: PALETTE.textSecondary,
  marginBottom: 6,
};

/**
 * Input style - professional clean inputs
 * @type {Object}
 */
const INPUT_STYLE = {
  background: PALETTE.surface,
  border: `1px solid ${PALETTE.border}`,
  borderRadius: 6,
  padding: "10px 12px",
  color: PALETTE.text,
  fontSize: 14,
  width: "100%",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

/**
 * Form input field component
 *
 * @param {Object} props - Component props
 * @param {string} [props.label] - Input label
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} [props.type="text"] - Input type
 * @param {string} [props.placeholder] - Placeholder text
 * @returns {JSX.Element} Field component
 */
export function Field({ label, value, onChange, type = "text", placeholder }) {
  const handleFocus = (e) => {
    e.target.style.borderColor = PALETTE.primary;
    e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = PALETTE.border;
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {label && <label style={LABEL_STYLE}>{label}</label>}
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={INPUT_STYLE}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}
