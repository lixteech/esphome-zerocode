import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { parseYAMLToConfig } from '../utils/yamlParser';
import { GRADIENTS } from '../constants/colors';
import { ThemeContext } from '../App';

export function EditableYAMLPanel({
  yaml,
  onYAMLChange,
  lines,
  copied,
  onCopy,
  onDownload,
}) {
  const { colors, yamlColors, theme } = useContext(ThemeContext);
  const [editMode, setEditMode] = React.useState(false);
  const [ymlText, setYmlText] = React.useState(yaml);

  const handleEdit = (newText) => {
    setYmlText(newText);
    const config = parseYAMLToConfig(newText);
    onYAMLChange?.(config);
  };

  const getLineColor = (type) => {
    switch (type) {
      case 'comment': return yamlColors.comment;
      case 'key': return yamlColors.key;
      case 'value': return yamlColors.string;
      default: return yamlColors.plain;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: colors.surface,
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px 24px 16px',
          borderBottom: `1px solid ${colors.borderLight}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          background: colors.surface,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: colors.primary,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            YAML Output
          </div>
          <div
            style={{
              fontSize: 11,
              color: colors.textMuted,
              fontFamily: "'JetBrains Mono', monospace",
              marginTop: 2,
            }}
          >
            {lines.length} lines
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <motion.button
            onClick={() => setEditMode(!editMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              cursor: 'pointer',
              background: editMode
                ? colors.primaryBg
                : colors.surfaceLight,
              border: `1px solid ${editMode ? colors.primary : colors.border}`,
              color: editMode ? colors.primary : colors.text,
              fontSize: 12,
              fontWeight: 500,
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ✏️ {editMode ? 'View' : 'Edit'}
          </motion.button>

          <motion.button
            onClick={onCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              cursor: 'pointer',
              background: copied
                ? colors.success + '20'
                : colors.surfaceLight,
              border: copied
                ? `1px solid ${colors.success}40`
                : `1px solid ${colors.border}`,
              color: copied ? colors.success : colors.text,
              fontSize: 12,
              fontWeight: 500,
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s',
            }}
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </motion.button>

          <motion.button
            onClick={onDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              cursor: 'pointer',
              background: colors.surfaceLight,
              border: `1px solid ${colors.border}`,
              color: colors.text,
              fontSize: 12,
              fontWeight: 500,
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ⬇️ Download
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
        {editMode ? (
          <textarea
            value={ymlText}
            onChange={(e) => handleEdit(e.target.value)}
            style={{
              width: '100%',
              height: '100%',
              background: colors.surfaceLight,
              border: 'none',
              color: colors.text,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              lineHeight: 1.6,
              padding: '16px 18px',
              resize: 'none',
              outline: 'none',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              padding: '16px 0 20px 0',
              background: colors.surfaceLight,
              overflowY: 'auto',
              fontSize: 13,
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  paddingLeft: '18px',
                  paddingRight: '18px',
                  color: getLineColor(line.type),
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.primaryBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ opacity: 0.3, marginRight: 14, minWidth: 32, color: colors.textMuted }}>
                  {i + 1}
                </span>
                <span>{line.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '10px 18px',
          borderTop: `1px solid ${colors.borderLight}`,
          background: colors.surface,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          fontSize: 11,
          color: colors.textMuted,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <span>{yaml.length} chars</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <motion.div
            animate={{
              boxShadow: [`0 0 5px ${colors.primary}`, `0 0 15px ${colors.primary}`, `0 0 5px ${colors.primary}`],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: colors.primary,
            }}
          />
          <span style={{ color: colors.primary, fontWeight: 500 }}>Valid</span>
        </div>
      </div>
    </div>
  );
}