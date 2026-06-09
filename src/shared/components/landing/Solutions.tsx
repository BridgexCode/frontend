"use client";

import React from "react";
import { motion } from "framer-motion";

export const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Conversational{" "}
            <span className="text-secondary">ERP Automation</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl leading-relaxed">
            Transform WhatsApp into your logistics ERP interface. Drivers can update shipments, report issues, and share delivery information through simple messages while AI automatically processes and syncs data in real time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
