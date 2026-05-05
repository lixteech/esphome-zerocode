/**
 * @fileoverview Form select dropdown component
 *
 * @module components/Form/Select
 */

import React from "react";
import { FORM_COLORS } from "../../constants/colors";

/**
 * Select option type
 * @typedef {Object} SelectOption
 * @property {string} value - Option value
 * @property {string} label - Display label
 */

/**
 * Select input style configuration
 * @type {Object}
 */
const SELECT_STYLE = {
  background: "rgba(8,15,28,0.95)",
  border: `1px solid ${FORM_COLORS.inputBorder}`,
  borderRadius: 8,
  padding: "10px 14px",
  color: FORM_COLORS.inputText,
  fontSize: 14,
  width: "100%",
  outline: "none",
  fontFamily: "inherit",
  cursor: "pointer",
  appearance: "none",
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
 * Option style configuration
 * @type {Object}
 */
const OPTION_STYLE = {
  background: "#0a1220",
};

/**
 * Form select dropdown component
 *
 * @param {Object} props - Component props
 * @param {string} [props.label] - Select label
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Change handler
 * @param {SelectOption[]} props.options - Available options
 * @returns {JSX.Element} Select component
 */
export function Select({ label, value, onChange, options }) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {label && <span style={LABEL_STYLE}>{label}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={SELECT_STYLE}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={OPTION_STYLE}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
