/**
 * @fileoverview Form input field component
 *
 * @module components/Form/Field
 */

import React from "react";
import { FORM_COLORS } from "../../constants/colors";

/**
 * Input field style configuration
 * @type {Object}
 */
const INPUT_STYLE = {
  background: FORM_COLORS.inputBackground,
  border: `1px solid ${FORM_COLORS.inputBorder}`,
  borderRadius: 8,
  padding: "10px 14px",
  color: FORM_COLORS.inputText,
  fontSize: 14,
  width: "100%",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

/**
 * Label style configuration
 * @type {Object}
 */
const LABEL_STYLE = {
  fontSize: 11,
  color: FORM_COLORS.labelText,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
};

/**
 * Focus handler for input styling
 * @param {React.FocusEvent<HTMLInputElement>} e - Focus event
 */
function handleFocus(e) {
  e.target.style.borderColor = FORM_COLORS.focusBorder;
  e.target.style.boxShadow = FORM_COLORS.focusShadow;
}

/**
 * Blur handler for input styling
 * @param {React.FocusEvent<HTMLInputElement>} e - Blur event
 */
function handleBlur(e) {
  e.target.style.borderColor = FORM_COLORS.inputBorder;
  e.target.style.boxShadow = "none";
}

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
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {label && (
        <span style={LABEL_STYLE}>{label}</span>
      )}
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={INPUT_STYLE}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </label>
  );
}
