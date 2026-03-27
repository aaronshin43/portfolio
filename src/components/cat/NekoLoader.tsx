"use client";

import dynamic from "next/dynamic";

const NekoWrapper = dynamic(
  () => import("@/components/cat/NekoWrapper"),
  { ssr: false }
);

export function NekoLoader() {
  return <NekoWrapper />;
}
