import React from "react";
import { ShaderBackground } from "@/shared/components/landing/ShaderBackground";
import { Navbar } from "@/shared/components/landing/Navbar";
import { Hero } from "@/shared/components/landing/Hero";
import { Features } from "@/shared/components/landing/Features";
import { Workflow } from "@/shared/components/landing/Workflow";
import { Solutions } from "@/shared/components/landing/Solutions";
import { Companies } from "@/shared/components/landing/Companies";
import { CTA } from "@/shared/components/landing/CTA";
import { Footer } from "@/shared/components/landing/Footer";

export default function Home() {
  return (
    <>
      {/* WebGL flowing gradient background */}
      <ShaderBackground />

      {/* Sticky desktop & mobile bottom navbars */}
      <Navbar />

      {/* Main content sections wrapper */}
      <main className="flex-1 w-full">
        {/* Hero entry section */}
        <Hero />

        {/* Feature listings */}
        <Features />

        {/* How it works workflow indicator */}
        <Workflow />

        {/* Solutions section */}
        <Solutions />

        {/* Trusted client brands logos */}
        <Companies />

        {/* CTA conversion grid */}
        <CTA />
      </main>

      {/* Page footings */}
      <Footer />
    </>
  );
}
