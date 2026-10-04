"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <div className="sticky top-0 z-40">
        <Navbar />
      </div>
      <main id="main-content" className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
