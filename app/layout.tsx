// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { FrameProvider } from "@/components/farcaster-provider";
import MiniKitProvider from "@/components/minikit-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "USDC Reward Checker",
  description: "Check your weekly USDC rewards by entering your rank.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FrameProvider>
          <MiniKitProvider>{children}</MiniKitProvider>
        </FrameProvider>
      </body>
    </html>
  );
}
