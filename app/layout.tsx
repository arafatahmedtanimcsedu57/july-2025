import type React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { IBM_Plex_Sans } from "next/font/google";

import Methodology from "@/app/methodology";
import FilterContainer from "@/app/filter-container";
import { ThemeProvider } from "@/shared/ui/layout/theme-provider";

import "@/app/globals.css";
// import { RootLayout } from "@/shared/ui/layout/root-layout";
import Logo from "@/public/logo.png";
import Header from "@/app/header";

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background  antialiased ${ibmPlexSans.className}`}
      >
        <header className="sticky shadow-md bg-foreground top-0 z-40 w-full p-4">
          <div className="flex gap-2 dark:text-white text-slate-700">
            <Image src={Logo} alt="brand" width={48} height={48} />
            <Header />
          </div>
        </header>
        <ThemeProvider defaultTheme="system" storageKey="casualty-map-theme">
          <main className="flex flex-1 flex-col bg-background h-[calc(100vh-80px)] overflow-hidden">
            <div className="flex h-full">
              <div className="ms-[12px] w-[60px] flex flex-col bg-transparent justify-between items-center z-[100] absolute bottom-0">
                <div></div>
                <div className="flex flex-col gap-4 items-center justify-center py-10">
                  <FilterContainer />

                  <Methodology />
                </div>
              </div>
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>

    // <html lang="en" suppressHydrationWarning>
    //   {/* <body
    //     className={`min-h-screen bg-background  antialiased ${ibmPlexSans.className}`}
    //   >
    //     <RootLayout>{children}</RootLayout>
    //   </body> */}
    // </html>
  );
}
