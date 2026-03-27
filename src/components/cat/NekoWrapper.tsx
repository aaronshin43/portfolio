"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Neko } from "@/components/cat/Neko";

export default function NekoWrapper() {
  const [showCat, setShowCat] = useState(true);

  return (
    <>
      {showCat && <Neko />}
      <button
        type="button"
        onClick={() => setShowCat((prev) => !prev)}
        aria-label={showCat ? "Hide cat" : "Show cat"}
        className={cn(
          "fixed bottom-4 right-4 z-[9998]",
          "bg-card border border-border rounded-full w-8 h-8 text-sm",
          "hover:border-lavender-400/50 transition-colors",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender-400"
        )}
      >
        🐾
      </button>
    </>
  );
}
