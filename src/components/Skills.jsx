import { motion, useReducedMotion } from 'framer-motion';
import { skills } from '../data/skills';

export default function Skills() {
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.5 },
      };

  return (
    <section id="skills" className="bg-light-blue-tint py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeIn} className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[2px] text-fluid-blue">
            Skills
          </p>
          <h2
            className="font-display text-3xl font-bold text-space-navy md:text-4xl"
            style={{ letterSpacing: '-2px' }}
          >
            What I work with
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((category, i) => (
            <motion.div
              key={category.category}
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: '-60px' },
                    transition: { duration: 0.4, delay: i * 0.1 },
                  })}
              className="rounded-2xl border border-ice-blue bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="font-display mb-4 text-lg font-bold text-space-navy">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-ice-blue/40 px-3 py-1 text-xs font-medium text-blue-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
