"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/types/project";

const PROJECTS_ZONE_START = 0.15;
const PROJECTS_ZONE_SPAN = 0.70;

interface FeaturedProjectFrameProps {
  project: Project;
  projectIndex: number;
  totalProjects: number;
  scrollProgress: MotionValue<number>;
}

export default function FeaturedProjectFrame({
  project,
  projectIndex,
  totalProjects,
  scrollProgress,
}: FeaturedProjectFrameProps) {
  const projectNumber = String(projectIndex + 1).padStart(2, "0");

  const phaseStart =
    PROJECTS_ZONE_START + (projectIndex * PROJECTS_ZONE_SPAN) / totalProjects;
  const phaseEnd =
    PROJECTS_ZONE_START +
    ((projectIndex + 1) * PROJECTS_ZONE_SPAN) / totalProjects;
  const span = phaseEnd - phaseStart;

  const exitStart = phaseEnd - span * 0.18;

  const imageOpacity = useTransform(
    scrollProgress,
    [phaseStart, phaseStart + span * 0.15, exitStart, phaseEnd],
    [0, 1, 1, 0]
  );

  const numberOpacity = useTransform(
    scrollProgress,
    [phaseStart + span * 0.2, phaseStart + span * 0.35, exitStart, phaseEnd],
    [0, 1, 1, 0]
  );
  const numberY = useTransform(
    scrollProgress,
    [phaseStart + span * 0.2, phaseStart + span * 0.35, exitStart, phaseEnd],
    [40, 0, 0, -30]
  );

  const nameOpacity = useTransform(
    scrollProgress,
    [phaseStart + span * 0.28, phaseStart + span * 0.45, exitStart, phaseEnd],
    [0, 1, 1, 0]
  );
  const nameY = useTransform(
    scrollProgress,
    [phaseStart + span * 0.28, phaseStart + span * 0.45, exitStart, phaseEnd],
    [60, 0, 0, -30]
  );

  const techOpacity = useTransform(
    scrollProgress,
    [phaseStart + span * 0.36, phaseStart + span * 0.52, exitStart, phaseEnd],
    [0, 1, 1, 0]
  );
  const techY = useTransform(
    scrollProgress,
    [phaseStart + span * 0.36, phaseStart + span * 0.52, exitStart, phaseEnd],
    [40, 0, 0, -20]
  );

  const descOpacity = useTransform(
    scrollProgress,
    [phaseStart + span * 0.42, phaseStart + span * 0.58, exitStart, phaseEnd],
    [0, 1, 1, 0]
  );
  const descY = useTransform(
    scrollProgress,
    [phaseStart + span * 0.42, phaseStart + span * 0.58, exitStart, phaseEnd],
    [30, 0, 0, -15]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4 md:px-16 lg:px-24"
      style={{ opacity: imageOpacity }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ borderRadius: "13px", height: "82vh" }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          sizes="90vw"
        />

        <div
          className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-24 md:px-10 md:pb-8"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
          }}
        >
          <motion.span
            className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-gold md:text-xs"
            style={{ opacity: numberOpacity, y: numberY }}
          >
            [{projectNumber}]
          </motion.span>

          <motion.h3
            className="font-display uppercase leading-none text-gold"
            style={{
              fontSize: "clamp(32px, 5vw, 72px)",
              opacity: nameOpacity,
              y: nameY,
            }}
          >
            {project.title}
          </motion.h3>

          <motion.div
            className="mt-3 flex flex-wrap gap-2 md:gap-3"
            style={{ opacity: techOpacity, y: techY }}
          >
            {project.tech.map((techItem) => (
              <span
                key={techItem}
                className="font-mono text-[9px] uppercase tracking-widest text-gold/70 md:text-[10px]"
              >
                [{techItem}]
              </span>
            ))}
          </motion.div>

          <motion.p
            className="mt-3 max-w-sm font-mono text-[10px] leading-relaxed text-gold/60 md:text-[11px]"
            style={{ opacity: descOpacity, y: descY }}
          >
            {project.excerpt}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
