// Enhanced YAML Editor with live editing support
// Edit YAML and see live changes in the form

import React from 'react';
import { motion } from 'framer-motion';
import { parseYAMLToConfig } from '../utils/yamlParser';

export function EditableYAMLPanel({
  yaml,
  onYAMLChange,
  lines,
  copied,
  onCopy,
  onDownload,
}) {
  const [editMode, setEditMode] = React.useState(false);
  const [ymlText, setYmlText] = React.useState(yaml);

  const handleEdit = (newText) => {
    setYmlText(newText);
    // Parse and apply changes
    const config = parseYAMLToConfig(newText);
    onYAMLChange?.(config);
  };

  return (
    <div
      style={{
        borderLeft: '1px solid rgba(139,92,246,.08)',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(5,9,18,.8)',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px 10px',
          borderBottom: '1px solid rgba(139,92,246,.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          background: 'rgba(10,8,16,0.8)',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: '#a8a0c4',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            YAML Output
          </div>
          <div
            style={{
              fontSize: 10,
              color: '#7a6d8a',
              fontFamily: 'var(--font-mono)',
              marginTop: 2,
            }}
          >
            {lines.length} lines
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          <motion.button
            onClick={() => setEditMode(!editMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              cursor: 'pointer',
              background: editMode
                ? 'rgba(139,92,246,.2)'
                : 'rgba(139,92,246,.08)',
              border: '1px solid rgba(139,92,246,.2)',
              color: '#c4b5fd',
              fontSize: 11,
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            ✏️ {editMode ? 'View' : 'Edit'}
          </motion.button>

          <motion.button
            onClick={onCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              cursor: 'pointer',
              background: copied
                ? 'rgba(16,185,129,.12)'
                : 'rgba(139,92,246,.08)',
              border: copied
                ? '1px solid rgba(16,185,129,.35)'
                : '1px solid rgba(139,92,246,.2)',
              color: copied ? '#10b981' : '#c4b5fd',
              fontSize: 11,
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              transition: 'all 0.2s',
            }}
          >
            {copied ? '✓ Copied' : '⌘ Copy'}
          </motion.button>

          <motion.button
            onClick={onDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              cursor: 'pointer',
              background: 'rgba(139,92,246,.08)',
              border: '1px solid rgba(139,92,246,.2)',
              color: '#c4b5fd',
              fontSize: 11,
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            ⬇ Download
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
        {editMode ? (
          // Edit mode
          <textarea
            value={ymlText}
            onChange={(e) => handleEdit(e.target.value)}
            style={{
              width: '100%',
              height: '100%',
              background: 'rgba(4,8,16,.6)',
              border: 'none',
              color: '#c4b5fd',
              fontFamily: 'var(--font-mono)',
              fontSize: '12.5px',
              lineHeight: '20px',
              padding: '12px 14px',
              resize: 'none',
              outline: 'none',
            }}
          />
        ) : (
          // View mode
          <div
            style={{
              width: '100%',
              padding: '12px 0 20px 0',
              background: 'rgba(4,8,16,.6)',
              overflowY: 'auto',
              fontSize: '12.5px',
              lineHeight: '20px',
              flex: 1,
            }}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  paddingLeft: '14px',
                  paddingRight: '14px',
                  color:
                    line.type === 'comment'
                      ? '#7a6d8a'
                      : line.type === 'key'
                        ? '#a78bfa'
                        : line.type === 'value'
                          ? '#c4b5fd'
                          : '#8b7fa0',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139,92,246,.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ opacity: 0.4, marginRight: 12, minWidth: 30 }}>
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
          padding: '5px 14px',
          borderTop: '1px solid rgba(139,92,246,.08)',
          background: 'rgba(0,0,0,.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          fontSize: '10px',
          color: '#7a6d8a',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span>{yaml.split('').length} chars</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#8b5cf6',
              boxShadow: '0 0 5px #8b5cf6',
            }}
          />
          <span style={{ color: '#8b5cf6' }}>Valid</span>
        </div>
      </div>
    </div>
  );
}
