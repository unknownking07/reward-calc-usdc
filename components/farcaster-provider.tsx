"use client";

import { FrameContextProvider } from "@farcaster/frames";

export function FrameProvider({ children }: { children: React.ReactNode }) {
  return <FrameContextProvider>{children}</FrameContextProvider>;
}
