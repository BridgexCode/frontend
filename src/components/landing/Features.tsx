"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { FEATURES } from "@/lib/constants";
import { slideUp, staggerContainer } from "@/lib/animations";

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-surface/80">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* Header Block */}
        <div className="mb-16 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Enterprise Features,{" "}
            <span className="text-secondary">Consumer Simplicity</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-xl leading-relaxed">
            Everything you need to manage complex logistics workflows without the manual data entry fatigue.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer(0.08)}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div key={idx} variants={slideUp(0.6)}>
                <Card 
                  variant="glass" 
                  className="p-8 group hover:border-secondary/30 transition-all duration-300 h-full flex flex-col items-start cursor-pointer hover:shadow-lg hover:shadow-secondary/5"
                >
                  <div className="w-14 h-14 bg-surface-container-high rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary/10 group-hover:text-secondary transition-all duration-300 text-on-surface">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-on-surface mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
export default Features;
