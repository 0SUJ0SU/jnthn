"use client";

import Link from "next/link";
import { motion, type MotionValue } from "framer-motion";
import FeaturedHeading from "./FeaturedHeading";

interface FeaturedOutroProps {
  ctaOpacity: MotionValue<number>;
  ctaY: MotionValue<number>;
}

export default function FeaturedOutro({
  ctaOpacity,
  ctaY,
}: FeaturedOutroProps) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-8"
      style={{ opacity: ctaOpacity, y: ctaY }}
    >
      <FeaturedHeading />

      <Link
        href="/work"
        className="mt-6 inline-block border border-cream/40 px-6 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-cream transition-colors duration-300 hover:border-cream hover:bg-cream hover:text-dark"
      >
        VIEW ALL WORK
      </Link>
    </motion.div>
  );
}
