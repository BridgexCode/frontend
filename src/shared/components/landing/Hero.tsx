"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bolt, Play } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Badge } from "@/shared/ui/Badge";
import { slideUp, floatingAnimation } from "@/shared/lib/animations";

const avatars = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD1ZDIks2gqEkuL7T4-5foncVRG0lqVj4_A5gN8tJcRW0-UQtb-eQCMApMvk20vhZAckRDC8Cw6ts7Xy6sOdwvQLIM-ijN9-iyLLOMRsxeVwZdTWhIbFSLEgyyOEqv5-POsVgbTtmitmNka7dKHTEfxKFxuvzryCZQjbspglzhl9IeY89KstquHXsYdAzXTrWR1Xz5yyphFvSu71nR8MLDXaMCfsjW-MskUC5yGT3gOa6IyQxeT13WSlERlT2a8RJpZLT_y8qS7jFve",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBVMjoNre_uqALHKHnwGiR0-FflspMlNn18-0kRHY2w1qaTUmCF9VWT-6iA5sqDGIbuxYrytfbpk-9IwVIONR60wcqy8NzvzmKZJUWAgzyi1SJuRhkKp8lLLf2lXVyESXZZfNI2vURQ1kIsuTV9nVPewJle0BZwxPxbmmGG6YjQlm1Drf3OYpNChzKVlqRl62uta0-u5CsjjCZrIA7caOqfnIlW2iZTWTHCzYXCgXm9c0VRfJVWLCswKsPAaXvQvFNTHag2-nnk0M5h",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA7D1Qr-yeUtFSkMFi1Kej3bqoIXcfE6gPZ0FRdUmHjZLEiQnI9_f5J4SggTR1XmwuGct72yJbhQxX19SunsuI8MPqpmzgRKUYb2CfuGBTEMWyoR2_BuWOnoPRVuU6ESKL3g_kXWY-uCRnL53cKqJ699iF4tvbwIFjqjpf7PK4WxUmQg2tA6LEx-q0u2aZgzSfZkuiPGrac-IRZ584PBppSwsaqESlsRGOCbZ8_iB1YMRBzz89jYckwhAJ5LQobQHwGLbXpXBC4Oh_9",
];

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[795px] w-full overflow-hidden pt-28 pb-6 md:pb-16 bg-background">
      <div className="w-full max-w-7xl mx-auto px-0 md:px-1 grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideUp(0.8, 0.1)}
          className="w-full min-w-0 flex flex-col justify-center py-8"
        >
          <Badge variant="secondary" className="mb-6 flex items-center gap-1.5 w-fit">
            <Bolt className="w-3.5 h-3.5 fill-current" />
            <span>Next-Gen ERP Link</span>
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight mb-6 leading-[1.1]">
            Logistics ERP Powered by <span className="hidden md:inline"><br /></span>
            <span className="text-secondary">WhatsApp &amp; AI</span>
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant mb-10 w-full max-w-lg leading-relaxed">
            Drivers update shipments through WhatsApp. AI automatically updates your ERP,
            timelines, and operations dashboard in real time.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register">
              <Button variant="shine" size="lg" className="w-full sm:w-auto text-white">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <Play className="w-5 h-5 fill-current" />
              <span>Book Demo</span>
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-6 md:mt-12 flex items-center gap-2 md:gap-4 border-t border-outline-variant/30 pt-4 md:pt-8">
            <div className="flex -space-x-3">
              {avatars.map((url, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center overflow-hidden relative"
                >
                  <Image
                    src={url}
                    alt={`User ${i + 1}`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs md:text-sm font-medium text-on-surface-variant">
              <span className="text-on-surface font-bold">3.5k+</span> global clients trust LogisticsPro
            </p>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideUp(0.8, 0.3)}
          className="relative hidden lg:flex lg:items-center w-full min-w-0"
        >
          <motion.div
            animate={floatingAnimation.animate}
            className="relative z-10 w-full -mt-32"
          >
            <div className="relative w-full aspect-[1/1] max-w-[650px] mx-auto">
              <Image
                src="/homeimage.svg"
                alt="Logiflow Dashboard Preview"
                fill
                sizes="650px"
                priority
                className="object-contain drop-shadow-2xl scale-150"
              />
            </div>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary-fixed-dim/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-primary-fixed/20 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};
