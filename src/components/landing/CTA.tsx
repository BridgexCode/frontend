"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export const CTA: React.FC = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-primary-container rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden"
        >
          {/* Custom absolute layout gradients */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-[20deg] translate-x-24 pointer-events-none" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Ready to bring your ERP into the messaging era?
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join 3,500+ companies that have automated their supply chain updates with LogisticsPro.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="shadow-xl shadow-secondary/30">
                Schedule a Demo
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                View Case Studies
              </Button>
            </div>
            
            <p className="mt-8 text-white/40 text-xs tracking-wide">
              No credit card required • Setup in under 24 hours
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default CTA;
