import type React from "react";
import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";

import { ThemeProvider } from "./theme-provider";

import "@/app/globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bangladesh Casualty Map",
  description:
    "Interactive map showing casualty data from incidents in Bangladesh during July 2024",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background  antialiased ${ibmPlexSans.className}`}
      >
        <ThemeProvider defaultTheme="system" storageKey="casualty-map-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
