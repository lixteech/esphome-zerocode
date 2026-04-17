// ResizablePanel component for flexible layout
// Users can drag divider to resize panels

import React from 'react';
import { motion } from 'framer-motion';

export function ResizablePanel({
  left,
  right,
  leftSize = 30,
  onResize = () => {},
}) {
  const [size, setSize] = React.useState(leftSize);
  const containerRef = React.useRef(null);
  const isResizing = React.useRef(false);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newSize = ((e.clientX - rect.left) / rect.width) * 100;
      
      if (newSize > 20 && newSize < 80) {
        setSize(newSize);
        onResize(newSize);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onResize]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: `${size}% 1fr ${100 - size}%`,
        height: '100%',
        width: '100%',
      }}
    >
      {/* Left panel */}
      <div style={{ overflow: 'hidden' }}>
        {left}
      </div>

      {/* Resizer divider */}
      <motion.div
        onMouseDown={() => {
          isResizing.current = true;
        }}
        style={{
          width: '1px',
          background: 'rgba(139, 92, 246, 0.3)',
          cursor: 'col-resize',
          userSelect: 'none',
          transition: 'background 0.2s',
        }}
        whileHover={{ background: 'rgba(139, 92, 246, 0.6)' }}
      />

      {/* Right panel */}
      <div style={{ overflow: 'hidden' }}>
        {right}
      </div>
    </div>
  );
}
