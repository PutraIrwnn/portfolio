import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import FluidCanvas from './FluidCanvas';

export default function Hero() {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section
      ref={heroRef}
      className="relative flex items-center justify-center overflow-hidden bg-white-base" style={{ height: '100vh' }}
    >
      {/* Fluid Canvas Background */}
      <FluidCanvas heroRef={heroRef} />

      {/* Text Readability Scrim */}
      <div 
        className="pointer-events-none absolute inset-0 z-0" 
        style={{ background: 'radial-gradient(circle at center, rgba(250,250,250,0.55) 0%, rgba(250,250,250,0.15) 60%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          {...fadeUp}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0 }}
          className="mb-6 text-xs font-medium uppercase tracking-[3px] text-gray-500"
        >
          Full-Stack Developer · Karawang, Indonesia
        </motion.p>

        {/* Name */}
        <motion.h1
          {...fadeUp}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.15 }}
          className="font-display font-bold text-space-navy leading-[0.95]"
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            letterSpacing: '-3px',
          }}
        >
          Satya Putra
          <br />
          Irawan.
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...fadeUp}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg text-gray-600 md:text-xl"
        >
          I build products that work —{' '}
          <em className="font-medium not-italic text-purple-accent">fast.</em>
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center rounded-full bg-space-navy px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
          >
            See My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border-2 border-space-navy px-8 py-3.5 text-sm font-semibold text-space-navy transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
          >
            Let's Talk
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          {...fadeUp}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400">Scroll</span>
            <div className="h-8 w-px animate-pulse bg-gray-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
