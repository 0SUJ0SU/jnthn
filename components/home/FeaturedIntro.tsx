"use client";

import { motion, type MotionValue } from "framer-motion";
import FeaturedHeading from "./FeaturedHeading";

interface FeaturedIntroProps {
  headingOpacity: MotionValue<number>;
  headingY: MotionValue<number>;
}

export default function FeaturedIntro({
  headingOpacity,
  headingY,
}: FeaturedIntroProps) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-8"
      style={{ opacity: headingOpacity, y: headingY }}
    >
      <FeaturedHeading />
    </motion.div>
  );
}
