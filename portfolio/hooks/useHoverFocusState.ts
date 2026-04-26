"use client";
import { useState } from "react";

export function useHoverFocusState<T>() {
  const [activeID, setActiveID] = useState<T | null>(null);
  const [expandedID, setExpandedID] = useState<T | null>(null);

  function preview(id: T) {
    setActiveID(id);
  }

  function expand(id: T) {
    setActiveID(id);
    setExpandedID(id);
  }

  function clear() {
    setActiveID(null);
    setExpandedID(null);
  }

  return {
    activeID,
    expandedID,
    preview,
    expand,
    clear,
  };
}
