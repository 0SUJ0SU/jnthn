"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/types/project";
import useReducedMotion from "@/hooks/useReducedMotion";
import FeaturedIntro from "./FeaturedIntro";
import FeaturedProjectFrame from "./FeaturedProjectFrame";
import FeaturedOutro from "./FeaturedOutro";

interface FeaturedWorkProps {
  projects: Project[];
}

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.16],
    [1, 1, 0]
  );
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.16],
    [0, 0, -40]
  );
  const ctaOpacity = useTransform(scrollYProgress, [0.84, 0.92], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.84, 0.92], [40, 0]);

  if (projects.length === 0) return null;

  if (prefersReducedMotion) {
    return (
      <section className="bg-dark px-6 py-32 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-24">
          {projects.map((project, index) => (
            <div key={project.slug} className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold">
                [{String(index + 1).padStart(2, "0")}]
              </span>
              <h3
                className="font-display uppercase leading-none text-gold"
                style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
              >
                {project.title}
              </h3>
              <p className="max-w-sm font-mono text-[10px] text-cream/50">
                {project.excerpt}
              </p>
            </div>
          ))}
          <div className="flex justify-center">
            <Link
              href="/work"
              className="border border-cream/40 px-6 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-cream"
            >
              VIEW ALL WORK
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[500vh] bg-dark">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <FeaturedIntro headingOpacity={headingOpacity} headingY={headingY} />

        {projects.map((project, index) => (
          <FeaturedProjectFrame
            key={project.slug}
            project={project}
            projectIndex={index}
            totalProjects={projects.length}
            scrollProgress={scrollYProgress}
          />
        ))}

        <FeaturedOutro ctaOpacity={ctaOpacity} ctaY={ctaY} />
      </div>
    </section>
  );
}
