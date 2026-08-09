"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FOOTER_SECTIONS } from "@/shared/constants";

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-white/80 py-20 px-6 md:px-10 border-t border-outline-variant/30 relative">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
        {/* Contact Us */}
        <div className="col-span-2">
          <h6 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-6">
            Contact Us
          </h6>
          <ul className="space-y-5 text-sm text-on-surface-variant">
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
              <div>
                <a href="mailto:hello@nexivo.com" className="hover:text-secondary transition-colors duration-200 block">
                  hello@logiflow.com
                </a>
                <a href="mailto:support@nexivo.com" className="hover:text-secondary transition-colors duration-200 block">
                  support@logiflow.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
              <div>
                <span className="block text-xs font-medium text-on-surface uppercase tracking-wider mb-0.5">Telegram Bot</span>
                <a href="https://t.me/logiflowtm_bot" target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors duration-200">
                  @logiflowtm_bot
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
              <span>Kerala, India</span>
            </li>
          </ul>
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
          &copy; 2026 Logiflow. All rights reserved.
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
