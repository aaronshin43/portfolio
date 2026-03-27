"use client";

import { useEffect, useRef } from "react";

export function useMousePosition() {
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) position.current = { x: t.clientX, y: t.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return position;
}
