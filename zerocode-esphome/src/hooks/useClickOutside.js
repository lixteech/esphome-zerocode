/**
 * @fileoverview Custom hook for detecting clicks outside a referenced element
 *
 * @module hooks/useClickOutside
 */

import { useEffect, useRef } from "react";

/**
 * Hook that triggers a callback when clicking outside the referenced element
 * @param {Function} onClickOutside - Callback function to trigger
 * @returns {React.RefObject} Ref to attach to the target element
 */
export function useClickOutside(onClickOutside) {
  const ref = useRef(null);

  useEffect(() => {
    if (!onClickOutside || typeof onClickOutside !== "function") return;

    /**
     * Handle mousedown events on document
     * @param {MouseEvent} event - Mouse event
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return ref;
}
