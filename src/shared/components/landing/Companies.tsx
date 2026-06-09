"use client";

import React from "react";
import { CLIENT_COMPANIES } from "@/shared/constants";

export const Companies: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-background border-y border-outline-variant/30">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-center text-xs font-semibold text-on-surface-variant uppercase tracking-[0.2em] mb-12">
          Trusted by leading logistics companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {CLIENT_COMPANIES.map((company) => (
            <div
              key={company.name}
              className="flex items-center gap-3 text-onSurfaceVariant/60 hover:text-onSurfaceVariant transition-colors"
            >
              <company.icon className="w-8 h-8" />
              <span className="text-lg font-bold tracking-tight">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
