/**
 * @fileoverview Syntax-highlighted YAML code viewer
 *
 * @module components/YAMLViewer
 */

import React, { useCallback } from "react";
import { YAML_COLORS, PALETTE } from "../constants/colors";
import { copyYamlToClipboard, downloadYaml } from "../utils/yamlGenerator";
import { formatDeviceName } from "../utils/helpers";

/**
 * Single syntax-highlighted YAML line
 *
 * @param {Object} props - Component props
 * @param {string} props.line - Line content
 * @param {number} props.num - Line number
 * @returns {JSX.Element} Rendered line
 */
function YAMLLine({ line, num }) {
  // Comment line
  if (line.trim().startsWith("#")) {
    return (
      <div style={{ display: "flex", minHeight: 20 }}>
        <span
          style={{
            minWidth: 40,
            textAlign: "right",
            paddingRight: 12,
            color: YAML_COLORS.indent,
            userSelect: "none",
            flexShrink: 0,
          }}
        >
          {num}
        </span>
        <span
          style={{
            paddingLeft: 16,
            color: YAML_COLORS.comment,
            fontStyle: "italic",
          }}
        >
          {line}
        </span>
      </div>
    );
  }

  // Parse key-value pairs
  const leadMatch = line.match(/^(\s*)(- )?/);
  const leading = leadMatch?.[1] || "";
  const dash = leadMatch?.[2] || "";
  const rest = line.slice(leading.length + dash.length);
  const kvMatch = rest.match(/([\w.-]+)(:)(.*)/);

  const tokens = [];

  if (kvMatch) {
    const [, key, , value] = kvMatch;
    const v = value.trimStart();
    const space = value.slice(0, value.length - v.length);

    tokens.push(
      <span key="lead" style={{ whiteSpace: "pre" }}>{leading}</span>
    );

    if (dash) {
      tokens.push(
        <span key="dash" style={{ color: YAML_COLORS.dash }}>{dash}</span>
      );
    }

    tokens.push(
      <span key="key" style={{ color: YAML_COLORS.key }}>{key}</span>
    );
    tokens.push(
      <span key="colon" style={{ color: YAML_COLORS.colon }}>:</span>
    );

    if (v) {
      tokens.push(
        <span key="sp" style={{ whiteSpace: "pre" }}>{space}</span>
      );

      // Color-code value type
      if (v === "true" || v === "false") {
        tokens.push(
          <span key="v" style={{ color: YAML_COLORS.bool }}>{v}</span>
        );
      } else if (v.startsWith('"')) {
        tokens.push(
          <span key="v" style={{ color: YAML_COLORS.string }}>{v}</span>
        );
      } else if (/^0x[0-9a-fA-F]+$/.test(v) || /^-?\d/.test(v)) {
        tokens.push(
          <span key="v" style={{ color: YAML_COLORS.number }}>{v}</span>
        );
      } else {
        tokens.push(
          <span key="v" style={{ color: YAML_COLORS.plain }}>{v}</span>
        );
      }
    }
  } else {
    // Plain line
    tokens.push(
      <span key="plain" style={{ whiteSpace: "pre", color: YAML_COLORS.plain }}>
        {line}
      </span>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: 20 }}>
      <span
        style={{
          minWidth: 40,
          textAlign: "right",
          paddingRight: 12,
          color: YAML_COLORS.indent,
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        {num}
      </span>
      <span style={{ paddingLeft: 16 }}>{tokens}</span>
    </div>
  );
}

/**
 * YAML code viewer with syntax highlighting and actions
 *
 * @param {Object} props - Component props
 * @param {string} props.yaml - YAML content
 * @param {string} [props.deviceName] - Device name for filename
 * @returns {JSX.Element} YAML viewer panel
 */
export function YAMLViewer({ yaml, deviceName }) {
  const lines = yaml.split("\n");
  const filename = `${formatDeviceName(deviceName) || "esphome"}.yaml`;

  /**
   * Handle copy to clipboard
   * @param {React.MouseEvent} e - Click event
   */
  const handleCopy = useCallback(
    async (e) => {
      const button = e.currentTarget;
      const success = await copyYamlToClipboard(yaml);

      if (success) {
        const originalText = button.textContent;
        button.textContent = "✓ Copied";
        button.style.color = PALETTE.success;
        button.style.borderColor = `rgba(16,185,129,0.35)`;

        setTimeout(() => {
          button.textContent = originalText;
          button.style.color = "";
          button.style.borderColor = "";
        }, 2000);
      }
    },
    [yaml]
  );

  /**
   * Handle download action
   */
  const handleDownload = useCallback(() => {
    downloadYaml(yaml, deviceName);
  }, [yaml, deviceName]);

  return (
    <div
      style={{
        borderLeft: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        background: "rgba(5,9,18,0.8)",
        overflow: "hidden",
      }}
    >
      {/* Header with actions */}
      <div
        style={{
          padding: "12px 16px 10px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: PALETTE.textDark,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            YAML Output
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#1e3a5a",
              fontFamily: "monospace",
              marginTop: 2,
            }}
          >
            {lines.length} lines
          </div>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={handleCopy}
            style={{
              padding: "5px 12px",
              borderRadius: 6,
              cursor: "pointer",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: PALETTE.textDark,
              fontSize: 11,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 5,
              transition: "all 0.2s",
            }}
          >
            ⌘ Copy
          </button>

          <button
            onClick={handleDownload}
            style={{
              padding: "5px 12px",
              borderRadius: 6,
              cursor: "pointer",
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.2)",
              color: PALETTE.accentBlue,
              fontSize: 11,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            ⬇ Download
          </button>
        </div>
      </div>

      {/* Window title bar */}
      <div
        style={{
          padding: "8px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(0,0,0,0.2)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#ff5f57",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#febc2e",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#28c840",
          }}
        />
        <span
          style={{
            marginLeft: 8,
            fontSize: 11,
            color: PALETTE.textDark,
            fontFamily: "monospace",
          }}
        >
          {filename}
        </span>
      </div>

      {/* Code content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          fontSize: 12.5,
          lineHeight: "20px",
          padding: "12px 0 20px 0",
          background: "rgba(4,8,16,0.6)",
        }}
      >
        {lines.map((line, i) => (
          <YAMLLine key={i} line={line} num={i + 1} />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "5px 14px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: "#1e3a5a",
            fontFamily: "monospace",
          }}
        >
          YAML · UTF-8 · {yaml.length} chars
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: PALETTE.success,
              boxShadow: `0 0 5px ${PALETTE.success}`,
            }}
          />
          <span
            style={{
              fontSize: 10,
              color: PALETTE.success,
              fontFamily: "monospace",
            }}
          >
            Valid
          </span>
        </div>
      </div>
    </div>
  );
}
