"use client";

import React from "react";
import Image from "next/image";
import { Check, ShieldAlert, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/shared/ui/Badge";
import { WORKFLOW_STEPS } from "@/shared/constants";
import { slideUp, staggerContainer } from "@/shared/lib/animations";

export const Workflow: React.FC = () => {
  return (
    <section id="workflow" className="py-24 relative overflow-hidden bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left Column - Stepper */}
          <div className="lg:w-1/2 w-full">
            <Badge variant="outline" className="mb-4">
              WORKFLOW
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight mb-8">
              How it Works
            </h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer(0.12)}
              className="space-y-12 relative"
            >
              {/* Stepper Vertical Line */}
              <div className="absolute left-7 top-4 bottom-4 w-0.5 bg-outline-variant/30" />

              {WORKFLOW_STEPS.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={slideUp(0.6)}
                  className="flex gap-8 relative"
                >
                  <div className="w-14 h-14 rounded-full bg-white shadow-md border border-outline-variant/20 flex items-center justify-center shrink-0 z-10">
                    {step.isCompletedIcon ? (
                      <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-md shadow-secondary/15">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-secondary">
                        {step.stepNumber}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-on-surface mb-2">
                      {step.title}
                    </h4>
                    <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Fleet Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-primary-container rounded-[2rem] p-8 shadow-2xl relative overflow-hidden aspect-[1.1] flex flex-col justify-between">
              {/* Overlay Background grid / texture */}
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa_LesGaGv-_ThPFtx8O0Nv_GH3_a-Ns9PZ8m0niXtFri2F0Y8kQiViogIZ2AFonbmSsJPJcDA4FucmWdxnh6AXgyO8hPDGUJly3P_hsHcStzo-5b6oiobZ1vno28540vqJZmOKDcJsImdoI4dHG2JN4OK8-A_ySQW6Q2XGPQRSt1ks-04YPix1rP1FKW0lex_oLjRPRqoHbWyBU-pbJ1pgHu5DfEM793jd2SygG-soY5nViJvnOwiuwSQctANpnqofaAxFUhgWfgd"
                alt="Tech Dashboard Map / Metrics background"
                fill
                sizes="500px"
                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay pointer-events-none"
              />

              <div className="relative z-10 h-full flex flex-col justify-between gap-6">

                {/* Header Widget */}
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                    <p className="text-[10px] font-bold text-white/60 mb-1 tracking-wider">
                      REAL-TIME FLOW
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim animate-ping" />
                      <span className="text-white text-xs font-semibold">
                        Active Sync: SAP HANA
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-secondary-fixed-dim rounded-lg text-on-secondary-fixed shadow-md">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                </div>

                {/* Fleet Analytics Widget */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                  <div className="flex justify-between items-end mb-4">
                    <h5 className="text-white text-sm md:text-base font-bold">
                      Global Fleet Status
                    </h5>
                    <div className="flex items-center gap-1 text-secondary-fixed-dim text-xs font-semibold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+12% vs last hour</span>
                    </div>
                  </div>

                  {/* Mock Bar Chart */}
                  <div className="grid grid-cols-4 gap-3 items-end h-24 pt-2">
                    <div className="bg-secondary-fixed-dim/40 h-[40%] rounded-t-sm transition-all duration-500 hover:bg-secondary-fixed-dim" />
                    <div className="bg-secondary-fixed-dim/60 h-[65%] rounded-t-sm transition-all duration-500 hover:bg-secondary-fixed-dim" />
                    <div className="bg-secondary-fixed-dim/80 h-[90%] rounded-t-sm transition-all duration-500 hover:bg-secondary-fixed-dim" />
                    <div className="bg-secondary-fixed-dim h-[100%] rounded-t-sm transition-all duration-500" />
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
