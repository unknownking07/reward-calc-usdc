"use client";

import { ReactNode, useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    sdk.ready();
  }, []);

  return <>{children}</>;
}
