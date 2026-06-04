"use client";

import React from "react";
import { Network } from "lucide-react";
import { FOOTER_SECTIONS, SOCIAL_LINKS } from "@/lib/constants";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 py-20 px-6 md:px-10 border-t border-outline-variant/30 relative">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
        {/* Brand Summary */}
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Network className="text-secondary w-8 h-8" />
            <span className="font-headline-lg text-lg md:text-xl font-bold text-on-surface tracking-tight">
              NX Group
            </span>
          </div>
          <p className="text-on-surface-variant text-sm max-w-xs mb-8 leading-relaxed">
            The enterprise standard for WhatsApp-based logistics automation. Bridge the gap between your fleet and your ERP.
          </p>
          
          {/* Socials */}
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer Sub-Links Arrays */}
        {FOOTER_SECTIONS.map((section, idx) => (
          <div key={idx}>
            <h6 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-6">
              {section.title}
            </h6>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              {section.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <a href={link.href} className="hover:text-secondary transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Sub-footer Copyright & Status */}
      <div className="w-full max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-on-surface-variant font-medium">
          © 2024 NX Group LogisticsPro. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse" />
          <p className="text-xs text-on-surface-variant font-medium">
            System Status: All Systems Operational
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
