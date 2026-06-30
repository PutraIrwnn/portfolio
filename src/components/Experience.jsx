import { motion, useReducedMotion } from 'framer-motion';
import { experience } from '../data/experience';

export default function Experience() {
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
    <section id="experience" className="bg-white-base py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fadeIn} className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[2px] text-fluid-blue">
            Experience
          </p>
          <h2
            className="font-display text-3xl font-bold text-space-navy md:text-4xl"
            style={{ letterSpacing: '-2px' }}
          >
            Beyond the code
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experience.map((card, i) => (
            <motion.div
              key={card.org}
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: '-60px' },
                    transition: { duration: 0.4, delay: i * 0.1 },
                  })}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-3xl" style={{fontFamily:'"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'}}>{card.icon}</span>
              <h3 className="font-display mt-4 text-base font-bold text-space-navy">
                {card.org}
              </h3>
              <p className="mt-1 text-sm font-medium text-purple-accent">
                {card.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
