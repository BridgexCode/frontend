"use client";

import React from "react";
import Link from "next/link";
import { Network } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  return (
    <>
      {/* Desktop Sticky Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 h-20 bg-white/70 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <Network className="text-secondary w-8 h-8" />
          <span className="font-headline-lg text-lg md:text-xl font-bold text-on-surface tracking-tight">
            NX Group
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors duration-200 text-on-surface-variant hover:text-on-surface",
                link.label === "Solutions" && "text-secondary font-bold border-b-2 border-secondary pb-1"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="hidden sm:block">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 bg-white/80 backdrop-blur-lg border-t border-outline-variant/20 pb-safe px-2 rounded-t-xl shadow-[0_-4px_20px_rgba(34,197,94,0.15)]">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 text-on-surface-variant/60 hover:text-on-surface transition-colors",
                link.label === "Solutions" && "text-secondary drop-shadow-[0_0_8px_rgba(74,225,118,0.6)] font-bold"
              )}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span className="text-[10px] font-semibold tracking-tight">{link.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
};
export default Navbar;
