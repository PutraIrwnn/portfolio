import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { projects } from '../data/projects';
import Ufo from './Ufo';
import Moon from './Moon';

// Generate 80 deterministic star positions
const stars = Array.from({ length: 80 }, (_, i) => ({
  left: `${((i * 17 + 31) % 97)}%`,
  top: `${((i * 23 + 13) % 91)}%`,
  size: 1 + (i % 3),
  delay: `${(i * 0.15) % 5}s`,
  duration: `${2 + (i % 3)}s`,
}));

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const constraintsRef = useRef(null);

  const fadeIn = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.5 },
      };

  return (
    <section id="projects" ref={constraintsRef} className="relative overflow-hidden bg-space-navy py-24">
      {/* Easter Egg Moon */}
      <Moon />

      {/* Interactive UFO */}
      <Ufo constraintsRef={constraintsRef} />

      {/* Star Particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div {...fadeIn} className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[2px] text-fluid-blue">
            Projects
          </p>
          <h2
            className="font-display text-3xl font-bold text-white md:text-4xl"
            style={{ letterSpacing: '-2px' }}
          >
            Things I&apos;ve shipped
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: '-60px' },
                    transition: { duration: 0.4, delay: i * 0.1 },
                  })}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5"
              style={{
                '--glow-color': project.accentColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = project.accentColor + '40';
                e.currentTarget.style.boxShadow = `0 8px 32px ${project.accentColor}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Corner Glow */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-15 blur-[60px]"
                style={{ background: project.accentColor }}
              />

              {/* Tag */}
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: project.tagColor + '20',
                  color: project.tagColor,
                }}
              >
                {project.tag}
              </span>

              {/* Icon + Title */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-2xl">{project.icon}</span>
                <h3 className="font-display text-xl font-bold text-white">
                  {project.name}
                </h3>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                {project.description}
              </p>

              {/* Tech Pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techPills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-medium text-gray-300"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {/* GitHub Link or Badge */}
              <div className="mt-5">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-fluid-blue transition-colors duration-200 hover:text-white cursor-pointer"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View on GitHub
                  </a>
                ) : (
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: project.accentColor + '20',
                      color: project.accentColor,
                    }}
                  >
                    {project.badge}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
