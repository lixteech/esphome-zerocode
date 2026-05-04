import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXAMPLE_PROMPTS } from "../constants/aiPrompts";
import { GRADIENTS } from "../constants/colors";
import { ThemeContext } from "../App";

export function AIPromptPanel({
  prompt,
  onPromptChange,
  isGenerating,
  onGenerate,
  generatedYaml,
  error,
  onClearError,
  onCopy,
  onDownload,
  onFlash,
  validation,
}) {
  const { colors, theme } = useContext(ThemeContext);
  const hasYaml = generatedYaml && generatedYaml.length > 0;
  const hasError = error && error.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: colors.surface,
      }}
    >
      <div
        style={{
          padding: "20px 24px 16px",
          borderBottom: `1px solid ${colors.borderLight}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: colors.primary,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 4,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🤖
          </motion.span>
          AI Generator
        </div>
        <div style={{ fontSize: 13, color: colors.textSecondary }}>
          Describe your IoT setup in natural language
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: colors.text,
            }}
          >
            Your Setup
          </label>
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="e.g., A DHT22 temperature sensor on GPIO4 and a NeoPixel LED strip on GPIO5"
            disabled={isGenerating}
            style={{
              background: colors.surfaceLight,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: "14px 16px",
              color: colors.text,
              fontSize: 14,
              width: "100%",
              minHeight: 120,
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
              transition: "border-color 0.2s, box-shadow 0.2s",
              opacity: isGenerating ? 0.6 : 1,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = colors.primary;
              e.target.style.boxShadow = `0 0 0 3px ${colors.primaryBg}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.border;
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: theme === "dark"
                  ? "rgba(239, 68, 68, 0.1)"
                  : "rgba(220, 38, 38, 0.08)",
                border: `1px solid ${colors.error}33`,
                borderRadius: 10,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span style={{ fontSize: 13, color: colors.error }}>{error}</span>
              <button
                onClick={onClearError}
                style={{
                  marginLeft: "auto",
                  background: "none",
                  border: "none",
                  color: colors.error,
                  cursor: "pointer",
                  fontSize: 18,
                  padding: 0,
                }}
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => onGenerate(prompt)}
          disabled={isGenerating || !prompt.trim()}
          whileHover={{ scale: !isGenerating && prompt.trim() ? 1.02 : 1 }}
          whileTap={{ scale: !isGenerating && prompt.trim() ? 0.98 : 1 }}
          animate={{
            opacity: isGenerating || !prompt.trim() ? 0.5 : 1,
          }}
          style={{
            padding: "14px 20px",
            borderRadius: 12,
            cursor: isGenerating || !prompt.trim() ? "not-allowed" : "pointer",
            background: GRADIENTS.primary,
            border: "none",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            transition: "all 0.2s",
            boxShadow: colors.shadowGlow,
          }}
        >
          {isGenerating ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ display: "inline-block" }}
              >
                ⏳
              </motion.span>
              Generating...
            </>
          ) : (
            <>
              <span>✨</span> Generate Configuration
            </>
          )}
        </motion.button>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              fontSize: 11,
              color: colors.textMuted,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Quick Examples
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {EXAMPLE_PROMPTS.slice(0, 3).map((example, idx) => (
              <motion.button
                key={idx}
                onClick={() => onPromptChange(example.text)}
                disabled={isGenerating}
                whileHover={{ scale: isGenerating ? 1 : 1.01, x: 4 }}
                whileTap={{ scale: isGenerating ? 1 : 0.99 }}
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  cursor: isGenerating ? "not-allowed" : "pointer",
                  background: colors.surfaceLight,
                  border: `1px solid ${colors.borderLight}`,
                  color: colors.textSecondary,
                  fontSize: 13,
                  fontFamily: "inherit",
                  textAlign: "left",
                  transition: "all 0.2s",
                  opacity: isGenerating ? 0.5 : 1,
                }}
              >
                {example.label}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {hasYaml && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>📄</span> Generated YAML
                {validation?.valid && (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: colors.success + "20",
                      border: `1px solid ${colors.success}40`,
                      borderRadius: 100,
                      padding: "2px 8px",
                      fontSize: 10,
                      color: colors.success,
                      fontWeight: 600,
                    }}
                  >
                    ✓ Valid
                  </span>
                )}
              </div>

              <div
                style={{
                  background: theme === "dark" ? "rgba(0, 0, 0, 0.4)" : colors.surfaceLight,
                  border: `1px solid ${colors.borderLight}`,
                  borderRadius: 10,
                  padding: 14,
                  maxHeight: 200,
                  overflow: "auto",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: 12,
                  color: colors.text,
                  whiteSpace: "pre",
                  lineHeight: 1.6,
                }}
              >
                {generatedYaml}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <motion.button
                  onClick={onCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: 10,
                    cursor: "pointer",
                    background: colors.surfaceLight,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  📋 Copy
                </motion.button>

                <motion.button
                  onClick={onDownload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: 10,
                    cursor: "pointer",
                    background: colors.surfaceLight,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  ⬇️ Download
                </motion.button>

                <motion.button
                  onClick={onFlash}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: 10,
                    cursor: "pointer",
                    background: GRADIENTS.primary,
                    border: "none",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  ⚡ Flash
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}