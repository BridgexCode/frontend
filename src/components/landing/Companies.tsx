"use client";

import React from "react";
import { CLIENT_COMPANIES } from "@/lib/constants";

export const Companies: React.FC = () => {
  return (
    <section className="py-24 bg-white/50 border-y border-outline-variant/30">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        <p className="text-center text-xs font-semibold text-on-surface-variant uppercase tracking-[0.2em] mb-12">
          Empowering the world&apos;s leading logistics teams
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 hover:opacity-80 transition-all duration-300">
          {CLIENT_COMPANIES.map((company, index) => {
            const Icon = company.icon;
            return (
              <div 
                key={index} 
                className="flex items-center gap-2 group cursor-pointer hover:text-secondary transition-colors duration-200"
              >
                <Icon className="w-8 h-8 text-on-surface-variant group-hover:text-secondary transition-colors" />
                <span className="text-xl font-extrabold text-on-surface tracking-tighter group-hover:text-secondary transition-colors">
                  {company.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Companies;
