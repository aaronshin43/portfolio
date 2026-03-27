"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

import { useMousePosition } from "@/hooks/useMousePosition";

// Sprite coordinates verbatim from adryd325/oneko.js (each entry is [col, row] in sprite sheet units)
const spriteSets: Record<string, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

const NEKO_SPEED = 10;

export function Neko() {
  const prefersReducedMotion = useReducedMotion();
  const mousePosition = useMousePosition();
  const nekoRef = useRef<HTMLDivElement>(null);

  // All mutable loop state in refs — no useState to avoid re-renders
  const nekoPosX = useRef(32);
  const nekoPosY = useRef(32);
  const frameCount = useRef(0);
  const idleTime = useRef(0);
  const idleAnimation = useRef<string | null>(null);
  const idleAnimationFrame = useRef(0);
  const lastFrameTimestamp = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const el = nekoRef.current;
    if (!el) return;

    function setSprite(name: string, frame: number) {
      const set = spriteSets[name];
      if (!set) return;
      const sprite = set[frame % set.length];
      if (!sprite) return;
      el!.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
      idleAnimation.current = null;
      idleAnimationFrame.current = 0;
    }

    function idle() {
      idleTime.current += 1;

      // Randomly pick an idle animation every ~20 seconds
      if (
        idleTime.current > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation.current === null
      ) {
        const available: string[] = ["sleeping", "scratchSelf"];
        if (nekoPosX.current < 32) available.push("scratchWallW");
        if (nekoPosY.current < 32) available.push("scratchWallN");
        if (nekoPosX.current > window.innerWidth - 32) available.push("scratchWallE");
        if (nekoPosY.current > window.innerHeight - 32) available.push("scratchWallS");
        idleAnimation.current =
          available[Math.floor(Math.random() * available.length)] ?? null;
      }

      switch (idleAnimation.current) {
        case "sleeping":
          if (idleAnimationFrame.current < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame.current / 4));
          if (idleAnimationFrame.current > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation.current, idleAnimationFrame.current);
          if (idleAnimationFrame.current > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame.current += 1;
    }

    function frame() {
      frameCount.current += 1;
      const diffX = nekoPosX.current - mousePosition.current.x;
      const diffY = nekoPosY.current - mousePosition.current.y;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < NEKO_SPEED || distance < 48) {
        idle();
        return;
      }

      idleAnimation.current = null;
      idleAnimationFrame.current = 0;

      if (idleTime.current > 1) {
        setSprite("alert", 0);
        // Count down after being alerted before moving
        idleTime.current = Math.min(idleTime.current, 7);
        idleTime.current -= 1;
        return;
      }

      idleTime.current = 0;

      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction || "idle", frameCount.current);

      nekoPosX.current -= (diffX / distance) * NEKO_SPEED;
      nekoPosY.current -= (diffY / distance) * NEKO_SPEED;

      nekoPosX.current = Math.min(
        Math.max(16, nekoPosX.current),
        window.innerWidth - 16
      );
      nekoPosY.current = Math.min(
        Math.max(16, nekoPosY.current),
        window.innerHeight - 16
      );

      // Direct DOM mutation — no React state update in the hot path
      el!.style.left = `${nekoPosX.current - 16}px`;
      el!.style.top = `${nekoPosY.current - 16}px`;
    }

    function onAnimationFrame(timestamp: number) {
      if (!el!.isConnected) return;

      // Pause when tab is hidden
      if (document.visibilityState !== "visible") {
        rafId.current = requestAnimationFrame(onAnimationFrame);
        return;
      }

      if (lastFrameTimestamp.current === null) {
        lastFrameTimestamp.current = timestamp;
      }

      // Throttle to ~10fps (100ms per frame) matching original oneko.js
      if (timestamp - lastFrameTimestamp.current > 100) {
        lastFrameTimestamp.current = timestamp;
        frame();
      }

      rafId.current = requestAnimationFrame(onAnimationFrame);
    }

    rafId.current = requestAnimationFrame(onAnimationFrame);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [mousePosition]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={nekoRef}
      aria-hidden="true"
      style={{
        width: 32,
        height: 32,
        position: "fixed",
        pointerEvents: "none",
        imageRendering: "pixelated",
        left: "16px",
        top: "16px",
        zIndex: 9999,
        backgroundImage: "url(/images/cat/oneko.gif)",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
