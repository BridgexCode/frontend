import React from "react";
import ShaderBackground from "@/components/landing/ShaderBackground";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Workflow from "@/components/landing/Workflow";
import Solutions from "@/components/landing/Solutions";
import Companies from "@/components/landing/Companies";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

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
