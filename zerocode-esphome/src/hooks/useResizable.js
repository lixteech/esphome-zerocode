import { useRef, useEffect, useState } from 'react';

/**
 * Hook for resizable panels - drag divider to resize
 * @param {Object} options - Configuration
 * @param {number} options.initialSize - Initial width/height percentage
 * @param {string} options.direction - 'horizontal' or 'vertical'
 * @returns {Object} { size, setSize, dividerProps }
 */
export function useResizable(options = {}) {
  const { initialSize = 50, direction = 'horizontal' } = options;
  const [size, setSize] = useState(initialSize);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;

      const parent = e.currentTarget?.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      let newSize;

      if (direction === 'horizontal') {
        newSize = ((e.clientX - rect.left) / rect.width) * 100;
      } else {
        newSize = ((e.clientY - rect.top) / rect.height) * 100;
      }

      // Constrain between 20% and 80%
      newSize = Math.max(20, Math.min(80, newSize));
      setSize(newSize);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };

    if (isResizing.current) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [direction]);

  const dividerProps = {
    onMouseDown: () => {
      isResizing.current = true;
    },
    style: {
      cursor: direction === 'horizontal' ? 'col-resize' : 'row-resize',
      userSelect: 'none',
    },
  };

  return { size, setSize, dividerProps };
}
